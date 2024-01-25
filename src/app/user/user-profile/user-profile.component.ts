import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { Rental } from 'src/app/rental/shared/rental.model';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData!: User;
  userId!: string;

  pageIndex: number = 1;
  pageSize: number = 40; // Displaying contents per page.
  pageCollectionSize: number = 1;
  errors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('settings-page');

    this.route.params.subscribe((params) => {
      this.getUserById(params['userId']);
    });
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

  getUserById(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.userData = foundUser;
      },
      (errorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  // pageChange() {
  //   // this.rentals = [];
  //   // this.getUserRentals();
  // }
}
