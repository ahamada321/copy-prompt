import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../shared/payment.service';

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
  error: any;
  payment: any;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.setup();
  }

  async setup() {
    this.stripe = await loadStripe(
      'pk_test_pb83wBnjrbxnUltLLCR5KlYC00NK6M8day'
    );
    this.paymentService
      .createSubscription(this.priceId, this.billingCycle)
      .subscribe(
        (subscription) => {
          this.isLoading = false;
          const options = {
            clientSecret: subscription.clientSecret,
          };
          this.elements = this.stripe.elements(options);
          this.payment = this.elements.create('payment');
          this.payment.mount(this.paymentRef.nativeElement);
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

    try {
      await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: baseURL + '/user',
        },
      });
    } catch (err) {
      this.error = err;
      console.error(this.error);
    }
  }
}
