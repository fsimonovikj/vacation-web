import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  Checkbox,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CodefixClient from "../../services/CodefixClient";
import { useAuth } from "../../auth/core/Auth";

interface AddUserToVacationModalProps {
  open: boolean;
  onClose: () => void;
  vacationId: string;
  onUserAdded: () => void;
}

const AddUserToVacationModal: React.FC<AddUserToVacationModalProps> = ({
  open,
  onClose,
  vacationId,
  onUserAdded,
}) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const client = new CodefixClient();
      try {
        const availableUsers = await client.receiveAvailableUsersForVacation(
          vacationId,
          user?.companyId ?? ""
        );
        setUsers(availableUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [vacationId, open]);

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all
    } else {
      const allUserIds = users.map((user: any) => user.id); // Select all user IDs
      setSelectedUsers(allUserIds);
    }
    setSelectAll(!selectAll); // Toggle "Select All" state
  };

  const handleSave = async () => {
    try {
      const client = new CodefixClient();
      await client.requestAddUsersToVacation(
        vacationId,
        selectedUsers,
        user?.companyId ?? ""
      );
      onUserAdded();
      setUsers([]);
      onClose();
    } catch (error) {
      console.error("Error adding users to vacation:", error);
    }
  };

  useEffect(() => {
    // Check if all users are selected
    if (selectedUsers.length === users.length && users.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, users]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Add Users to Vacation</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography>Select users to add to the vacation plan:</Typography>
        </Box>

        {/* Conditionally render "Select All" checkbox if more than 2 users */}
        {users.length > 2 && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Checkbox checked={selectAll} onChange={handleSelectAllToggle} />
            <Typography>Select All</Typography>
          </Box>
        )}

        <List sx={{ maxHeight: 300, overflow: "auto" }}>
          {users.map((user: any) => (
            <ListItem
              key={user.id}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Checkbox
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserToggle(user.id)}
              />
              <Typography sx={{ ml: 1 }}>
                {user.firstName} {user.lastName}
              </Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserToVacationModal;
