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
import { UserViewModel } from "../../interfaces/types";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useAuth } from "../../auth/core/Auth";
import CodefixClient from "../../services/CodefixClient";

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
        department: "dev",
        role: (event.target as any).role.value,
        companyId: user!.companyId,
        status: "active",
      };

      await client.requestUser(newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      handleClose();
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
        <Header />
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
