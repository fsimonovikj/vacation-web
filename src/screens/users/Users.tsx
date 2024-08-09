import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import { UserViewModel, VacationI } from "../../interfaces/types";
import { getLocalStorageWithExpiry } from "../../core/utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import webConfig from "../../config/config";
import { USER_LOCAL_STORAGE_KEY } from "../../auth/core/AuthModels";

interface UsersPageProps {
  vacationDays: number;
  vacations: VacationI[];
}

const Users = ({ vacationDays, vacations }: UsersPageProps) => {
  const user: UserViewModel = getLocalStorageWithExpiry(USER_LOCAL_STORAGE_KEY);

  const [isOpen, setIsOpen] = useState(true);
  // eslint-disable-next-line
  const [data, setData] = useState<any>([]);
  const [users, setUsers] = useState<UserViewModel[]>([]);

  // eslint-disable-next-line
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${webConfig.apiBaseUrl}/vacation/lists`);
      setData(res.data);
    } catch (error) {
      // Handle error if API call fails.
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${webConfig.apiBaseUrl}/users`);
      setUsers(res.data);
    } catch (error) {
      // Handle error if API call fails.
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(`Creating user`);

      await axios.post(`${webConfig.apiBaseUrl}/users`, {
        id: uuidV4(),
        firstName: (event.target as any).firstName.value,
        lastName: (event.target as any).lastName.value,
        email: (event.target as any).email.value,
        password: (event.target as any).password.value,
        department: "dev",
        role: (event.target as any).role.value,
      });

      console.log(`Created user successfully`);
      handleClose();
      fetchUsers();
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
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
        <Header user={user} vacationDays={vacationDays} vacations={vacations} />
      </Box>
      <Box
        position="absolute"
        left={"20%"}
        top={0}
        style={{ width: "80%", height: "100%", backgroundColor: "#f5f5f5" }}
      >
        <Button
          onClick={handleClickOpen}
          style={{
            margin: "1% 2.5%",
            backgroundColor: "#1c1c1c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "12px",
            padding: "5px 10px",
          }}
        >
          Create User +
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create a new user</DialogTitle>
          <DialogContent>
            {/* vacation-solution */}
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                required
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                required
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                required
                fullWidth
              />

              <Select
                native
                id="role"
                name="role"
                label="Role"
                style={{ marginTop: "7px" }}
                inputProps={{
                  name: "role",
                  id: "role",
                }}
                required
                fullWidth
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Select>

              {/* <DialogContentText>Content</DialogContentText> */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Table to display users */}
        <TableContainer
          component={Paper}
          style={{ margin: "auto", width: "95%", overflowX: "auto" }}
        >
          <Table>
            <TableHead
              style={{
                backgroundColor: "#dfdfdf",
              }}
            >
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Users;
