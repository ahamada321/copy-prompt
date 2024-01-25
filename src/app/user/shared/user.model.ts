import { Schema } from 'mongoose';
import { Rental } from 'src/app/rental/shared/rental.model';

export class User {
  _id?: Schema.Types.ObjectId;
  isVerified?: boolean;
  isBanned?: boolean;

  name!: string;
  email!: string;
  password?: string;
  passwordConfirmation?: string; // Frontend only!
  description?: string;
  image?: string;
  stripe?: string;

  homepage?: string;
  twitter?: string;

  rentals!: Rental[];
  newsletter!: boolean;
}
