import { AppError } from './AppError';

export class ServerApplicationError extends AppError {
  constructor(message: string, statusCode = 500) {
    super(message, statusCode);
  }
}
