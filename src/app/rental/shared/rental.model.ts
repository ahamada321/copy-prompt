import { User } from 'src/app/user/shared/user.model';

export class Rental {
  static readonly CATEGORIES: string[];
  _id!: string;
  createdAt?: string;
  updatedAt?: string;
  isShared?: boolean;

  isBanned?: boolean;
  reasonOfBanned?: string;

  name!: string;
  categories!: object[];
  description!: string;
  prompt!: string;
  image?: any;
  rating?: number;
  user!: User;
  favoritesFrom!: any[];
}
