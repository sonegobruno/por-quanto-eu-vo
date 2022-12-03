import { useAuth } from 'hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AUTH_REFRESH_TOKEN_KEY, AUTH_TOKEN_KEY } from 'constants/keys';
import { isObject } from 'shared/types/typeGuards';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import { validateRouteParams } from 'shared/utils/validateRouteParams';
import React, { useEffect } from 'react';

export const api = axios.create({
  baseURL: 'https://por-quanto-eu-vou.herokuapp.com',
});

const isInvalidToken = (error: AxiosError<unknown, any>) =>
  error.response?.status === 401 &&
  isObject(error.response.data) &&
  validateRouteParams(error.response.data, 'message', 'string') &&
  error.response.data.message === 'Token invalido';

interface Props {
  children: any;
}

export const AxiosInterceptor: React.FC<Props> = ({
  children,
}): JSX.Element => {
  const { signOut } = useAuth();

  function onRefreshTokenError(error: AxiosError) {
    signOut();
    return Promise.reject(error);
  }

  async function getRequestWithTokenUpdated(
    error: AxiosError,
    oldRefreshToken: string,
  ): Promise<AxiosRequestConfig<any>> {
    const {
      data: { token, refresh_token },
    } = await api.post(
      '/sessions/refresh-token',
      {},
      {
        headers: {
          'x-access-token': oldRefreshToken,
        },
      },
    );

    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refresh_token);
    api.defaults.headers.common.Authorization = token;

    // eslint-disable-next-line no-param-reassign
    error.config.headers = Object.assign(error.config.headers ?? {}, {
      Authorization: token,
    });

    console.log('Success');

    return error.config;
  }

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        if (!isInvalidToken(error)) return Promise.reject(error);

        const oldRefreshToken = await AsyncStorage.getItem(
          AUTH_REFRESH_TOKEN_KEY,
        );
        if (!oldRefreshToken) {
          return onRefreshTokenError(error);
        }

        try {
          const newRequestConfig = await getRequestWithTokenUpdated(
            error,
            oldRefreshToken,
          );

          return api.request(newRequestConfig);
        } catch (err) {
          apiResponseErrors(err);
          return onRefreshTokenError(error);
        }
      },
    );

    return () => api.interceptors.response.eject(responseInterceptor);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
