import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface CreateHolidayModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (holidayData: {
    title: string;
    description: string;
    start: Date;
    end: Date;
  }) => void;
}

const CreateHolidayModal: React.FC<CreateHolidayModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStartDate] = useState<Date | null>(null);
  const [end, setEndDate] = useState<Date | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!start) {
      return;
    }
    const holidayData = {
      title,
      description,
      start,
      end: end || start,
    };
    onSubmit(holidayData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new holiday</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            required
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            required
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={start}
              onChange={(date) => setStartDate(date)}
              slots={{
                textField: (params) => (
                  <TextField {...params} fullWidth margin="dense" required />
                ),
              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date (Optional)"
              value={end}
              onChange={(date) => setEndDate(date)}
              slots={{
                textField: (params) => (
                  <TextField {...params} fullWidth margin="dense" />
                ),
              }}
            />
          </LocalizationProvider>

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

export default CreateHolidayModal;
