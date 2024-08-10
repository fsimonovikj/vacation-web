import axios from "axios";
import webConfig from "../config/config";
import { getLocalStorageWithExpiry } from "../core/utils/utils";
import { AUTH_LOCAL_STORAGE_KEY } from "./core/AuthServices";

const axiosApi = axios.create({
  baseURL: webConfig.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Request interceptor to add token to headers
axiosApi.interceptors.request.use(
  (config) => {
    const auth = getLocalStorageWithExpiry(AUTH_LOCAL_STORAGE_KEY);

    if (auth && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized errors
axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - redirecting to login");
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
