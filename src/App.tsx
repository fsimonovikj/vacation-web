import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import theme from "./components/theme";
import SignInScreen from "./screens/sign-in/SignInScreen";
import EnterPassword from "./screens/enter-password/EnterPassword";
import { ToastNotification } from "./components/modals/ToastNotification";
import ProtectRoutes from "./components/routes/ProtectRoutes";
import MainScreen, { axiosApi } from "./screens/main/MainScreen";
import Management from "./screens/management/Management";
import { UserRole, UserViewModel, VacationI } from "./interfaces/types";
import { getLocalStorageWithExpiry } from "./core/utils/utils";
import Users from "./screens/users/Users";
import { useEffect, useState } from "react";
import webConfig from "./config/config";

function App() {
  const user: UserViewModel = getLocalStorageWithExpiry("user");
  const [vacationDays, setVacationDays] = useState<number>(0);
  const [vacations, setVacations] = useState<VacationI[]>([]);

  const getVacationDays = async () => {
    if (!user || !user.id) {
      return;
    }

    try {
      const response = await axiosApi.get(
        `${webConfig.apiBaseUrl}/vacation/${user.id}`
      );

      const days = response.data.reduce(
        (totalDays: any, element: any) => totalDays + parseInt(element.days),
        0
      );

      setVacationDays(days);
      setVacations(response.data);
      localStorage.setItem("x-number", days);
    } catch (error) {
      console.error("Error fetching vacation days:", error);
    }
  };

  useEffect(() => {
    getVacationDays();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastNotification />
      <ThemeProvider theme={theme}>
        {user && user.role !== UserRole.Admin && <Navigate to="/main" />}
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/enter-password" element={<EnterPassword />} />
          <Route path="/" element={<ProtectRoutes />}>
            {user && user.role === UserRole.Admin ? (
              <>
                <Route
                  path="/main"
                  element={
                    <MainScreen
                      vacationDays={vacationDays}
                      vacations={vacations}
                    />
                  }
                />
                <Route
                  path="/management"
                  element={
                    <Management
                      vacationDays={vacationDays}
                      vacations={vacations}
                    />
                  }
                />
                <Route
                  path="/users"
                  element={
                    <Users vacationDays={vacationDays} vacations={vacations} />
                  }
                />
              </>
            ) : (
              <Route
                path="/main"
                element={
                  <MainScreen
                    vacationDays={vacationDays}
                    vacations={vacations}
                  />
                }
              />
            )}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
