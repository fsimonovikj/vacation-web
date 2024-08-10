import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/core/Auth";

const ProtectRoutes = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoutes;
