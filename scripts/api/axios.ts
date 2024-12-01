import { API, API_PATH } from "@/constants/Path";
import { RefreshRes } from "@/types/UserDto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { router } from "expo-router";

const setTokenInstance = () => {
  const baseInstance = axios.create({
    baseURL: API,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
  });

  let isRefreshing = false;
  let refreshTokenPromise: Promise<string> | null = null;

  const refreshAccessToken = async (): Promise<string> => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const refreshTokenExpires = await AsyncStorage.getItem(
        "refreshTokenExpires"
      );
      const lastLogin = await AsyncStorage.getItem("lastLogin");

      if (
        !refreshToken ||
        !refreshTokenExpires ||
        !lastLogin ||
        Number(lastLogin) + Number(refreshTokenExpires) < Date.now()
      ) {
        await AsyncStorage.multiRemove([
          "accessToken",
          "refreshToken",
          "tokenExpires",
          "lastLogin",
        ]);

        router.push("/login");
      }

      const refreshResponse = await axios.post<RefreshRes>(
        `${API}${API_PATH.GET_REFRESH}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        tokenExpires: newTokenExpires,
      } = refreshResponse.data;

      await AsyncStorage.multiSet([
        ["accessToken", newAccessToken],
        ["refreshToken", newRefreshToken],
        ["tokenExpires", newTokenExpires.toString()],
        ["lastLogin", Date.now().toString()],
      ]);

      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed", error);
      throw Error;
    }
  };

  baseInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig<any>) => {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  baseInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenPromise = refreshAccessToken();
        }

        try {
          const newAccessToken = await refreshTokenPromise;

          if (originalRequest.headers) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          }

          return baseInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return baseInstance;
};

export default setTokenInstance();
