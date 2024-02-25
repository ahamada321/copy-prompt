import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login-resetpassword-sent',
  templateUrl: './login-resetpassword-sent.component.html',
  styleUrls: ['./login-resetpassword-sent.component.scss'],
})
export class LoginResetpasswordSentComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    let body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('register-page');
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');

    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('register-page');
  }
}
