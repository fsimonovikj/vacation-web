import { Box } from "@mui/material";
import "./styles/index.scss";
import { Header } from "../../components/header/Header";
import ProfileSettings from "../../components/settings/ProfileSettings";

const SettingsScreen = () => {
  return (
    <>
      <Box className="settings-header">
        <Header />
      </Box>
      <Box className="settings-content">
        <ProfileSettings />
      </Box>
    </>
  );
};

export default SettingsScreen;
