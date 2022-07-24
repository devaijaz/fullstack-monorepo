import { useCallback, useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import axios, { AxiosRequestConfig } from 'axios';
import { Todo } from '@fs-monorepo/api-interfaces';

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState({
  jwtToken: '',
});
const getJWTToken = () => getGlobalState('jwtToken');
const setJWTToken = (value: string) => setGlobalState('jwtToken', value);
const useJWTToken = () => useGlobalState('jwtToken');

const client = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});
const refresh = function () {
  return client
    .post('/auth/refresh', {}, { withCredentials: true })
    .then((response) => response.data)
    .then(({ token }) => {
      setJWTToken(token);
      return token;
    })
    .catch((e) => {
      console.error('Erorr refreshing');
    });
};
refresh();
client.interceptors.request.use(
  (config: AxiosRequestConfig = {}) => {
    config.headers = config.headers || {};
    config.headers['x-access-token'] = getJWTToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        /*
        const rs = await client.post(
          '/auth/refresh',
          {},
          {
            withCredentials: true,
          }
        );
        const { token } = rs.data as {
          token: string;
        };
        */
        const token = await refresh();
        setJWTToken(token);
        return client(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export function useClient() {
  const [JWT, setJWT] = useJWTToken();

  const login = useCallback((username: string, password: string) => {
    client
      .post(
        '/auth/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        const jwtToken = (
          data as {
            token: string;
          }
        ).token;
        setJWT(jwtToken);
      });
  }, []);

  const logout = useCallback(() => {
    setJWT('');
    client.post('/auth/logout', {}, { withCredentials: true }).catch((e) => {
      console.error(e);
    });
  }, []);

  const getTodos = useCallback(
    () =>
      client
        .get('/todos', {
          withCredentials: true,
        })
        .then((response) => response.data as Todo[]),

    []
  );

  return {
    JWT,
    getTodos,
    login,
    logout,
  };
}

export default client;
