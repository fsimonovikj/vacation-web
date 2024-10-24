export enum AppPathEnum {
  CALENDAR = "/calendar",
  MANAGEMENT = "/management",
  LEAVE_REQUESTS = "/leave-requests",
  EMPLOYEES = "/employees",
  REPORTS_AND_ANALITICS = "/reports",
  SETTINGS = "/settings",
}

export type AppPathEnumType = keyof typeof AppPathEnum;
