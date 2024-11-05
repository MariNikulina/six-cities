import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {AxiosResponse} from 'axios';
import {processErrorHandle} from './process-error-handle';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://10.react.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers !== undefined) {
        config.headers['X-Token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        const errorData = error.response.data as { error: string };
        processErrorHandle(errorData.error);
      }

      throw error;
    }
  );

  return api;
};
