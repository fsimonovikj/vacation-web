import React from "react";
import { Box } from "@mui/material";
import { Button } from "antd";
import { UserViewModel, VacationI } from "../../interfaces/types";
import CodefixClient from "../../services/CodefixClient";
import "../../styles/header.scss"; // Adjust the path if necessary

interface UserInfoProps {
  vacationDays: number;
  vacations: VacationI[];
  user: UserViewModel;
}

const UserInfo: React.FC<UserInfoProps> = ({
  vacationDays,
  vacations,
  user,
}) => {
  const client = new CodefixClient();

  return (
    <Box className="user-info">
      <Box className="header-vacation-info">
        <h3 className="header-vacation-title">
          remaining days : {vacationDays}
        </h3>
        <Box className="header-vacation-list">
          {vacations.map((vacation: any) => (
            <div key={vacation.id}>
              <p>
                {vacation.title}: {vacation.days} days
              </p>
            </div>
          ))}
        </Box>
      </Box>

      <Button
        type="default"
        htmlType="submit"
        className="logout-button"
        onClick={client.logout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserInfo;
