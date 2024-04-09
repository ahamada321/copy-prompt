import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
      } else if (fragment === 'subscriber') {
        this.activeTab = 2;
        this.modalService.open(this.subscriberTemplateRef, {
          backdrop: 'static',
        });
      }
    });
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
    this.modalService.dismissAll();
  }
}
