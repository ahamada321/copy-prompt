import { User } from 'src/app/user/shared/user.model';
import { Prompt } from './prompt.model';

export class Comment {
  _id?: string;
  createdAt?: string;
  comment?: string;
  // isReported?: any[];
  promptId?: Prompt;
  user?: User;
}
