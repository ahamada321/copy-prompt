import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-mypage-history',
  templateUrl: './user-mypage-history.component.html',
  styleUrls: ['./user-mypage-history.component.scss'],
})
export class UserMypageHistoryComponent implements OnInit, OnDestroy {
  histories: Prompt[] = [];
  errors: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getHistories();
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }

  private getHistories() {
    this.userService.getHistories().subscribe(
      (foundHistories: Prompt[]) => {
        this.histories = foundHistories;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
