import {User} from './user.model';

export interface ShareRequest {
  id?: string;
  whoAsked: User;
  from: string;
  whatID: string;
  whatName: string;
  whatDescription: string;
}
