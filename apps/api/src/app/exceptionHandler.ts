import { NextFunction, Request, Response } from 'express';
import { AppError } from './exceptions/AppError';

export const exceptionHandler = function (
  error: AppError,
  _: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  response
    .status(error.statusCode ?? 500)
    .send({ message: error.message ?? 'Server Error! Try again later' });
};
