import { AppError } from './AppError';

export class InvalidCredentialException extends AppError {
  constructor(message = 'Invalid username or password', statusCode = 400) {
    super(message, statusCode);
  }
}
