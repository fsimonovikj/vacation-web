import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../core/utils/utils";
import { useEffect, useState } from "react";
import VacationBooking from "../../components/vacation-booking/VacationBooking";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { UserViewModel } from "../../interfaces/types";
import webConfig from "../../config/config";

export const axiosApi = axios.create({
  baseURL: webConfig.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const MainScreen = () => {
  const [tokenData, setTokenData] = useState<any>(null);
  const [user, setUser] = useState<UserViewModel>();

  const token = getLocalStorageWithExpiry("token");

  useEffect(() => {
    const decodeToken = async () => {
      const decodedToken: any = await jwt_decode(token);
      setTokenData(decodedToken);
    };
    decodeToken();
  }, [token]);

  useEffect(() => {
    const getUser = async () => {
      if (tokenData && tokenData.id) {
        await axiosApi
          .get(`${process.env.REACT_APP_BACKEND_URL}/users/${tokenData.id}`)
          .then((res) => {
            const user: UserViewModel = {
              id: tokenData.id,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              email: res.data.email,
              department: res.data.department,
              status: res.data.status,
              company: res.data.company,
              role: res.data.role,
            };
            setUser(user);
            setLocalStorageWithExpiry("user", user);
          });
      }
    };

    getUser();
  }, [tokenData]);

  console.log(`USER`, user);

  return (
    <>
      <Box
        position="absolute"
        left={"20%"}
        top={0}
        style={{ width: "80%", height: "100%", backgroundColor: "#f5f5f5" }}
      >
        <VacationBooking user={user} />
      </Box>
      <Box
        position="fixed"
        left={0}
        top={0}
        style={{
          width: "20%",
          height: "100%",
          backgroundColor: "#1c1c1c",
          color: "white",
        }}
      >
        <Header user={user} />
      </Box>
    </>
  );
};

export default MainScreen;
