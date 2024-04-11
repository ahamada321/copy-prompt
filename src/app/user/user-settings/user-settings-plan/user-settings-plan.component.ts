import { Component, OnInit } from '@angular/core';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-settings-plan',
  templateUrl: './user-settings-plan.component.html',
  styleUrls: ['./user-settings-plan.component.scss'],
})
export class UserSettingsPlanComponent implements OnInit {
  priceId!: string;
  billingCycle!: number;
  isClicked: boolean = false;
  stripeForm: any;

  foundUser!: User;

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private auth: MyOriginAuthService,
    private userService: UserService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
  }

  getUser() {
    const userId = this.auth.getUserId();
    this.userService.getUserById(userId).subscribe(
      (foundUser) => {
        this.foundUser = foundUser;
      },
      (errorResponse) => {
        console.error(errorResponse);
      }
    );
  }

  updateUser(userForm: NgForm) {
    this.isClicked = true;
    const userId = this.auth.getUserId();
    this.auth.updateUser(userId, userForm.value).subscribe(
      (UserUpdated) => {
        userForm.reset(userForm.value);
        this.showSwalSuccess();
      },
      (err) => {
        this.isClicked = false;
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
      this.router.navigate(['/', { registered: 'success' }]);
    });
  }
  openStripeForm(content: any) {
    // this.modalService.open(content, { backdrop: 'static' });
  }
}
