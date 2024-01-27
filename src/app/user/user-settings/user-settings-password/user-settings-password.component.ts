import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-settings-password',
  templateUrl: './user-settings-password.component.html',
  styleUrls: ['./user-settings-password.component.scss'],
})
export class UserSettingsPasswordComponent implements OnInit {
  userData!: User;

  constructor(private auth: MyOriginAuthService, private router: Router) {}

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('settings-page');
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

  updateUser(userForm: NgForm) {
    const userId = this.auth.getUserId();
    this.auth.updateUser(userId, userForm.value).subscribe(
      (UserUpdated) => {
        userForm.reset(userForm.value);
        this.showSwalSuccess();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private showSwalSuccess() {
    Swal.fire({
      icon: 'success',
      text: 'パスワードが変更されました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.router.navigate(['/prompt', { registered: 'success' }]);
    });
  }
}
