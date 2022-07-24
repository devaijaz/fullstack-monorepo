/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useEffect } from 'react';
import { client } from '../axios-client';
import axios, { AxiosInstance } from 'axios';
import { useAuthContext } from './auth-context';

export const ClientContext = React.createContext<AxiosInstance>(axios.create());

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuthContext();

  useEffect(() => {
    const interceptorRequestId = client.interceptors.request.use(
      (config = {}) => {
        config.headers = config.headers || {};
        config.headers['x-access-token'] = accessToken;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const interceptorResponseId = client.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await client.post(
              '/auth/refresh',
              {},
              {
                withCredentials: true,
              }
            );
            const { data } = rs.data as {
              data: {
                refresh: string;
              };
            };
            if (data) {
              setAccessToken(data.refresh);
            }
            return null;
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      client.interceptors.request.eject(interceptorRequestId);
      client.interceptors.response.eject(interceptorResponseId);
    };
  }, [accessToken, setAccessToken]);
  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
