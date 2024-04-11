import { NgModule } from '@angular/core';
import { GuideButtonComponent } from './guide-button.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GuideButtonComponent],
  exports: [GuideButtonComponent],
})
export class GuideButtonModule {}
