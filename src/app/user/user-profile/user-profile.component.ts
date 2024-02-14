import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userData!: User;
  userId!: string;
  errors: any[] = [];

  constructor(
    private meta: Meta,
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private userService: UserService
  ) {}

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('settings-page');

    this.route.params.subscribe((params) => {
      this.getUserById(params['userId']);
    });
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
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
          'こんなに楽できる！コピペだけでチャットGPTを最大限に活用できるテンプレが豊富なプロンプト共有サイト',
      });
      this.meta.updateTag({
        property: 'og:description',
        content:
          'こんなに楽できる！コピペだけでチャットGPTを最大限に活用できるテンプレが豊富なプロンプト共有サイト',
      });
    }
  }
}
