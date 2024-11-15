import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { VacationType } from "../../interfaces/types";

export interface VacationData {
  title: string;
  start: Date;
  end: Date;
  days: number;
  type: VacationType;
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
  const [type, setType] = useState<VacationType | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!start || !end || !days || !type) {
      return;
    }
    const vacationData: VacationData = {
      title,
      start,
      end,
      days,
      type,
    };

    console.log(`VACATION DATA`, vacationData);
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

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="type-label">Vacation Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as VacationType)}
            >
              {Object.values(VacationType).map((vacationType) => (
                <MenuItem key={vacationType} value={vacationType}>
                  {vacationType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
            <Button type="submit" color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVacationModal;
