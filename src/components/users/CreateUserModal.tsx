import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  Button,
} from "@mui/material";

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
            className="select-role"
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

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
