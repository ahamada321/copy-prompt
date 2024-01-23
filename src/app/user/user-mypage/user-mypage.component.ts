import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-mypage',
  templateUrl: './user-mypage.component.html',
  styleUrls: ['./user-mypage.component.scss'],
})
export class UserMypageComponent implements OnInit, OnDestroy {
  activeTab = 1;

  constructor() {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }
}
