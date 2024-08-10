import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../core/utils/utils";
import { User, UserViewModel } from "../../interfaces/types";
import { AuthModel } from "./AuthModels";

const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v";
const USER_LOCAL_STORAGE_KEY = "kt-user-react-v";
const APP_LOCAL_STORAGE_KEY = "kt-app-react-v";
const SIGN_IN_EMAIL_LOCAL_STORAGE_KEY = "kt-sign-in-email-react-v";
const TOKEN_LOCAL_STORAGE_KEY = "kt-token-react-v";
const DAYS_OFF_LOCAL_STORAGE_KEY = "kt-days-off-react-v";

const setUser = (user: User) => {
  if (!localStorage) {
    return;
  }

  try {
    setLocalStorageWithExpiry(USER_LOCAL_STORAGE_KEY, user);
  } catch (error) {
    console.error("Error setting user in local storage:", error);
  }
};

const getUser = () => {
  if (!localStorage) {
    return;
  }

  try {
    const user: UserViewModel = getLocalStorageWithExpiry(
      USER_LOCAL_STORAGE_KEY
    ) as UserViewModel;

    if (user) {
      return user;
    }
  } catch (error) {
    console.error("Error getting user from local storage:");
  }
};

const removeUser = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing user from local storage:", error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    setLocalStorageWithExpiry(AUTH_LOCAL_STORAGE_KEY, auth);
  } catch (error) {
    console.error("Error setting auth in local storage:", error);
  }
};

const getAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    const auth: AuthModel = getLocalStorageWithExpiry(
      AUTH_LOCAL_STORAGE_KEY
    ) as AuthModel;

    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error("Error getting auth from local storage:");
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Error removing auth from local storage:", error);
  }
};

export {
  setUser,
  getUser,
  removeUser,
  setAuth,
  getAuth,
  removeAuth,
  AUTH_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
  APP_LOCAL_STORAGE_KEY,
  SIGN_IN_EMAIL_LOCAL_STORAGE_KEY,
  TOKEN_LOCAL_STORAGE_KEY,
  DAYS_OFF_LOCAL_STORAGE_KEY,
};
