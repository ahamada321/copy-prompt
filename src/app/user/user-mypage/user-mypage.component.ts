import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-user-mypage',
  templateUrl: './user-mypage.component.html',
  styleUrls: ['./user-mypage.component.scss'],
})
export class UserMypageComponent implements OnInit, OnDestroy {
  activeTab = 2;

  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService
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

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }
}
