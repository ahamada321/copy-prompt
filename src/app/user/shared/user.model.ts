import { Schema } from 'mongoose';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
// import { Booking } from "../booking-selecter/shared/booking.model";
import { Notification } from './notification.model';

export class User {
  _id?: Schema.Types.ObjectId;
  isVerified?: boolean;
  isBanned?: boolean;

  name!: string;
  email!: string;
  oldEmail?: string;
  password?: string;
  passwordConfirmation?: string; // Frontend only!
  description?: string;
  notification?: Notification[];

  affiliateCode?: string;
  stripe?: string;
  newsletter!: boolean;
}
