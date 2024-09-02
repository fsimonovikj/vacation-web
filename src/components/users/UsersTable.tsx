// UsersTable.tsx
import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UserViewModel } from "../../interfaces/types";
import "../../screens//users/styles/index.scss";
import EditIcon from "@mui/icons-material/Edit";
import EditUserModal from "./EditUserModa";
import CodefixClient from "../../services/CodefixClient";

interface UsersTableProps {
  users: UserViewModel[];
  onUpdated: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onUpdated }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserViewModel | null>(null);
  const client = new CodefixClient();

  const handleEditClick = (user: UserViewModel) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = async (updatedData: any) => {
    try {
      await client.updateUser(updatedData);

      onUpdated();
      handleCloseModal();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeactivateUser = async () => {
    if (!selectedUser) return;

    try {
      await client.deactivateUser(selectedUser);
      onUpdated();
      handleCloseModal();
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper} className="users-table-container">
        <Table>
          <TableHead className="users-table-head">
            <TableRow className="users-table-row">
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.department
                    ? user.department.charAt(0).toUpperCase() +
                      user.department.slice(1)
                    : "Other"}
                </TableCell>
                <TableCell>
                  {user.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "User"}
                </TableCell>
                <TableCell>
                  {user.status
                    ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
                    : "Pending"}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <EditUserModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          onDeactivate={handleDeactivateUser}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default UsersTable;
