import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/shared/auth.guard';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
// import { TagInputModule } from 'ngx-chips';
// import { BarRatingModule } from "ngx-bar-rating";

import { PromptComponent } from './prompt.component';
import { PromptListItemComponent } from './prompt-list/prompt-list-item/prompt-list-item.component';
import { PromptListComponent } from './prompt-list/prompt-list.component';
import { PromptListLatestComponent } from './prompt-list/prompt-list-latest/prompt-list-latest.component';
import { PromptListRankingComponent } from './prompt-list/prompt-list-ranking/prompt-list-ranking.component';
import { PromptDetailComponent } from './prompt-detail/prompt-detail.component';

import { PromptSearchComponent } from './prompt-search/prompt-search.component';
import { PromptNewComponent } from './prompt-new/prompt-new.component';
import { PromptEditComponent } from './prompt-edit/prompt-edit.component';

// import { ReviewModule } from '../common/review/review.module';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';

import { PromptService } from './shared/prompt.service';
import { SearchbarModule } from '../shared/searchbar/searchbar.module';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: 'prompt',
    component: PromptComponent,
    children: [
      { path: '', component: PromptListComponent },
      { path: 'search', component: PromptSearchComponent },
      { path: 'new', component: PromptNewComponent, canActivate: [AuthGuard] },
      {
        path: 'edit/:promptId',
        component: PromptEditComponent,
        canActivate: [AuthGuard],
      },
      { path: ':promptId', component: PromptDetailComponent }, // Going to replace promptId to promptUri
    ],
  },
];

@NgModule({
  declarations: [
    PromptComponent,
    PromptListComponent,
    PromptListItemComponent,
    PromptListLatestComponent,
    PromptListRankingComponent,
    PromptSearchComponent,
    PromptDetailComponent,
    PromptNewComponent,
    PromptEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    // ReviewModule,
    // BarRatingModule,
    SearchbarModule,
    ImageUploadModule,
    // ImageUploadMyverModule,
    // ImageUploadQrCodeModule,
    JwBootstrapSwitchNg2Module,
    // TagInputModule,
    QuillModule,
    CodeSnippetModule,
  ],
  providers: [PromptService],
})
export class PromptModule {}
