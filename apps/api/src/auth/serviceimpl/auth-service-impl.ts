import { User, UserBean } from '@fs-monorepo/api-interfaces';
import { InvalidCredentialException } from '../../app/exceptions/InvalidCredentialException';
import { AuthService, Credential } from '../auth-service';

const users: Record<string, User> = {
  dev: {
    username: 'dev',
    password: '1234',
    email: 'dev@gmail.com',
    fullname: 'Dev Support',
    role: 'USER',
  },
  admin: {
    username: 'admin',
    password: '1234',
    email: 'admin@gmail.com',
    fullname: 'admin',
    role: 'ADMIN',
  },
};

export class UserAuthService implements AuthService {
  userToUserBean(user: User) {
    const { username, email, fullname, role } = user;
    return {
      username,
      email,
      fullname,
      role,
    };
  }
  findUserByUsername(username: string): User {
    return users[username];
  }
  authenticate(credential: Credential): UserBean | null {
    const user = users[credential.username];
    if (user) {
      const { password } = user;
      if (password === credential.password) {
        return this.userToUserBean(user);
      }
    }
    throw new InvalidCredentialException();
  }
}
