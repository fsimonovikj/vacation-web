import { Box } from "@mui/material";
import { Button } from "antd";

import { AppPathEnum } from "../../enums/path-enum";
import { UserRole, VacationI } from "../../interfaces/types";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/core/Auth";
import { capitalizeFirstLetter } from "../../core/utils/utils";
import CodefixClient from "../../services/CodefixClient";

export const Header = () => {
  const [vacationDays, setVacationDays] = useState<number>(0);
  const [vacations, setVacations] = useState<VacationI[]>([]);
  const activeMenu = window.location.pathname;
  const client = new CodefixClient();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const days = await client.receiveVacationDays(user!.id as string);
        const vacations = await client.receiveVacations(user!.id as string);

        setVacations(vacations);
        setVacationDays(days);
      } catch (error) {
        console.error("Error fetching vacation days:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Box
        position="absolute"
        left={0}
        top={0}
        style={{
          width: "90%",
          height: "90%",
          padding: "5%",
          fontSize: "12px",
        }}
      >
        <Box style={{ lineHeight: "0.2rem", textAlign: "center" }}>
          <h2>{process.env.REACT_APP_COMPANY_NAME}</h2>
          <p>Software Development Services</p>
        </Box>

        <Box style={{ marginTop: "5rem" }}>
          <ul>
            {(() => {
              if (user && user.role === UserRole.Admin) {
                return Object.values(AppPathEnum).map((path) => (
                  <li
                    key={path}
                    style={{
                      padding: "10px 15px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "end",
                      color: "#000000",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "22px",
                      marginRight: "-6%",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      backgroundColor:
                        activeMenu === path ? "#FFFFFF" : "transparent",
                    }}
                  >
                    <a
                      className="header-link"
                      style={{
                        textDecoration: "none",
                        color: activeMenu === path ? "#000000" : "#FFFFFF",
                      }}
                      href={path}
                    >
                      {capitalizeFirstLetter(path.split("/")[1])}
                    </a>
                  </li>
                ));
              } else if (user && user.role === UserRole.User) {
                return Object.values(AppPathEnum).map((path) => {
                  if (path === AppPathEnum.MAIN) {
                    return (
                      <li
                        key={path}
                        style={{
                          padding: "10px 15px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "end",
                          color: "#000000",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "22px",
                          marginRight: "-6%",
                          borderTopLeftRadius: "20px",
                          borderBottomLeftRadius: "20px",
                          backgroundColor:
                            activeMenu === path ? "#FFFFFF" : "transparent",
                        }}
                      >
                        <a
                          className="header-link"
                          style={{
                            textDecoration: "none",
                            color: activeMenu === path ? "#000000" : "#FFFFFF",
                          }}
                          href={path}
                        >
                          {capitalizeFirstLetter(path.split("/")[1])}
                        </a>
                      </li>
                    );
                  }
                  return null; // Hide other menu items for regular users
                });
              }
            })()}
          </ul>
        </Box>

        <Box
          position="absolute"
          bottom={0}
          style={{ textAlign: "center", width: "90%" }}
        >
          {user ? (
            <>
              <Box style={{ textAlign: "center", marginTop: "2rem" }}>
                <h3>
                  <h3
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    remaining days : {vacationDays}
                  </h3>
                </h3>
                <Box style={{ textAlign: "center", marginTop: "1rem" }}>
                  {vacations.map((vacation: any) => (
                    <div key={vacation.id}>
                      <p>
                        {vacation.title}: {vacation.days} days
                      </p>
                    </div>
                  ))}
                </Box>
              </Box>
              <Box style={{ textAlign: "center", marginTop: "2rem" }}>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
              </Box>
            </>
          ) : null}
          <Button
            type="default"
            htmlType="submit"
            className="login-form-button"
            style={{ borderRadius: "20px", padding: "0 30px" }}
            onClick={client.logout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
};
