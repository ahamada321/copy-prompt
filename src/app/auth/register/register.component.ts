import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyOriginAuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from '../../user/shared/user.model';
import Swal from 'sweetalert2';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { Meta } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isTermsAgreed: boolean = false;
  isClicked: boolean = false;

  focus: any;
  focus1: any;
  focus2: any;
  focus3: any;

  formData: User = new User();

  errors: any[] = [];

  constructor(
    private auth: MyOriginAuthService,
    private modalService: NgbModal,
    private router: Router,
    private meta: Meta,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.updateMeta();
    this.navbarService.setNavbar();
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('full-screen');
    body.classList.add('register-page');
  }

  ngOnDestroy() {
    this.navbarService.resetNavbar();
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('full-screen');
    body.classList.remove('register-page');
  }

  updateMeta() {
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
    this.router.navigate(['/']);
    this.modalService.open(LoginPopupComponent, { backdrop: 'static' });
  }

  showSwalSuccess() {
    Swal.fire({
      icon: 'success',
      title: '登録完了',
      text: '無事にログイン出来るようになりました！',
      customClass: {
        confirmButton: 'btn btn-primary btn-lg',
      },
      buttonsStyling: false,
      allowOutsideClick: false,
    }).then(() => {
      this.modalLoginOpen();
    });
  }

  termsOpen(content: any) {
    this.modalService.open(content, { backdrop: 'static' });
  }
}
