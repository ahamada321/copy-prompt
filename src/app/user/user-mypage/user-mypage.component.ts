import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RentalService } from 'src/app/rental/service/rental.service';
import { Rental } from 'src/app/rental/service/rental.model';

@Component({
  selector: 'app-user-mypage',
  templateUrl: './user-mypage.component.html',
  styleUrls: ['./user-mypage.component.scss'],
})
export class UserMypageComponent implements OnInit, OnDestroy {
  activeTab = 1;
  favoriteRentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.getUserfavoriteRentals();
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }

  private getUserfavoriteRentals() {
    this.rentalService.getUserfavoriteRentals().subscribe(
      (foundRentals: Rental[]) => {
        this.favoriteRentals = foundRentals;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
      }
    );
  }
}
