import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-guide-button',
  templateUrl: './guide-button.component.html',
  styleUrls: ['./guide-button.component.scss'],
})
export class GuideButtonComponent {
  @ViewChild('popoverTrigger') popover!: NgbPopover;
  constructor(public auth: MyOriginAuthService, public location: Location) {}

  ngAfterViewInit() {
    if (this.isDetail()) {
      this.popover.open();
    }
  }

  isTop() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '/') {
      return true;
    }
    return false;
  }

  isDetail() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    if (
      titlee.split('/')[1] === 'prompt' &&
      titlee.split('/')[2] !== undefined
    ) {
      return true;
    }
    return false;
  }
}
