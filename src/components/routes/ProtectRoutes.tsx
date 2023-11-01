import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorageWithExpiry } from "../../core/utils/utils";
import { isBefore } from "date-fns";

export const useAuth = () => {
  const token = getLocalStorageWithExpiry("token");

  if (token) {
    const decode = JSON.parse(atob(token.split(".")[1]));
    return !isBefore(
      new Date(decode.exp * 1000).getTime(),
      new Date().getTime()
    );
  }
};

const ProtectRoutes = (props: any) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoutes;
