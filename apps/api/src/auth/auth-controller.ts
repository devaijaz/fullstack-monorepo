import { Request, Response } from 'express';
import { getAuthService } from './auth-service-factory';
import { User, UserBean } from '@fs-monorepo/api-interfaces';
import { v4 as uuid } from 'uuid';
import { JwtService } from './jwt-service';
import {
  addAccessTokenHeader,
  addRefreshToken,
  getRefreshTokenCookie,
  removeRefreshToken,
} from './http-util';
const authService = getAuthService();
const refreshTokenMap: Record<string, string> = {};

const addTokens = (response: Response, userBean: UserBean) => {
  const token = JwtService.generateAccessToken({ username: userBean.username });
  addAccessTokenHeader(response, token);
  const refreshTokenId = uuid();
  const refreshToken = JwtService.generateRefreshToken({
    username: userBean.username,
    rToken: refreshTokenId,
  });
  addRefreshToken(response, refreshToken);
  refreshTokenMap[userBean.username] = refreshTokenId;
  return token;
};

export function login(request: Request, response: Response) {
  const { username, password } = request.body;
  const userBean: UserBean = authService.authenticate({ username, password });
  const token = addTokens(response, userBean);
  response.status(200).json({ token });
}

export function logout(_: Request, response: Response) {
  try {
    addAccessTokenHeader(response, '');
    removeRefreshToken(response);
    response.status(200).send();
  } catch (e) {
    console.log(e);
  }
}

export function refreshToken(request: Request, response: Response) {
  const token = getRefreshTokenCookie(request);
  if (token) {
    try {
      const { payload } = JwtService.verify(token);
      const { username, rToken } = payload as {
        username: string;
        rToken: string;
      };
      if (refreshTokenMap[username] && refreshTokenMap[username] === rToken) {
        const user: User = authService.findUserByUsername(username);
        const accessToken = addTokens(response, user);
        return response.send({ token: accessToken });
      }
    } catch (e) {
      removeRefreshToken(response);
    }
  }
  response.send();
}
