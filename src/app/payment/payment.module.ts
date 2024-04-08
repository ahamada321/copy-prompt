import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/shared/auth.guard';

import { PaymentComponent } from './payment.component';
import { PaymentService } from './shared/payment.service';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';
import { PaymentPlanPayComponent } from './payment-plan/helpers/payment-plan-pay.component';
import { MangaLpModule } from '../shared/manga-lp/manga-lp.module';

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
    PaymentPlanPayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MangaLpModule,
  ],
  providers: [PaymentService],
})
export class PaymentModule {}
