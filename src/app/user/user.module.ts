import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/shared/auth.guard';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';
// import { ReviewModule } from '../shared/review/review.module';

import { UserComponent } from './user.component';
import { UserBookmarkComponent } from './user-mypage/user-bookmark/user-bookmark.component';
import { BookmarkListItemComponent } from './user-mypage/user-bookmark/bookmark-list-item/bookmark-list-item.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserService } from './shared/user.service';
import { UserMypageComponent } from './user-mypage/user-mypage.component';
import { UserMyrentalsComponent } from './user-mypage/user-myrentals/user-myrentals.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'bookmark',
        component: UserBookmarkComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage',
        component: UserBookmarkComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'password',
        component: UserChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      { path: '', component: UserMypageComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserMypageComponent,
    UserMyrentalsComponent,
    UserBookmarkComponent,
    BookmarkListItemComponent,
    UserSettingsComponent,
    UserChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    ImageUploadModule,
    // ImageUploadMyverModule,
  ],
  providers: [UserService],
})
export class UserModule {}
