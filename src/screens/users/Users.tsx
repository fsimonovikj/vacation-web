import { Box, Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import {
  UserDepartment,
  UserStatus,
  UserViewModel,
} from "../../interfaces/types";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useAuth } from "../../auth/core/Auth";
import CodefixClient from "../../services/CodefixClient";
import "./styles/index.scss";
import UsersTable from "../../components/users/UsersTable";
import CreateUserModal from "../../components/users/CreateUserModal";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UserViewModel[]>([]);
  const client = new CodefixClient();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await client.receiveUsers(user!.companyId as string);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newUser: UserViewModel = {
        id: uuidV4(),
        firstName: (event.target as any).firstName.value,
        lastName: (event.target as any).lastName.value,
        email: (event.target as any).email.value,
        password: (event.target as any).password.value,
        department: UserDepartment.Other,
        role: (event.target as any).role.value,
        companyId: user!.companyId,
        status: UserStatus.Active,
      };

      await client.requestUser(newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      handleClose();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onUpdated = async () => {
    try {
      const response = await client.receiveUsers(user!.companyId as string);
      setUsers(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Box className="users-header">
        <Header />
      </Box>
      <Box className="users-content">
        <Button onClick={handleClickOpen} id="create-user-btn">
          Create User +
        </Button>

        <CreateUserModal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />

        <UsersTable users={users} onUpdated={onUpdated} />
      </Box>
    </>
  );
};

export default Users;
