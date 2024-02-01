import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { AuthGuard } from "../auth/shared/auth.guard";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
// import { TagInputModule } from 'ngx-chips';
// import { BarRatingModule } from "ngx-bar-rating";

import { PromptComponent } from "./prompt.component";
import { PromptListComponent } from "./prompt-list/prompt-list.component";
import { PromptDetailComponent } from "./prompt-detail/prompt-detail.component";
import { PromptListLatestComponent } from "./prompt-list/prompt-list-latest/prompt-list-latest.component";
import { PromptListRankingComponent } from "./prompt-list/prompt-list-ranking/prompt-list-ranking.component";
import { PromptSearchComponent } from "./prompt-search/prompt-search.component";

import { PromptNewComponent } from "./prompt-new/prompt-new.component";
import { PromptEditComponent } from "./prompt-edit/prompt-edit.component";

import { ImageUploadModule } from "../shared/image-upload/image-upload.module";
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';

import { SearchbarModule } from "../shared/searchbar/searchbar.module";
import { QuillModule } from "ngx-quill";
import { CodeSnippetModule } from "../shared/code-snippet/code-snippet.module";
import { ListCardModule } from "../shared/list-card/list-card.module";
import { PromptService } from "./shared/prompt.service";
import { CommentService } from "./shared/comment.service";

const routes: Routes = [
  {
    path: "prompt",
    component: PromptComponent,
    children: [
      { path: "", component: PromptListComponent },
      { path: "search", component: PromptSearchComponent },
      { path: "new", component: PromptNewComponent, canActivate: [AuthGuard] },
      {
        path: "edit/:promptId",
        component: PromptEditComponent,
        canActivate: [AuthGuard],
      },
      { path: ":promptId", component: PromptDetailComponent }, // Going to replace promptId to promptUri
    ],
  },
];

@NgModule({
  declarations: [
    PromptComponent,
    PromptListComponent,
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
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgbModule,
    // BarRatingModule,
    // ImageUploadQrCodeModule,
    JwBootstrapSwitchNg2Module,
    // TagInputModule,
    ImageUploadModule,
    // ImageUploadMyverModule,
    QuillModule,
    CodeSnippetModule,
    SearchbarModule,
    ListCardModule,
  ],
  providers: [PromptService, CommentService],
})
export class PromptModule {}
