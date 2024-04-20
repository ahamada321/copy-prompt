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
  contents: { role: string; content: string; displayContent?: string }[] = [];

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
    this.initFirstText();
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

  initFirstText() {
    this.contents.push({
      role: 'assistant',
      content: this.prompt.firstGuidance,
      displayContent: '',
    });
    this.textAnimation(this.contents[this.contents.length - 1]);
  }

  textAnimation(content: any) {
    content.displayContent = '';
    for (let i = 0; i < content.content.length; i++) {
      setTimeout(() => {
        content.displayContent += content.content.charAt(i);
      }, i * 100);
    }
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
      displayContent: postForm.value.postPrompt,
    });

    this.addHistory();
    postForm.value.system = this.prompt.system;
    this.promptService.postPrompt(postForm.value).subscribe(
      (content) => {
        this.contents.push(content);
        this.textAnimation(this.contents[this.contents.length - 1]);

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
