/* eslint-disable class-methods-use-this */
import axios from "axios";
import { UserViewModel } from "../interfaces/types";
import toast from "react-hot-toast";
import { setLocalStorageWithExpiry } from "../core/utils/utils";
import webConfig from "../config/config";

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
          setLocalStorageWithExpiry("token", response.data.token);
          console.log(`response.data: `, response.data);
          const user: UserViewModel = {
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            role: response.data.user.role,
            email: email,
          };
          console.log(`user is logged in: `, user);
          localStorage.setItem("user", JSON.stringify(user));
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
export default MidelClient;
