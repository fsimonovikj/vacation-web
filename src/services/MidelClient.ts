/* eslint-disable class-methods-use-this */
import axios from "axios";
import { UserViewModel } from "../interfaces/types";
import toast from "react-hot-toast";
import { setLocalStorageWithExpiry } from "../core/utils/utils";
import webConfig from "../config/config";
import {
  TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "../auth/core/AuthModels";

class MidelClient {
  async authenticate(
    email: string,
    password: string
  ): Promise<UserViewModel | string | null> {
    const userSessionRequest = {
      email,
      password,
    };

    const response = await axios
      .post(`${webConfig.apiBaseUrl}/login`, userSessionRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLocalStorageWithExpiry(
            TOKEN_LOCAL_STORAGE_KEY,
            response.data.token
          );
          const user: UserViewModel = {
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            role: response.data.user.role,
            email: email,
          };
          setLocalStorageWithExpiry(USER_LOCAL_STORAGE_KEY, user);

          return user;
        }
      })
      .catch((error) => {
        if (error.response.data !== "Unauthorized") {
          toast.error(error.response.data);
        }
      });

    if (response) {
      return response;
    }

    return null;
  }

  //TODO: Modified function for the reset user password
  //   async resetPassword(email: string): Promise<void> {
  //     await this.request(`${this.BASE_URL}/reset-password`, 'POST', {}, { email });
  //   }

  // TODO: modified function for the logout user and remove all data from the storage
  logout(): void {
    localStorage.clear();
    window.location.href = "/";
  }
}
export default MidelClient;
