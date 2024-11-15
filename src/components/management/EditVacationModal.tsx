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
} from "@mui/material";

interface EditVacationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedData: any) => void;
  user: any;
  vacation: any;
}

const EditVacationModal: React.FC<EditVacationModalProps> = ({
  open,
  onClose,
  onSubmit,
  user,
  vacation,
}) => {
  const [days, setDays] = useState(user.remainingDays);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData = {
      ...user,
      remainingDays: days,
    };
    onSubmit(updatedData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Edit Vacation</span>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            type="text"
            value={vacation.title}
            disabled
            fullWidth
          />
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            value={user.firstName}
            disabled
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            value={user.lastName}
            disabled
            fullWidth
          />
          <TextField
            margin="dense"
            label="Vacation Type"
            type="text"
            value={user.type}
            disabled
            fullWidth
          />
          <TextField
            margin="dense"
            id="days"
            name="days"
            label="Remaining Days"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            fullWidth
          />

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVacationModal;
