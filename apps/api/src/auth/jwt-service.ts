import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_HEADER_NAME } from './http-util';
export const JwtService = {
  generateToken(payload: Record<string, string>, expiry: string): string {
    return jwt.sign(payload, environment.SECRET, {
      algorithm: 'HS256',
      expiresIn: expiry,
    });
  },
  generateAccessToken(payload: Record<string, string>): string {
    return this.generateToken(payload, '5s');
  },
  generateRefreshToken(payload: Record<string, string>): string {
    return this.generateToken(payload, '7 days');
  },
  verify(token: string) {
    console.log('Verifying ', token);
    return jwt.verify(token, environment.SECRET, { complete: true });
  },
  verifyAccessTokenInRequest(request: Request) {
    return this.verify(request.headers?.[ACCESS_TOKEN_HEADER_NAME]);
  },
};
