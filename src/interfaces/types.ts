export interface UserViewModel {
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
  department?: string;
  status?: string;
  role?: string;
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
  department?: string;
  status?: string;
  role?: UserRole;
}

export interface EventI {
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  classNames: string;
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
}
