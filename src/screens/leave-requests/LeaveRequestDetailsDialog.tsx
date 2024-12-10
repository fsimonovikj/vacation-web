import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Request } from "./LeaveRequests";

interface LeaveRequestDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  request: Request | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const LeaveRequestDetailsDialog: React.FC<LeaveRequestDetailsDialogProps> = ({
  open,
  onClose,
  request,
  onApprove,
  onReject,
}) => {
  if (!request) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Details
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box p={1}>
          <Typography variant="h6" gutterBottom>
            {request.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {request.description}
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1">
              <strong>Start Date:</strong>{" "}
              {new Date(request.start).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">
              <strong>End Date:</strong>{" "}
              {new Date(request.end).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Booked Days:</strong> {request.bookedDays}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Status:</strong> {request.status}
            </Typography>
            {request.description && (
              <Typography variant="subtitle1">
                <strong>Description</strong> {request.description}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box p={2}>
          <Button
            startIcon={<CancelIcon />}
            color="error"
            onClick={() => onReject(request.id)}
          >
            Reject
          </Button>
          <Button
            startIcon={<CheckCircleIcon />}
            color="primary"
            onClick={() => onApprove(request.id)}
          >
            Approve
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveRequestDetailsDialog;
