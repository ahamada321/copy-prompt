import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/shared/auth.guard';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';
// import { ReviewModule } from '../shared/review/review.module';

import { UserComponent } from './user.component';
import { UserService } from './shared/user.service';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserSettingsPasswordComponent } from './user-settings/user-settings-password/user-settings-password.component';
import { UserMypageComponent } from './user-mypage/user-mypage.component';
import { UserMypageBookmarkComponent } from './user-mypage/user-mypage-bookmark/user-mypage-bookmark.component';
import { UserMypageHistoryComponent } from './user-mypage/user-mypage-history/user-mypage-history.component';
import { UserMypageMypromptComponent } from './user-mypage/user-mypage-myprompt/user-mypage-myprompt.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListCardModule } from '../shared/list-card/list-card.module';
import { UserSettingsPlanComponent } from './user-settings/user-settings-plan/user-settings-plan.component';
import { MangaLpModule } from '../shared/manga-lp/manga-lp.module';
import { SubscribeFaqModule } from '../shared/subscribe-faq/subscribe-faq.module';
import { ChangePlanPayComponent } from './user-settings/user-settings-plan/helpers/change-plan-pay.component';

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
        path: 'plan',
        component: UserSettingsPlanComponent,
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
    UserMypageHistoryComponent,
    UserMypageMypromptComponent,
    UserSettingsComponent,
    UserSettingsPasswordComponent,
    UserSettingsPlanComponent,
    ChangePlanPayComponent, // tmp
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ImageUploadModule,
    // ImageUploadMyverModule,
    ListCardModule,
    MangaLpModule,
    SubscribeFaqModule,
  ],
  providers: [UserService],
})
export class UserModule {}
