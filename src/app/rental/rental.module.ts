import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { sharedModule } from '@angular/shared';
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
import { RentalEditComponent } from './rental-edit/rental-edit.component';
import { RentalManageComponent } from './rental-manage/rental-manage.component';

import { RentalNewComponent } from './rental-new/rental-new.component';
import { RentalRevenueComponent } from './rental-revenue/rental-revenue.component';
// import { RentalDetailUpdateComponent } from './rental-detail/rental-detail-update/rental-detail-update.component';
// import { NavbarBottomComponent } from '../common/navbar-bottom/navbar-bottom.component';
// import { GoogleMapsModule } from "../common/googlemaps/googlemaps.module";
// import { PaymentModule } from '../common/payment/payment.module';
// import { ReviewModule } from '../common/review/review.module';
// import { EditableModule } from '../shared/editable/editable.module';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
// import { ImageUploadMyverModule } from '../shared/image-upload-myver/image-upload-myver.module';

import { RentalService } from './service/rental.service';
// import { ImageUploadQrCodeModule } from '../common/image-upload-qr-code/image-upload-qr-code.module';
import { SearchbarModule } from '../shared/searchbar/searchbar.module';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: 'new', component: RentalNewComponent, canActivate: [AuthGuard] },

      {
        path: 'manage',
        component: RentalManageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage/revenue',
        component: RentalRevenueComponent,
        canActivate: [AuthGuard],
      },
      { path: ':rentalId', component: RentalDetailComponent }, // Going to replace rentalId to rentalUri
      {
        path: ':rentalId/edit',
        component: RentalEditComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':rentalId/revenue',
        component: RentalRevenueComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    // RentalBookingComponent,
    // RentalIncomingComponent,
    // RentalIncomingListComponent,
    // RentalIncomingDialog,
    // RentalIncomingSelectPlaceDialog,
    // RentalBookingsComponent,
    // RentalBookingsListComponent,
    // RentalManageScheduleComponent,
    RentalNewComponent,
    RentalEditComponent,
    RentalManageComponent,
    RentalRevenueComponent,
    // RentalDetailUpdateComponent, // This is replaced from RentalEditComponent.
    // NavbarBottomComponent,
    // TimePickerModal,
  ],
  imports: [
    //   sharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    // AngularMultiSelectModule,
    NgbModule,
    // MaterialModule,
    // EditableModule,
    // ChartsModule,
    // GoogleMapsModule,
    // PaymentModule,
    // ReviewModule,
    // BarRatingModule,
    SearchbarModule,
    // BookingSelecterModule,
    ImageUploadModule,
    // ImageUploadMyverModule,
    // ImageUploadQrCodeModule,
    JwBootstrapSwitchNg2Module,
    // TagInputModule,
  ],
  providers: [RentalService],
})
export class RentalModule {}
