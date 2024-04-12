import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from 'src/app/payment/shared/payment.service';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-user-mypage',
  templateUrl: './user-mypage.component.html',
  styleUrls: ['./user-mypage.component.scss'],
})
export class UserMypageComponent implements OnInit, OnDestroy {
  @ViewChild('Subscriber') subscriberTemplateRef!: TemplateRef<any>;
  activeTab: number = 2;

  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private paymentService: PaymentService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.navbarService.setNavbar();
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'new') {
        this.activeTab = 3;
      } else if (fragment === 'logs') {
        this.activeTab = 2;
      } else if (fragment === 'favorite') {
        this.activeTab = 1;
      }
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['confirmData']) {
        this.modalService.open(this.subscriberTemplateRef, {
          backdrop: 'static',
        });
        const jsonString = params['confirmData'];
        const confirmData = JSON.parse(jsonString);
        this.paymentService.confirmSubscription(confirmData).subscribe(
          (result) => {},
          (errorResponse) => {
            console.error(errorResponse);
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
    this.modalService.dismissAll();
  }
}
