import { Component, OnInit, Input } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Prompt } from '../../prompt/shared/prompt.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() prompt!: Prompt;

  constructor(
    public auth: MyOriginAuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
