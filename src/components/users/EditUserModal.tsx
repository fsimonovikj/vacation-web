import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import {
  UserDepartment,
  UserRole,
  UserStatus,
  UserViewModel,
  VacationType,
} from "../../interfaces/types"; // Ensure you import the UserViewModel type
import DeactivateUserConfirmationDialog from "./DeactivateUserConfirmationModal";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedData: UserViewModel) => void;
  onDeactivate: (userId: string) => void;
  user: UserViewModel;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  onSubmit,
  onDeactivate,
  user,
}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [department, setDepartment] = useState(user.department);
  const [type, setType] = useState(user.type);
  const [isDeactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData = {
      ...user,
      firstName,
      lastName,
      email,
      role,
      status,
      department,
      type,
    };
    onSubmit(updatedData);
  };

  const handleDeactivate = () => {
    setDeactivateDialogOpen(true);
  };

  const handleConfirmDeactivate = () => {
    setDeactivateDialogOpen(false);
    onDeactivate(user.id as string);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Edit User</span>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              margin="dense"
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled
              fullWidth
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                label="Role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                required
              >
                {Object.values(UserRole).map((roleValue) => (
                  <MenuItem key={roleValue} value={roleValue}>
                    {roleValue.charAt(0).toUpperCase() + roleValue.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl margin="dense" fullWidth>
              <InputLabel id="role-label">Vacation Type</InputLabel>
              <Select
                label="Vacation Type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as VacationType)}
                required
              >
                {Object.values(VacationType).map((vacationType) => (
                  <MenuItem key={vacationType} value={vacationType}>
                    {vacationType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl margin="dense" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                label="Status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as UserStatus)}
                required
              >
                {Object.values(UserStatus).map((statusValue) => (
                  <MenuItem key={statusValue} value={statusValue}>
                    {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl margin="dense" fullWidth>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                label="Department"
                id="department"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value as UserDepartment)
                }
                required
              >
                {Object.values(UserDepartment).map((departmentValue) => (
                  <MenuItem key={departmentValue} value={departmentValue}>
                    {departmentValue.charAt(0).toUpperCase() +
                      departmentValue.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Button onClick={handleDeactivate} color="error">
                Deactivate User
              </Button>
              <Box>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </Box>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <DeactivateUserConfirmationDialog
        open={isDeactivateDialogOpen}
        onClose={() => setDeactivateDialogOpen(false)}
        onConfirm={handleConfirmDeactivate}
      />
    </>
  );
};

export default EditUserModal;
