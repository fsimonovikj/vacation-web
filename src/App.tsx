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
import LandingPage from "./screens/landing-page/LandingPage";

function App() {
  const { user } = useAuth();

  return (
    <>
      <ToastNotification />
      <ThemeProvider theme={theme}>
        {user && user.role !== UserRole.Admin && <Navigate to="/main" />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/enter-password" element={<EnterPassword />} />
          <Route path="/" element={<ProtectRoutes />}>
            {user && user.role === UserRole.Admin ? (
              <>
                <Route path="/main" element={<MainScreen />} />
                <Route path="/management" element={<Management />} />
                <Route path="/users" element={<Users />} />
              </>
            ) : (
              <Route path="/main" element={<MainScreen />} />
            )}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
