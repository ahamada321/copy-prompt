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
import { UserBookmarkComponent } from './user-bookmark/user-bookmark.component';
import { BookmarkListItemComponent } from './user-bookmark/bookmark-list-item/bookmark-list-item.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

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
      { path: '', component: UserSettingsComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    BookmarkListItemComponent,
    UserBookmarkComponent,
    UserSettingsComponent,
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
  providers: [],
})
export class UserModule {}
