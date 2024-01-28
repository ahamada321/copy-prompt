import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
// import { ChartsModule } from "ng2-charts";
import { AuthGuard } from '../auth/shared/auth.guard';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
// import { TagInputModule } from 'ngx-chips';
// import { BarRatingModule } from "ngx-bar-rating";

import { PromptComponent } from './prompt.component';
import { PromptListComponent } from './prompt-list/prompt-list.component';
import { PromptListItemComponent } from './prompt-list/prompt-list-item/prompt-list-item.component';
import { PromptDetailComponent } from './prompt-detail/prompt-detail.component';

import { PromptNewComponent } from './prompt-new/prompt-new.component';
import { PromptEditComponent } from './prompt-edit/prompt-edit.component';

// import { GoogleMapsModule } from "../common/googlemaps/googlemaps.module";
// import { PaymentModule } from '../common/payment/payment.module';
// import { ReviewModule } from '../common/review/review.module';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';

import { PromptService } from './shared/prompt.service';
import { SearchbarModule } from '../shared/searchbar/searchbar.module';
import { QuillModule } from 'ngx-quill';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';
import { PromptListLatestComponent } from './prompt-list/prompt-list-latest/prompt-list-latest.component';
import { PromptListRankingComponent } from './prompt-list/prompt-list-ranking/prompt-list-ranking.component';

const routes: Routes = [
  {
    path: 'prompt',
    component: PromptComponent,
    children: [
      { path: '', component: PromptListComponent },
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
    // MaterialModule,
    // EditableModule,
    // ChartsModule,
    // GoogleMapsModule,
    // PaymentModule,
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
