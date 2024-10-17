/* eslint-disable class-methods-use-this */
import axios from "axios";
import {
  BookingRequestI,
  HolidayRequestI,
  UserPlanDetailsI,
  UserViewModel,
  VacationPlanRequestI,
} from "../interfaces/types";
import toast from "react-hot-toast";
import webConfig from "../config/config";
import { AuthModel } from "../auth/core/AuthModels";
import axiosApi from "../auth/AxiosApi";

class CodefixClient {
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

  async receiveLeaveRequests(): Promise<any> {
    const response = await axiosApi
      .get(`${webConfig.apiBaseUrl}/booking-days/leave-requests`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
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

  async requestHoliday(event: HolidayRequestI): Promise<any> {
    try {
      const request = await axiosApi.post(
        `${webConfig.apiBaseUrl}/holidays`,
        event
      );

      return request;
    } catch (error) {
      throw new Error("Error booking vacation");
    }
  }

  async receiveVacationPlan(companyId: string): Promise<any> {
    try {
      const response = await axiosApi.get(
        `${webConfig.apiBaseUrl}/vacation-plan/details/${companyId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error fetching vacation plan");
    }
  }

  async receiveAvailableUsersForVacation(
    vacationId: string,
    companyId: string
  ): Promise<any> {
    const response = await axiosApi
      .get(
        `${webConfig.apiBaseUrl}/vacation-plan/available-users/${vacationId}/${companyId}`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });

    return response;
  }

  async requestVacationPlan(
    event: VacationPlanRequestI,
    companyId: string
  ): Promise<any> {
    try {
      const request = await axiosApi.post(
        `${webConfig.apiBaseUrl}/vacation-plan/${companyId}`,
        event
      );

      return request;
    } catch (error) {
      throw new Error("Error booking vacation");
    }
  }

  async requestAddUsersToVacation(
    vacationId: string,
    userIds: string[],
    companyId: string
  ): Promise<any> {
    try {
      const request = await axiosApi.post(
        `${webConfig.apiBaseUrl}/vacation-plan/add-users/${vacationId}/${companyId}`,
        userIds
      );

      return request;
    } catch (error) {
      throw new Error("Error adding users to vacation");
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

  async updateUser(event: UserViewModel): Promise<any> {
    try {
      const request = await axiosApi.put(
        `${webConfig.apiBaseUrl}/users`,
        event
      );

      return request;
    } catch (error) {
      throw new Error("Error updating user");
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

  async updateVacationDays(req: UserPlanDetailsI): Promise<any> {
    try {
      const request = await axiosApi.put(
        `${webConfig.apiBaseUrl}/vacation/update`,
        req
      );

      return request;
    } catch (error) {
      throw new Error("Error updating vacation plan");
    }
  }
  async deactivateUser(req: UserViewModel): Promise<any> {
    try {
      const request = await axiosApi.put(
        `${webConfig.apiBaseUrl}/users/deactivate`,
        req
      );

      return request;
    } catch (error) {
      throw new Error("Error deactivating user");
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

export default CodefixClient;
