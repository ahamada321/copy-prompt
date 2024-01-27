import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PromptService } from 'src/app/prompt/shared/prompt.service';
import { Prompt } from 'src/app/prompt/shared/prompt.model';

@Component({
  selector: 'app-user-mypage-bookmark',
  templateUrl: './user-mypage-bookmark.component.html',
  styleUrls: ['./user-mypage-bookmark.component.scss'],
})
export class UserMypageBookmarkComponent implements OnInit, OnDestroy {
  favoritePrompts: Prompt[] = [];
  errors: any[] = [];

  constructor(private promptService: PromptService) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.getUserfavoritePrompts();
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }
  }

  private getUserfavoritePrompts() {
    this.promptService.getUserfavoritePrompts().subscribe(
      (foundPrompts: Prompt[]) => {
        this.favoritePrompts = foundPrompts;
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
