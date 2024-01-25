import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { Rental } from 'src/app/rental/shared/rental.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  rentals: Rental[] = [];
  userData!: User;

  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;
  state_info = true;
  state_info1 = true;

  isClicked: boolean = false;
  errors: any[] = [];

  constructor(
    private auth: MyOriginAuthService,
    private router: Router,
    private userService: UserService,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('settings-page');
    this.getUser();
    this.getOwnerRentals();
  }
  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('settings-page');
  }

  getUser() {
    const userId = this.auth.getUserId();
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
      },
      (errorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
        this.isClicked = false;
      }
    );
  }

  getOwnerRentals() {
    this.rentalService.getOwnerRentals(this.pageIndex, this.pageSize).subscribe(
      (result) => {
        if (result[0].foundRentals.length > 0) {
          this.rentals = result[0].foundRentals;
          this.pageCollectionSize = result[0].metadata[0].total;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  pageChange() {
    this.rentals = [];
    this.getOwnerRentals();
  }
}
