import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export class Rental {
  static readonly CATEGORIES: string[];
  _id!: string;
  createdAt?: string;
  updatedAt?: string;
  isShared?: boolean;

  isBanned?: boolean;
  reasonOfBanned?: string;

  homepage?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  selectedCategory?: string;

  name!: string;
  description!: string;
  prompt!: string;

  // courseImg: string;
  // courseTitle: string;
  // courseDescription: string;

  memo?: string;

  image!: any;
  // gallery1: string;
  // gallery2: string;
  // gallery3: string;
  // gallery4: string;
  // gallery5: string;
  // gallery6: string;
  // gallery7: string;
  // gallery8: string;
  // videoLink: string;

  rating?: number;
  user?: any;
  favoritesFrom!: any[];
}
