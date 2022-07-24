import { AuthService } from './auth-service';
import { UserAuthService } from './serviceimpl/auth-service-impl';

const authService = new UserAuthService();

export function getAuthService(): AuthService {
  return authService;
}
