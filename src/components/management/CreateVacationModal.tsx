// CreateVacationModal.tsx
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface CreateVacationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CreateVacationModal: React.FC<CreateVacationModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new vacation</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            required
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="start"
            name="start"
            label="Start"
            placeholder="2024-05-31 (YYYY-MM-DD)"
            type="text"
            required
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="end"
            name="end"
            label="End"
            placeholder="2024-05-31 (YYYY-MM-DD)"
            type="text"
            required
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="days"
            name="days"
            label="Days"
            type="number"
            required
            fullWidth
          />

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVacationModal;
