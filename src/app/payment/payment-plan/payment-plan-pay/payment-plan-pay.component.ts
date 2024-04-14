import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../shared/payment.service';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-payment-plan-pay',
  templateUrl: './payment-plan-pay.component.html',
  styleUrls: ['./payment-plan-pay.component.scss'],
})
export class PaymentPlanPayComponent implements OnInit {
  @Input() priceId!: string;
  @Input() billingCycle!: number;
  @ViewChild('payment') paymentRef!: ElementRef;
  isLoading: boolean = true;
  isClicked: boolean = false;

  stripe: any;
  elements: any;
  payment: any;
  confirmData: any;
  error: any;

  constructor(
    public auth: MyOriginAuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.setup();
  }

  async setup() {
    this.stripe = await loadStripe(
      'pk_live_3m195F2MzyizUqu53t1YOGOB00CyyOvnDU' // Prod
      // 'pk_test_pb83wBnjrbxnUltLLCR5KlYC00NK6M8day' // Dev
    );
    this.paymentService
      .createSubscription(this.priceId, this.billingCycle)
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.elements = this.stripe.elements({
            clientSecret: result.clientSecret,
          });
          this.payment = this.elements.create('payment');
          this.payment.mount(this.paymentRef.nativeElement);
          this.confirmData = {
            subscriptionId: result.subscriptionId,
            currentPeriodEnd: result.currentPeriodEnd,
            billingCycle: result.billingCycle,
          };
        },
        (err) => {
          this.error = err.error.detail;
          console.error(this.error);
        }
      );
  }

  async checkout() {
    this.isClicked = true;
    const baseURL = window.location.origin;
    const jsonParam = encodeURIComponent(JSON.stringify(this.confirmData));
    this.auth.resetClicks();

    try {
      await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: baseURL + '/user?confirmData=' + jsonParam,
        },
      });
    } catch (err) {
      this.error = err;
      console.error(this.error);
    }
  }
}
