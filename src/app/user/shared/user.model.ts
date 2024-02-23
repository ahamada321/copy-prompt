import { Schema } from 'mongoose';
import { Prompt } from 'src/app/prompt/shared/prompt.model';

export class User {
  _id?: Schema.Types.ObjectId;
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

  homepage?: string;
  twitter?: string;

  bookmarks!: Prompt[];
  prompts!: Prompt[];
  newsletter!: boolean;
}
