import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "./config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const access_token = await AsyncStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "auth/login"
    ) {
      originalRequest._retry = true;

      const x_refresh_token = await AsyncStorage.getItem("refresh_token");
      const response = await axios.post(`${API_BASE_URL}auth/refresh`, null, {
        headers: { "x-refresh-token": x_refresh_token },
      });
      const { access_token, refresh_token } = response.data.data;

      await AsyncStorage.multiSet([
        ["access_token", access_token],
        ["refresh_token", refresh_token],
      ]);

      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
