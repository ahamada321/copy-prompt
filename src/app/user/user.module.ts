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
import { UserService } from './shared/user.service';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserSettingsPasswordComponent } from './user-settings/user-settings-password/user-settings-password.component';
import { UserMypageComponent } from './user-mypage/user-mypage.component';
import { UserMypageBookmarkComponent } from './user-mypage/user-mypage-bookmark/user-mypage-bookmark.component';
import { BookmarkListItemComponent } from './user-mypage/user-mypage-bookmark/bookmark-list-item/bookmark-list-item.component';
import { UserMypageMyrentalsComponent } from './user-mypage/user-mypage-myrentals/user-mypage-myrentals.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'bookmark',
        component: UserMypageBookmarkComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'password',
        component: UserSettingsPasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':userId',
        component: UserProfileComponent,
      },
      { path: '', component: UserMypageComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserMypageComponent,
    UserMypageBookmarkComponent,
    BookmarkListItemComponent,
    UserMypageMyrentalsComponent,
    UserSettingsComponent,
    UserSettingsPasswordComponent,
    UserProfileComponent,
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
