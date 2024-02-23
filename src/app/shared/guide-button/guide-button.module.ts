import { NgModule } from '@angular/core';
import { GuideButtonComponent } from './guide-button.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [GuideButtonComponent],
  exports: [GuideButtonComponent],
})
export class GuideButtonModule {}
