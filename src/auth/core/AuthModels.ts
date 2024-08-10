import { UserViewModel } from "../../interfaces/types";

export enum UserStatus {
  Deactivated = "deactivated",
  Pending = "pending",
  Active = "active",
  Inactive = "inactive",
}

export interface AuthModel {
  user: UserViewModel;
  token: string;
}
