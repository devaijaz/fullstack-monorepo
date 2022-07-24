import { User, UserBean } from '@fs-monorepo/api-interfaces';

export interface Credential {
  username: string;
  password: string;
}
export interface AuthService {
  findUserByUsername(username: string): User;
  authenticate(credential: Credential): UserBean;
}
