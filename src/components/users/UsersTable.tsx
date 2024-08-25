// UsersTable.tsx
import React from "react";
import {
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

interface UsersTableProps {
  users: UserViewModel[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <TableContainer component={Paper} className="users-table-container">
      <Table>
        <TableHead className="users-table-head">
          <TableRow className="users-table-row">
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
