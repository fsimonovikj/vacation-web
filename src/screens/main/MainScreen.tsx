import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import VacationBooking from "../../components/vacation-booking/VacationBooking";
import "./styles/index.scss";

const MainScreen = () => {
  return (
    <>
      <Box className="main-screen-header">
        <Header />
      </Box>
      <Box className="main-screen-vacation">
        <VacationBooking />
      </Box>
    </>
  );
};

export default MainScreen;
