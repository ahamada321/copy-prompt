import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { User } from 'src/app/user/shared/user.model';
import { UserService } from 'src/app/user/shared/user.service';
import { PaymentService } from '../shared/payment.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss'],
})
export class PaymentPlanComponent implements OnInit {
  modalRef!: NgbModalRef;
  isClicked: boolean = false;
  priceId!: string;
  billingCycle!: number;
  clientSecret: any;

  foundUser!: User;
  error: any;

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
    private paymentService: PaymentService // tmp
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this.auth.getUserId();
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.foundUser = foundUser;
      },
      (errorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  openStripeForm(content: any) {
    this.modalRef = this.modalService.open(content, { backdrop: 'static' });
  }

  updateSubscription() {
    this.isClicked = true;
    this.paymentService
      .updateSubscription(this.priceId, this.billingCycle)
      .subscribe(
        (subscription) => {
          this.showSwalSuccess();
        },
        (err) => {
          this.error = err.error.detail;
        }
      );
  }

  cancelSubscription() {
    this.isClicked = true;
    this.paymentService.cancelSubscription().subscribe(
      (subscription) => {
        this.showSwalSuccess();
      },
      (err) => {
        this.error = err.error.detail;
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      // title: 'User infomation has been updated!',
      icon: 'success',
      text: 'プランを変更しました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.modalRef.close();
      this.router.navigate(['/user/settings'], {
        queryParams: { planChanged: true },
      });
    });
  }
}
