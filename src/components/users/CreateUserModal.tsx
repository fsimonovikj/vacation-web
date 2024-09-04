import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { UserDepartment, UserRole } from "../../interfaces/types";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new user</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
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
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            fullWidth
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select label="Role" id="role" name="role" required fullWidth>
              {Object.values(UserRole).map((roleValue) => (
                <MenuItem key={roleValue} value={roleValue}>
                  {roleValue.charAt(0).toUpperCase() + roleValue.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              label="Department"
              id="department"
              name="department"
              required
              fullWidth
            >
              {Object.values(UserDepartment).map((departmentValue) => (
                <MenuItem key={departmentValue} value={departmentValue}>
                  {departmentValue.charAt(0).toUpperCase() +
                    departmentValue.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
