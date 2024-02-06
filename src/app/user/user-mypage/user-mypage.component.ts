import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-user-mypage',
  templateUrl: './user-mypage.component.html',
  styleUrls: ['./user-mypage.component.scss'],
})
export class UserMypageComponent implements OnInit, OnDestroy {
  // activeTab = 1;
  activeTab = 3; // Tmp

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }
}
