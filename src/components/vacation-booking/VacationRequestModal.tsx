import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
// import "./VacationRequestModal.scss";
import "../../screens/main/styles/index.scss";

interface VacationRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  description: string;
  setDescription: (desc: string) => void;
  selectedInfo: any;
}

const VacationRequestModal: React.FC<VacationRequestModalProps> = ({
  open,
  onClose,
  onSave,
  description,
  setDescription,
  selectedInfo,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal-container">
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          gutterBottom
          className="modal-title"
        >
          Vacation Details
        </Typography>

        {/* Preview Section */}
        <Box className="preview-section">
          <Typography variant="body1" className="preview-text">
            <strong>Start Date:</strong>{" "}
            {selectedInfo
              ? new Date(selectedInfo.startStr).toLocaleDateString()
              : ""}
          </Typography>
          <Typography variant="body1" className="preview-text">
            <strong>End Date:</strong>{" "}
            {selectedInfo
              ? new Date(
                  selectedInfo.endStr || selectedInfo.startStr
                ).toLocaleDateString()
              : ""}
          </Typography>
          <Typography variant="body1" className="preview-text">
            <strong>Total Days:</strong> {selectedInfo ? selectedInfo.count : 0}
          </Typography>
        </Box>

        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your vacation..."
          className="text-field"
        />
        <Box className="modal-actions">
          <Button onClick={onClose} className="cancel-button">
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave} className="save-button">
            Send Request
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VacationRequestModal;
