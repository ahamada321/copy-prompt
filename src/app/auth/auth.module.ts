import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginResetpasswordComponent } from './login-popup/login-resetpassword/login-resetpassword.component';
import { LoginResetpasswordSentComponent } from './login-popup/login-resetpassword/login-resetpassword-sent/login-resetpassword-sent.component';
import { RegisterComponent } from './register/register.component';
import { RegisterVerificationComponent } from './register/register-verification/register-verification.component';
import { RegisterSentComponent } from './register/register-sent/register-sent.component';

import { MyOriginAuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TermsTextModule } from '../statics/terms/helpers/terms-text/terms-text.module';
import { LoginPopupComponent } from './login-popup/login-popup.component';

const routes: Routes = [
  { path: 'login/reset', component: LoginResetpasswordComponent },
  { path: 'login/reset/sent', component: LoginResetpasswordSentComponent },
  // {
  //   path: 'login/reset/newpassword/:verifyToken',
  //   component: LoginNewPasswordComponent,
  // },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'register/sent', component: RegisterSentComponent },
  { path: 'register/:verifyToken', component: RegisterVerificationComponent },
];

@NgModule({
  declarations: [
    LoginPopupComponent,
    LoginResetpasswordComponent,
    LoginResetpasswordSentComponent,
    RegisterComponent,
    RegisterSentComponent,
    RegisterVerificationComponent,
  ],
  exports: [RouterModule, LoginPopupComponent],
  providers: [
    MyOriginAuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    JwBootstrapSwitchNg2Module,
    TermsTextModule,
  ],
})
export class AuthModule {}
