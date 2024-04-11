import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeFaqComponent } from './subscribe-faq.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SubscribeFaqComponent],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [SubscribeFaqComponent],
  providers: [],
})
export class SubscribeFaqModule {}
