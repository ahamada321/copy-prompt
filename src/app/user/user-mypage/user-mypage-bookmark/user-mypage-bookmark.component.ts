import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Prompt } from 'src/app/prompt/shared/prompt.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-mypage-bookmark',
  templateUrl: './user-mypage-bookmark.component.html',
  styleUrls: ['./user-mypage-bookmark.component.scss'],
})
export class UserMypageBookmarkComponent implements OnInit {
  bookmarks: Prompt[] = [];
  errors: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getBookmarks();
  }

  private getBookmarks() {
    this.userService.getBookmarks().subscribe(
      (foundBookmarks: Prompt[]) => {
        this.bookmarks = foundBookmarks;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
