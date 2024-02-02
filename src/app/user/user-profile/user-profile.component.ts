import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Meta } from '@angular/platform-browser';

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
    private userService: UserService,
    private meta: Meta
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
        this.updateMeta();
      },
      (errorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  updateMeta() {
    if (this.userData.description) {
      this.meta.updateTag({
        name: 'description',
        content: this.userData.description,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.userData.description,
      });
    } else {
      this.meta.updateTag({
        name: 'description',
        content:
          'ChatGPTやBingで使える超高品質なプロンプトのテンプレが無料で手に入るサービスです',
      });
      this.meta.updateTag({
        property: 'og:description',
        content:
          'ChatGPTやBingで使える超高品質なプロンプトのテンプレが無料で手に入るサービスです',
      });
    }
  }

  // pageChange() {
  //   // this.prompts = [];
  //   // this.getUserPrompts();
  // }
}
