import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MyOriginAuthService } from '../../auth/shared/auth.service';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {
  @Input() titlee!: string;

  constructor(
    public auth: MyOriginAuthService,
    public location: Location,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  onClick() {
    const locationPath = this.location.prepareExternalUrl(this.location.path());
    this.titlee = locationPath.split('/')[1];
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
