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

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list/rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

import { RentalNewComponent } from './rental-new/rental-new.component';
import { RentalEditComponent } from './rental-edit/rental-edit.component';

// import { GoogleMapsModule } from "../common/googlemaps/googlemaps.module";
// import { PaymentModule } from '../common/payment/payment.module';
// import { ReviewModule } from '../common/review/review.module';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';

import { RentalService } from './shared/rental.service';
import { SearchbarModule } from '../shared/searchbar/searchbar.module';
import { QuillModule } from 'ngx-quill';
import { CodeSnippetModule } from '../shared/code-snippet/code-snippet.module';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: 'new', component: RentalNewComponent, canActivate: [AuthGuard] },
      {
        path: 'edit/:rentalId',
        component: RentalEditComponent,
        canActivate: [AuthGuard],
      },
      { path: ':rentalId', component: RentalDetailComponent }, // Going to replace rentalId to rentalUri
    ],
  },
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    RentalNewComponent,
    RentalEditComponent,
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
  providers: [RentalService],
})
export class RentalModule {}
