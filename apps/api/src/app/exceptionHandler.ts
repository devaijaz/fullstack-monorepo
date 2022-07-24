import { NextFunction, Request, Response } from 'express';
import { AppError } from './exceptions/AppError';

export const exceptionHandler = function (
  error: AppError,
  _: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.log(error.statusCode);
  response.status(error.statusCode).send({ message: error.message });
};
