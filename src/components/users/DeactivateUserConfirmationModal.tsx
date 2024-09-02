import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface DeactivateUserConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeactivateUserConfirmationDialog: React.FC<
  DeactivateUserConfirmationDialogProps
> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deactivate User</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to deactivate this user?
          <br /> This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Deactivate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeactivateUserConfirmationDialog;
