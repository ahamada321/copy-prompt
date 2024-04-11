import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { PromptService } from 'src/app/prompt/shared/prompt.service';
import { User } from 'src/app/user/shared/user.model';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'app-prompt-form',
  templateUrl: './prompt-form.component.html',
  styleUrls: ['./prompt-form.component.scss'],
})
export class PromptFormComponent {
  @Input() prompt!: Prompt;
  text: string = '';
  isClicked: boolean = false;
  isRespond: boolean = false;
  contents: any[] = [];
  foundUser!: User;
  error!: string;

  constructor(
    public auth: MyOriginAuthService,
    private userService: UserService,
    private promptService: PromptService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.getUser();
    }
  }

  getUser() {
    const userId = this.auth.getUserId();
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.foundUser = foundUser;
      },
      (errorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  insertFirstMessageSample() {
    this.text = this.prompt.firstMessageSample;
  }

  postPrompt(postForm: NgForm) {
    this.isClicked = true;
    if (!this.foundUser.isConfirmedPayment) {
      this.auth.incrementClick();
    }
    this.contents.push({
      role: 'user',
      content: postForm.value.postPrompt,
    });
    postForm.value.system = this.prompt.system;

    this.addHistory();
    this.promptService.postPrompt(postForm.value).subscribe(
      (content) => {
        this.contents.push(content);
        this.isClicked = false;
        this.isRespond = true;
      },
      (err) => {
        console.error(err);
        this.error = err.error.detail;
        this.isClicked = false;
      }
    );
    postForm.reset();
  }

  private addHistory() {
    this.userService.addHistory(this.prompt._id).subscribe(
      (success) => {},
      (err) => {
        console.error(err);
      }
    );
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
