import { AppError } from './AppError';

export class NotAuthrizedException extends AppError {
  constructor(message = '', statusCode = 401) {
    super(message, statusCode);
  }
}
