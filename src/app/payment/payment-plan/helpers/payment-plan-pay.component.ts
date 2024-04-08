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
  validatingCardFlag: boolean = false;
  error: any;

  stripe: any;
  elements: any;

  @ViewChild('payment') paymentRef!: ElementRef;
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
      .createPayment(this.priceId)
      .subscribe((subscription) => {
        const options = {
          clientSecret: subscription.clientSecret,
        };
        this.elements = this.stripe.elements(options);
        this.payment = this.elements.create('payment');
        this.payment.mount(this.paymentRef.nativeElement);
      });
  }

  async checkout() {
    try {
      const baseURL = window.location.origin;
      await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: baseURL,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
