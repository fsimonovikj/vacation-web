import axios from "axios";
import webConfig from "../config/config";
import { getLocalStorageWithExpiry } from "../core/utils/utils";
import {
  TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "./core/AuthModels";

const axiosApi = axios.create({
  baseURL: webConfig.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosApi.interceptors.request.use(
  (config) => {
    const user = getLocalStorageWithExpiry(USER_LOCAL_STORAGE_KEY);
    const token = getLocalStorageWithExpiry(TOKEN_LOCAL_STORAGE_KEY);
    if (user && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   console.error("Unauthorized access - redirecting to login");
    //   localStorage.clear();
    //   // window.location.href = "/";
    // }
    return Promise.reject(error);
  }
);

export default axiosApi;
