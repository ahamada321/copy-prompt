import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { UserService } from 'src/app/user/shared/user.service';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent {
  @Input() prompt!: Prompt;
  isCopied: boolean = false;
  isClicked: boolean = false;

  constructor(
    public auth: MyOriginAuthService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  copyCode() {
    // ここでクリップボードにコピーするロジックを実装
    navigator.clipboard.writeText(this.prompt.system);
    this.addHistory();
  }

  private addHistory() {
    this.isClicked = true;
    this.userService.addHistory(this.prompt._id).subscribe(
      (success) => {
        this.isClicked = false;
      },
      (err) => {
        this.isClicked = false;
        console.error(err);
      }
    );
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
