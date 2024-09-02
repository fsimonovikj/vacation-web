import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export interface VacationData {
  title: string;
  start: Date;
  end: Date;
  days: number;
}

interface CreateVacationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (vacationData: VacationData) => void;
}

const CreateVacationModal: React.FC<CreateVacationModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState<Date | null>(null);
  const [end, setEndDate] = useState<Date | null>(null);
  const [days, setDays] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!start || !end || !days) {
      return;
    }
    const vacationData: VacationData = {
      title,
      start,
      end,
      days,
    };
    onSubmit(vacationData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new vacation</DialogTitle>
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
              label="End Date"
              value={end}
              onChange={(date) => setEndDate(date)}
              slots={{
                textField: (params) => (
                  <TextField {...params} fullWidth margin="dense" required />
                ),
              }}
            />
          </LocalizationProvider>

          <TextField
            margin="dense"
            id="days"
            name="days"
            label="Days"
            type="number"
            required
            fullWidth
            value={days ?? ""}
            onChange={(e) => setDays(parseInt(e.target.value, 10))}
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
