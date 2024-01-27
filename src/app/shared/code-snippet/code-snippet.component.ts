import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent {
  @Input() code!: string;
  isCopied: boolean = false;

  constructor(
    public auth: MyOriginAuthService,
    private modalService: NgbModal
  ) {}

  copyCode() {
    // ここでクリップボードにコピーするロジックを実装
    navigator.clipboard.writeText(this.code);
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
