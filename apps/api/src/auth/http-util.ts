import { Request, Response } from 'express';

export const ACCESS_TOKEN_HEADER_NAME = 'x-access-token';
export const REFRESH_TOKEN_COOKIE_NAME = 'r-access-token';
function addHeader(response: Response, key: string, value: string) {
  response.setHeader(key, value);
}

function addCookie(
  response: Response,
  key: string,
  value: string,
  age: number
) {
  response.cookie(key, value, {
    httpOnly: true,
    maxAge: age,
  });
}

export function addAccessTokenHeader(response: Response, value: string) {
  addHeader(response, ACCESS_TOKEN_HEADER_NAME, value);
}

export function addRefreshToken(response: Response, value: string) {
  addCookie(response, REFRESH_TOKEN_COOKIE_NAME, value, 3600 * 24 * 7);
}
export function removeRefreshToken(response: Response) {
  addCookie(response, REFRESH_TOKEN_COOKIE_NAME, '', 0);
}

export function getRefreshTokenCookie(request: Request) {
  return request.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
}
