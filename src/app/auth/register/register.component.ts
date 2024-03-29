import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOriginAuthService } from '../shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { NavbarService } from 'src/app/shared/navbar/shared/navbar.service';
import { User } from '../../user/shared/user.model';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  title: string = '無料会員登録する';
  previousTitle!: string;

  isTermsAgreed: boolean = false;
  isClicked: boolean = false;

  focusName!: boolean;
  focusEmail!: boolean;
  focusPassword!: boolean;

  formData: User = new User();
  errors: any[] = [];
  promptId!: string;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private auth: MyOriginAuthService,
    private modalService: NgbModal,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.updateTitleAndMeta();
    this.navbarService.setNavbar();
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');

    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.promptId = params['promptId'];
    });
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.previousTitle);
    this.navbarService.resetNavbarPosition();
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  updateTitleAndMeta() {
    this.previousTitle = this.titleService.getTitle();
    this.titleService.setTitle(this.title + ' | あつまれ！GPTプロンプト');

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
      (token) => {
        this.showSwalSuccess();
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
      if (this.promptId) {
        this.router.navigate(['/prompt', this.promptId]);
        return;
      }
      this.router.navigate(['/user']);
    });
  }

  termsOpen(content: any) {
    this.modalService.open(content, { backdrop: 'static' });
  }
}
