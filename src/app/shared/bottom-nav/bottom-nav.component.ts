import { Component, OnInit, ElementRef } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { MyOriginAuthService } from '../../auth/shared/auth.service';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {
  titlee!: any;
  constructor(
    public auth: MyOriginAuthService,
    public location: Location,
    private modalService: NgbModal
  ) {
    this.titlee = this.location.prepareExternalUrl(this.location.path());
    this.titlee = this.titlee.slice(1);
  }

  ngOnInit() {}

  onClick() {
    this.titlee = this.location.prepareExternalUrl(this.location.path());
    this.titlee = this.titlee.slice(1);
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }
}
