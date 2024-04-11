import { ObjectId } from 'mongoose';
import { Prompt } from 'src/app/prompt/shared/prompt.model';

export class User {
  _id?: ObjectId;
  isVerified?: boolean;
  isBanned?: boolean;
  lastLogin?: number;

  name!: string;
  email!: string;
  password?: string;
  passwordConfirmation?: string; // Frontend only!
  description?: string;
  image?: string;
  stripe?: string;
  customerId?: string; // Stripe
  subscriptionId?: string; // Stripe
  billingCycle?: number; // Stripe
  currentPeriodEnd?: Date; // Stripe
  isConfirmedPayment?: boolean; // Stripe

  homepage?: string;
  twitter?: string;

  bookmarks!: Prompt[];
  prompts!: Prompt[];
  newsletter!: boolean;
}
