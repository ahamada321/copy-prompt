import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss'],
})
export class PaymentPlanComponent implements OnInit {
  priceId!: string;
  clientSecret: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openStripeForm(content: any) {
    this.modalService.open(content, { backdrop: 'static' });
  }
}
