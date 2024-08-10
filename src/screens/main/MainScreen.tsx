import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import VacationBooking from "../../components/vacation-booking/VacationBooking";

const MainScreen = () => {
  return (
    <>
      <Box
        position="absolute"
        left={"20%"}
        top={0}
        style={{ width: "80%", height: "100%", backgroundColor: "#f5f5f5" }}
      >
        <VacationBooking />
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
        <Header />
      </Box>
    </>
  );
};

export default MainScreen;
