import { AppError } from './AppError';

export class NotFoundException extends AppError {
  constructor(message: string, statusCode = 500) {
    super(message, statusCode);
  }
}
