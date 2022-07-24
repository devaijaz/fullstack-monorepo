import { NextFunction, Request, Response } from 'express';
import { AppError } from '../app/exceptions/AppError';
import { NotAuthrizedException } from '../app/exceptions/NotAuthorizedException';
import { JwtService } from '../auth/jwt-service';

export function todosMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let error: AppError = null;
  try {
    JwtService.verifyAccessTokenInRequest(request);
  } catch (e) {
    error = new NotAuthrizedException();
  }
  next(error);
}
