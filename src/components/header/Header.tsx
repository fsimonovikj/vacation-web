import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { AppPathEnum } from "../../enums/path-enum";
import { UserRole, VacationI } from "../../interfaces/types";
import { useAuth } from "../../auth/core/Auth";
import { capitalizeFirstLetter } from "../../core/utils/utils";
import CodefixClient from "../../services/CodefixClient";
import "../../styles/header.scss";
import UserInfo from "./UserInfo";

export const Header = () => {
  const [vacationDays, setVacationDays] = useState<number>(0);
  const [vacations, setVacations] = useState<VacationI[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Hamburger Menu Icon */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {(() => {
            if (user && user.role === UserRole.Admin) {
              return Object.values(AppPathEnum).map((path) => (
                <li key={path} onClick={toggleMenu}>
                  <a href={path}>{capitalizeFirstLetter(path.split("/")[1])}</a>
                </li>
              ));
            } else if (user && user.role === UserRole.User) {
              return Object.values(AppPathEnum).map((path) => {
                if (path === AppPathEnum.MAIN) {
                  return (
                    <li key={path} onClick={toggleMenu}>
                      <a href={path}>
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

        {user ? (
          <Box className="mobile-user-info">
            <UserInfo
              vacationDays={vacationDays}
              vacations={vacations}
              user={user}
            />
          </Box>
        ) : null}
      </div>

      {/* Desktop Header (only visible on larger screens) */}
      <Box className="header-container">
        <Box className="header-title">
          <h2>{process.env.REACT_APP_COMPANY_NAME}</h2>
          <p>Software Development Services</p>
        </Box>

        <Box className="header-menu">
          <ul>
            {(() => {
              if (user && user.role === UserRole.Admin) {
                return Object.values(AppPathEnum).map((path) => (
                  <li
                    key={path}
                    className={`header-menu-item ${
                      activeMenu === path ? "active" : ""
                    }`}
                  >
                    <a
                      className={`header-link ${
                        activeMenu === path ? "active" : "inactive"
                      }`}
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
                        className={`header-menu-item ${
                          activeMenu === path ? "active" : ""
                        }`}
                      >
                        <a
                          className={`header-link ${
                            activeMenu === path ? "active" : "inactive"
                          }`}
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

        <Box className="header-bottom">
          <UserInfo
            vacationDays={vacationDays}
            vacations={vacations}
            user={user!}
          />
        </Box>
      </Box>
    </>
  );
};
