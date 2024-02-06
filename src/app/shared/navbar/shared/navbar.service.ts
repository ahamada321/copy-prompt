import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  setNavbar() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  resetNavbar() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
      navbar.classList.add('nav-down');
    }
  }

  resetNavbarPosition() {
    let navbar = document.getElementsByTagName('nav')[0];
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
      navbar.classList.add('nav-down');
    }
  }
}
