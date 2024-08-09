import axios from "axios";
import webConfig from "../config/config";
import { getLocalStorageWithExpiry } from "../core/utils/utils";
import { TOKEN_LOCAL_STORAGE_KEY } from "./core/AuthModels";

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
    const token = getLocalStorageWithExpiry(TOKEN_LOCAL_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      // Handle unauthorized access (e.g., redirect to login page)
      console.error("Unauthorized access - redirecting to login");
      localStorage.clear();

      // Optionally, you can clear the user session and redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
