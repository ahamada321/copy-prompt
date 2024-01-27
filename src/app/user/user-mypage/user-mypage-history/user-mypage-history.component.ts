import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-mypage-history',
  templateUrl: './user-mypage-history.component.html',
  styleUrls: ['./user-mypage-history.component.scss'],
})
export class UserMypageHistoryComponent implements OnInit {
  histories: Prompt[] = [];
  errors: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getHistories();
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
