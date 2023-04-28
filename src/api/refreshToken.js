import mem from "mem";

import axios, { AUTH_KEY } from "./axios";

const refreshTokenFn = async () => {
  try {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true
  });

    if (!response?.data?.accessToken) {
      localStorage.removeItem(AUTH_KEY);
    }

    localStorage.setItem(AUTH_KEY, response.data.accessToken);

    return response?.data?.accessToken;
  } catch (error) {
    localStorage.removeItem(AUTH_KEY);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});