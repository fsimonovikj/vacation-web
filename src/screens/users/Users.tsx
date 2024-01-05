import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import { UserViewModel } from "../../interfaces/types";
import { getLocalStorageWithExpiry } from "../../core/utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const user: UserViewModel = getLocalStorageWithExpiry("user");

  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);

  // eslint-disable-next-line
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/vacation/lists`
      );
      setData(res.data);
    } catch (error) {
      // Handle error if API call fails.
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
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

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
        firstName: (event.target as any).firstName.value,
        lastName: (event.target as any).lastName.value,
        email: (event.target as any).email.value,
        password: (event.target as any).password.value,
        department: "dev",
        role: (event.target as any).role.value,
      });

      console.log(`Created user successfully`);
      handleClose();
    } catch (error) {
      // Handle error if API call fails.
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
        <Header user={user} />
      </Box>
      <Box
        position="absolute"
        left={"20%"}
        top={0}
        style={{ width: "80%", height: "100%", backgroundColor: "#f5f5f5" }}
      >
        {/* <VacationBooking user={user} /> */}

        <Button onClick={handleClickOpen}>Create User +</Button>
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

              <DialogContentText>Content</DialogContentText>
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
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
