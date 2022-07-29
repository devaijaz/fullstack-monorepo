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
  console.log();
  response.cookie(key, value, {
    httpOnly: true,
    expires: new Date(new Date().getTime() + 3600 * 24 * age * 1000),
  });
}

export function addAccessTokenHeader(response: Response, value: string) {
  addHeader(response, ACCESS_TOKEN_HEADER_NAME, value);
}

export function addRefreshToken(response: Response, value: string) {
  addCookie(response, REFRESH_TOKEN_COOKIE_NAME, value, 7);
}
export function removeRefreshToken(response: Response) {
  addCookie(response, REFRESH_TOKEN_COOKIE_NAME, '', 0);
}

export function getRefreshTokenCookie(request: Request) {
  return request.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
}
