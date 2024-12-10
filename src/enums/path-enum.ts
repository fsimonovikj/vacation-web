export enum AppPathEnum {
  CALENDAR = "/calendar",
  MANAGEMENT = "/management",
  LEAVE_REQUESTS = "/leave-requests",
  EMPLOYEES = "/employees",
  REPORTS_AND_ANALITICS = "/reports",
  SETTINGS = "/settings",
}

export const USER_VISIBILITY_PATHS = [
  AppPathEnum.CALENDAR,
  AppPathEnum.SETTINGS,
];

export type AppPathEnumType = keyof typeof AppPathEnum;
