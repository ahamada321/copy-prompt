import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyOriginAuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit, OnDestroy {
  isClicked: boolean = false;
  loginForm!: FormGroup;
  errors: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private auth: MyOriginAuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-popup');

    this.initForm();
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    //   body.classList.remove('full-screen');
    body.classList.remove('login-popup');
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  isInvalidForm(fieldname: any): boolean {
    return (
      this.loginForm.controls[fieldname].invalid &&
      (this.loginForm.controls[fieldname].dirty ||
        this.loginForm.controls[fieldname].touched)
    );
  }

  isPromptDetail() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.split('/')[2] !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.isClicked = true;
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.activeModal.close('Close click');
        if (!this.isPromptDetail()) {
          this.router.navigate(['/user']);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
        this.isClicked = false;
      }
    );
  }
}
