import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import theme from "./components/theme";
import SignInScreen from "./screens/sign-in/SignInScreen";
import EnterPassword from "./screens/enter-password/EnterPassword";
import { ToastNotification } from "./components/modals/ToastNotification";
import ProtectRoutes from "./components/routes/ProtectRoutes";
import MainScreen from "./screens/main/MainScreen";
import Management from "./screens/management/Management";
import { UserRole } from "./interfaces/types";
import Users from "./screens/users/Users";
import { useAuth } from "./auth/core/Auth";
import LeaveRequests from "./screens/leave-requests/LeaveRequests";
import Reports from "./screens/reports/Reports";

function App() {
  const { user } = useAuth();

  return (
    <>
      <ToastNotification />
      <ThemeProvider theme={theme}>
        {user && user.role !== UserRole.Admin && <Navigate to="/calendar" />}
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/enter-password" element={<EnterPassword />} />
          <Route path="/" element={<ProtectRoutes />}>
            {user && user.role === UserRole.Admin ? (
              <>
                <Route path="/calendar" element={<MainScreen />} />
                <Route path="/management" element={<Management />} />
                <Route path="/leave-requests" element={<LeaveRequests />} />
                <Route path="/employees" element={<Users />} />
                <Route path="/reports" element={<Reports />} />
              </>
            ) : (
              <Route path="/calendar" element={<MainScreen />} />
            )}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
