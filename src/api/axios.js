import axios from "axios";
import { memoizedRefreshToken } from "./refreshToken";
const BASE_URL = "http://localhost:3000";
export const AUTH_KEY = 'myapp_session';

export default axios.create({
  baseURL: BASE_URL,
});

const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivateInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(AUTH_KEY);

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;

      const newAccessToken = await memoizedRefreshToken();

      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${newAccessToken}`,
        };
      }

      return axiosPrivateInstance(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axiosPrivateInstance;