import { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { AppPathEnum } from "../../enums/path-enum";
import { UserRole, VacationI } from "../../interfaces/types";
import { useAuth } from "../../auth/core/Auth";
import {
  capitalizedAndFormatPath,
  capitalizeFirstLetter,
} from "../../core/utils/utils";
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
                  <a href={path}>
                    {capitalizedAndFormatPath(path.split("/")[1])}
                  </a>
                </li>
              ));
            } else if (user && user.role === UserRole.User) {
              return Object.values(AppPathEnum).map((path) => {
                if (path === AppPathEnum.CALENDAR) {
                  return (
                    <li key={path} onClick={toggleMenu}>
                      <a href={path}>
                        {capitalizedAndFormatPath(path.split("/")[1])}
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

        <Box className="header-top">
          <Avatar
            alt={user?.firstName}
            src={
              "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png"
            }
            // src={"/default-avatar.png"} // Placeholder or default avatar
            className="header-top-avatar" // Avatar size
          />
          <Box ml={2} className="header-top-user-info">
            <Typography className="header-top-user-info-name">
              {capitalizeFirstLetter(user?.firstName as string)}
            </Typography>
            <Typography className="header-top-user-info-department">
              {capitalizeFirstLetter(user?.department as string)}
            </Typography>
          </Box>
          <Box ml="auto" className="header-top-user-details">
            {/* Button with ellipsis icon that opens a modal or redirects */}
            <button
              type="button"
              className="header-top-user-details-button"
              onClick={() => {
                // Logic to open a modal or navigate to user details page
                // Example: openModal() or navigate("/user-details")
              }}
            >
              <svg
                className="dropdown-dots__icon"
                width="4"
                height="4"
                viewBox="0 0 4 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2C0 2.53043 0.210713 3.03914 0.585786 3.41421C0.960859 3.78929 1.46957 4 2 4C2.53043 4 3.03914 3.78929 3.41421 3.41421C3.78929 3.03914 4 2.53043 4 2C4 1.46957 3.78929 0.960859 3.41421 0.585787C3.03914 0.210714 2.53043 0 2 0C1.46957 0 0.960859 0.210714 0.585786 0.585787C0.210713 0.960859 0 1.46957 0 2ZM0 10C0 10.5304 0.210713 11.0391 0.585786 11.4142C0.960859 11.7893 1.46957 12 2 12C2.53043 12 3.03914 11.7893 3.41421 11.4142C3.78929 11.0391 4 10.5304 4 10C4 9.46957 3.78929 8.96086 3.41421 8.58579C3.03914 8.21071 2.53043 8 2 8C1.46957 8 0.960859 8.21071 0.585786 8.58579C0.210713 8.96086 0 9.46957 0 10ZM0 18C0 18.5304 0.210713 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20C2.53043 20 3.03914 19.7893 3.41421 19.4142C3.78929 19.0391 4 18.5304 4 18C4 17.4696 3.78929 16.9609 3.41421 16.5858C3.03914 16.2107 2.53043 16 2 16C1.46957 16 0.960859 16.2107 0.585786 16.5858C0.210713 16.9609 0 17.4696 0 18Z"
                  fill="#FFFFFF"
                />
              </svg>
            </button>
          </Box>
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
                      {capitalizedAndFormatPath(path.split("/")[1])}
                    </a>
                  </li>
                ));
              } else if (user && user.role === UserRole.User) {
                return Object.values(AppPathEnum).map((path) => {
                  if (path === AppPathEnum.CALENDAR) {
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
                          {capitalizedAndFormatPath(path.split("/")[1])}
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
