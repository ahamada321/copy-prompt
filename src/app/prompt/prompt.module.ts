import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AuthGuard } from '../auth/shared/auth.guard';
// import { TagInputModule } from 'ngx-chips';
// import { BarRatingModule } from "ngx-bar-rating";
import { CarouselModule } from 'ngx-owl-carousel-o';

import { PromptComponent } from './prompt.component';
import { PromptListComponent } from './prompt-list/prompt-list.component';
import { PromptListExampleComponent } from './prompt-list/prompt-list-example/prompt-list-example.component';
import { PromptListCategoryComponent } from './prompt-list/prompt-list-category/prompt-list-category.component';
import { PromptListLatestComponent } from './prompt-list/prompt-list-latest/prompt-list-latest.component';
import { PromptListRankingComponent } from './prompt-list/prompt-list-ranking/prompt-list-ranking.component';
import { PromptDetailComponent } from './prompt-detail/prompt-detail.component';
import { PromptDetailCommentComponent } from './prompt-detail/prompt-detail-comment/prompt-detail-comment.component';
import { PromptSearchComponent } from './prompt-search/prompt-search.component';

import { PromptNewComponent } from './prompt-new/prompt-new.component';
import { PromptEditComponent } from './prompt-edit/prompt-edit.component';

import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';

import { SearchbarModule } from '../shared/searchbar/searchbar.module';
import { QuillModule } from 'ngx-quill';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { ListCardModule } from '../shared/list-card/list-card.module';
import { PromptService } from './shared/prompt.service';
import { CommentService } from './shared/comment.service';
import { GuideButtonModule } from '../shared/guide-button/guide-button.module';
import { PromptListCommentComponent } from './prompt-list/prompt-list-comment/prompt-list-comment.component';
import { PromptDetailOthersComponent } from './prompt-detail/prompt-detail-others/prompt-detail-others.component';
import { PromptFormModule } from '../shared/prompt-form/prompt-form.module';
import { QuizbarModule } from '../shared/quizbar/quizbar.module';

const routes: Routes = [
  { path: '', component: PromptListComponent },
  {
    path: 'prompt',
    component: PromptComponent,
    children: [
      { path: '', component: PromptSearchComponent },
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
    PromptListExampleComponent,
    PromptListCategoryComponent,
    PromptListCommentComponent,
    PromptListLatestComponent,
    PromptListRankingComponent,
    PromptSearchComponent,
    PromptDetailComponent,
    PromptDetailCommentComponent,
    PromptDetailOthersComponent,
    PromptNewComponent,
    PromptEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgbModule,
    // BarRatingModule,
    // ImageUploadQrCodeModule,
    // TagInputModule,
    CarouselModule,
    QuillModule,
    ImageUploadModule,
    // ImageUploadMyverModule,
    CodeSnippetModule,
    PromptFormModule,
    SearchbarModule,
    QuizbarModule,
    ListCardModule,
    GuideButtonModule,
  ],
  providers: [PromptService, CommentService],
})
export class PromptModule {}
