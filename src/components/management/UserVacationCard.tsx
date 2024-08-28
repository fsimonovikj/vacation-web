import React from "react";
import { Box, Typography as MuiTypography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface VacationPlanItemProps {
  user: {
    id: string;
    name: string;
    remainingDays: number;
  };
}

const UserVacationCard: React.FC<VacationPlanItemProps> = ({ user }) => {
  return (
    <Box
      sx={{
        padding: 2,
        marginBottom: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        maxWidth: "200px",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <MuiTypography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
        {user.name}
      </MuiTypography>
      <MuiTypography variant="body2" sx={{ fontSize: "14px" }}>
        <strong>Remaining days:</strong> {user.remainingDays}
      </MuiTypography>
      <IconButton
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          color: "#777",
          "&:hover": {
            color: "#333",
          },
        }}
        aria-label="edit"
        size="small"
      >
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

const VacationPlanList: React.FC<{ users: any[] }> = ({ users }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {users.map((user) => (
        <UserVacationCard key={user.id} user={user} />
      ))}
    </Box>
  );
};

export default VacationPlanList;
