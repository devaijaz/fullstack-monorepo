/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect, useState } from 'react';
import { client } from '../axios-client';
const initialValue = {
  accessToken: '',
  appReady: false,
  setAccessToken: (token: string) => {},
  login: (username: string, password: string) => {},
  logout: () => {},
  refresh: () => {},
};

export type AuthContextType = typeof initialValue;

export const AuthContext = React.createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState('');
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      await refresh(controller);
      setAppReady(true);
    })();
    return () => controller.abort();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await client.post(
      '/auth/login',
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    setAccessToken(response.data.token);
  };
  const logout = () => {
    setAccessToken('');
    client.post('/auth/logout', {}, { withCredentials: true });
  };
  const refresh = async (controller?: AbortController) => {
    try {
      const response = await client.post(
        '/auth/refresh',
        {},
        {
          withCredentials: true,
          signal: controller?.signal,
        }
      );
      setAccessToken(response.data.token);
    } catch (e) {
      //nothing to do.
    }
  };
  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, setAccessToken, refresh, appReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
