import { VacationStatusEnum } from "../components/vacation-booking/VacationStatusEnum";

export interface UserViewModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userId?: string;
  password?: string;
  companyId?: string;
  modules?: any[];
  statistics?: any[];
  token?: string;
  company?: any;
  department?: UserDepartment;
  status?: UserStatus;
  role?: UserRole;
}

export interface InstalledProducts {
  [productId: string]: string;
}

export interface Product {
  versionNumber: string;
  globalVersionId: string;
  productVersionId: string;
  productId: string;
  name: string;
  description: string;
  buildNumber: string;
  metadataUrl: string;
  image: string;
  state: ProductState;
  progress?: number;
  downloadedBytes?: number;
  downloadSize?: number;
  downloadItem: any;
  extractedFiles?: number;
  fileCount?: number;
}

export enum ProductState {
  IsDownloadable,
  IsUpdateable,
  DownloadingProduct,
  DownloadingContent,
  DownloadedProduct,
  Unzipping,
  Unzipped,
  Installing,
  Installed,
  Running,
}

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export enum UserStatus {
  Deactivated = "deactivated",
  Pending = "pending",
  Active = "active",
  Inactive = "inactive",
}

export enum UserDepartment {
  Director = "director",
  CEO = "ceo",
  HEAD = "head",
  Dev = "dev",
  HR = "hr",
  Finance = "finance",
  Marketing = "marketing",
  Sales = "sales",
  Other = "other",
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userId?: string;
  companyId?: string;
  modules?: any[];
  statistics?: any[];
  token?: string;
  company?: any;
  department?: UserDepartment;
  status?: UserStatus;
  role?: UserRole;
}

export interface EventI {
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  classNames: string;
  status?: any;
}

export interface VacationI {
  id: string;
  createdAt: Date;
  deletedAt: Date | null;
  title: string;
  days: any;
  startAt: Date;
  endAt: Date;
  userId: string;
}

export interface VacationPlanI {
  id: string;
  createdAt: Date;
  deletedAt: Date | null;
  title: string;
  start: Date;
  end: Date;
  days: number;
  details?: UserPlanDetailsI[];
}

export interface UserPlanDetailsI {
  id: string;
  firstName: string;
  lastName: string;
  remainingDays: number;
  vacationId: number | null;
}

export interface BookingRequestI {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  bookedDays: number;
  user: string;
  firstName: string;
  lastName: string;
  status: VacationStatusEnum;
  vacationId: string;
}

export interface VacationPlanRequestI {
  id: string;
  title: string;
  start: Date;
  end: Date;
  days: number;
}

export interface HolidayRequestI {
  title: string;
  description: string;
  start: Date;
  end: Date;
}
