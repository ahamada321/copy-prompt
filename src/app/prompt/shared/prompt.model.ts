import { User } from 'src/app/user/shared/user.model';

export class Prompt {
  _id!: string;
  createdAt?: string;
  updatedAt?: string;
  isShared?: boolean;

  isBanned?: boolean;
  reasonOfBanned?: string;

  name!: string;
  categories!: { id: number; itemName: string }[];
  description!: string;
  usage!: string;
  example!: string;
  system!: string;
  firstGuidance!: string;
  firstMessageSample!: string;
  rating?: number;
  comments!: Comment[];

  isBookmarkedFrom!: User[];
  isCopiedFrom!: User[];
  user!: User;
}
