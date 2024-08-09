import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../core/utils/utils";
import { User } from "../../interfaces/types";
import { USER_LOCAL_STORAGE_KEY } from "./AuthModels";

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
  return getLocalStorageWithExpiry(USER_LOCAL_STORAGE_KEY);
};

export { setUser, getUser, USER_LOCAL_STORAGE_KEY };
