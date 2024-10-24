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
      <Box className="book-modal-container">
        <Box className="modal-header">
          <Typography
            id="modal-title"
            variant="h5"
            component="h5"
            gutterBottom
            className="modal-title"
          >
            ODMORCO
          </Typography>
          <Typography
            id="modal-description"
            variant="body1"
            component="p"
            gutterBottom
            className="modal-description"
          >
            Please check the dates before you submit the request.
          </Typography>
        </Box>

        {/* Preview Section */}
        <Box className="preview-section-modal">
          <Typography variant="body1" className="preview-text" gutterBottom>
            You requested leave from
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="left"
            marginBottom="0.5rem"
          >
            <Typography
              variant="h6"
              component="span"
              className="vacation-date"
              style={{
                marginRight: "0.3rem",
              }}
            >
              {selectedInfo
                ? new Date(selectedInfo.startStr).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                  })
                : ""}
            </Typography>
            <Typography
              variant="body1"
              component="span"
              style={{ marginRight: "0.3rem" }}
            >
              to
            </Typography>
            <Typography variant="h6" component="span" className="vacation-date">
              {selectedInfo
                ? new Date(
                    selectedInfo.endStr || selectedInfo.startStr
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                  })
                : ""}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            className="preview-text"
            style={{ marginTop: "0.5rem" }}
          >
            Total:{" "}
            <span
              style={{
                // color: $primary - color,
                fontWeight: "bold",
              }}
            >
              {selectedInfo ? selectedInfo.count : 0} days
            </span>
          </Typography>
        </Box>

        <TextField
          autoFocus
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your vacation..."
          className="text-field"
        />
        <Box className="modal-actions">
          <Button variant="contained" onClick={onSave} className="save-button">
            Confirm
          </Button>
          <Button onClick={onClose} className="cancel-button">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VacationRequestModal;
