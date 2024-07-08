import axios, { AxiosRequestConfig } from "axios";

import { refreshTokenAsync } from "./auth.service";
import { store } from "../store";
import { logoutUser } from "../store/auth/actions";
import { addNotification } from "../store/notification/actions";

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await refreshTokenAsync();

          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            api
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          refreshAndRetryQueue.length = 0;

          return api(originalRequest);
        } catch (error) {
          store.dispatch(
            addNotification({
              type: "error",
              message: "Seu acesso expirou, faça login novamente",
            })
          );
          store.dispatch(logoutUser());
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    return Promise.reject(error);
  }
);
