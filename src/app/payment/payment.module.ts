import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/shared/auth.guard';

import { PaymentComponent } from './payment.component';
import { PaymentService } from './shared/payment.service';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { PaymentPlanPayComponent } from './payment-plan/payment-plan-pay/payment-plan-pay.component';
import { PaymentPlanMangaComponent } from './payment-plan/payment-plan-manga/payment-plan-manga.component';
import { PaymentPlanFaqFaqComponent } from './payment-plan/payment-plan-faq/payment-plan-faq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'plan',
    component: PaymentComponent,
    children: [
      { path: '', component: PaymentPlanComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentPlanComponent,
    PaymentPlanFaqFaqComponent,
    PaymentPlanMangaComponent,
    PaymentPlanPayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [PaymentPlanComponent],
  providers: [PaymentService],
})
export class PaymentModule {}
