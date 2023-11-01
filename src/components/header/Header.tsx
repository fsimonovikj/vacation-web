import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Button } from "antd";
import { axiosApi } from "../../screens/main/MainScreen";
import MidelClient from "../../services/MidelClient";
import { AppPathEnum } from "../../enums/path-enum";
import { UserRole } from "../../interfaces/types";

export const Header = ({ user }: any) => {
  const [vacationDays, setVacationDays] = useState<number>(0);
  const activeMenu = window.location.pathname;
  const client = new MidelClient();

  async function logout() {
    try {
      await client.logout();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const getVacationDays = async () => {
    if (!user || !user.id) {
      return;
    }

    try {
      const response = await axiosApi.get(
        `${process.env.REACT_APP_BACKEND_URL}/vacation/${user.id}`
      );
      const days = response.data.reduce(
        (totalDays: any, element: any) => totalDays + parseInt(element.days),
        0
      );

      setVacationDays(days);
      localStorage.setItem("x-number", days);
    } catch (error) {
      console.error("Error fetching vacation days:", error);
    }
  };

  useEffect(() => {
    getVacationDays();
    // eslint-disable-next-line
  }, [user]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
};
