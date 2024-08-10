/* eslint-disable class-methods-use-this */
import axios from "axios";
import {
  BookingRequestI,
  UserViewModel,
  VacationPlanRequestI,
} from "../interfaces/types";
import toast from "react-hot-toast";
import webConfig from "../config/config";
import { AuthModel } from "../auth/core/AuthModels";
import axiosApi from "../auth/AxiosApi";

class MidelClient {
  async authenticate(email: string, password: string): Promise<AuthModel> {
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
          return response.data;
        }
      })
      .catch((error) => {
        if (error.response.data !== "Unauthorized") {
          toast.error(error.response.data);
        }
      });

    return response;
  }

  async receiveVacationDays(userId: string): Promise<number> {
    const response = await axiosApi
      .get(`${webConfig.apiBaseUrl}/vacation/${userId}`)
      .then((response) => {
        const days = response.data.reduce(
          (totalDays: any, element: any) => totalDays + parseInt(element.days),
          0
        );

        return days;
      })
      .catch((error) => {
        console.error("Error fetching vacation days:", error);
        return 0;
      });

    return response;
  }

  async receiveVacations(userId: string): Promise<any> {
    const response = await axiosApi
      .get(`${webConfig.apiBaseUrl}/vacation/${userId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching vacations:", error);
        return [];
      });

    return response;
  }

  async receiveHolidays(): Promise<any> {
    const response = await axiosApi
      .get(`${webConfig.apiBaseUrl}/holidays`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching holidays:", error);
        return [];
      });

    return response;
  }

  async receiveBookedVacations(): Promise<any> {
    const response = await axiosApi
      .get(`${webConfig.apiBaseUrl}/booking-days`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching booked vacations:", error);
        return [];
      });

    return response;
  }

  async requestBookingDays(event: BookingRequestI): Promise<any> {
    try {
      const request = await axiosApi.post(
        `${webConfig.apiBaseUrl}/booking-days`,
        event
      );

      return request;
    } catch (error) {
      throw new Error("Error booking vacation");
    }
  }

  async requestBookingRequest(event: BookingRequestI): Promise<any> {
    try {
      const request = await axiosApi.post(
        `${webConfig.apiBaseUrl}/booking-requests`,
        event
      );

      return request;
    } catch (error) {
      throw new Error("Error booking vacation");
    }
  }

  async receiveVacationPlan(): Promise<any> {
    try {
      const response = await axiosApi.get(
        `${webConfig.apiBaseUrl}/vacation-plan/lists`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error fetching vacation plan");
    }
  }

  async requestVacationPlan(event: VacationPlanRequestI): Promise<any> {
    try {
      const request = await axiosApi.post(
        `${webConfig.apiBaseUrl}/vacation-plan`,
        event
      );

      return request;
    } catch (error) {
      throw new Error("Error booking vacation");
    }
  }

  async receiveUsers(companyId: string): Promise<any> {
    try {
      const response = await axiosApi.get(
        `${webConfig.apiBaseUrl}/users/${companyId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }

  async requestUser(event: UserViewModel): Promise<any> {
    try {
      const request = await axiosApi.post(
        `${webConfig.apiBaseUrl}/users`,
        event
      );

      return request;
    } catch (error) {
      throw new Error("Error creating user");
    }
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
