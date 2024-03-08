import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOriginAuthService } from '../shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';
import { User } from '../../user/shared/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isTermsAgreed: boolean = false;
  isClicked: boolean = false;

  focusName!: boolean;
  focusEmail!: boolean;
  focusPassword!: boolean;

  formData: User = new User();

  errors: any[] = [];

  constructor(
    private meta: Meta,
    private router: Router,
    private auth: MyOriginAuthService,
    private modalService: NgbModal,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.updateMeta();
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('register-page');
  }

  ngOnDestroy() {
    this.navbarService.resetNavbarPosition();
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('register-page');
  }

  updateMeta() {
    this.meta.updateTag({
      name: 'description',
      content:
        'あつまれ！GPTプロンプトに登録すると、ChatGPTで使える多種多様なプロンプトが手に入るよ。今すぐ有能プロンプトをGetして楽しよう',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'あつまれ！GPTプロンプトに登録すると、ChatGPTで使える多種多様なプロンプトが手に入るよ。今すぐ有能プロンプトをGetして楽しよう',
    });
  }

  register(registerFormData: any) {
    this.isClicked = true;
    this.auth.register(registerFormData).subscribe(
      (newUser) => {
        if (newUser.isVerified) {
          this.showSwalSuccess();
        } else {
          this.router.navigate(['/register/sent']);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
        this.isClicked = false;
      }
    );
  }

  modalLoginOpen() {
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }

  private showSwalSuccess() {
    Swal.fire({
      icon: 'success',
      text: '無事にログイン出来るようになりました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
    }).then(() => {
      this.modalLoginOpen();
    });
  }

  termsOpen(content: any) {
    this.modalService.open(content, { backdrop: 'static' });
  }
}
