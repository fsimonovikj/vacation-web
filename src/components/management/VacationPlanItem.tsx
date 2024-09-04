// VacationPlanItem.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography as MuiTypography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import {
  UserPlanDetailsI,
  UserViewModel,
  VacationPlanI,
} from "../../interfaces/types";
import EditVacationModal from "./EditVacationModal";
import CodefixClient from "../../services/CodefixClient";
import AddUserToVacationModal from "./AddUserToVacationModal";

interface VacationPlanItemProps {
  vacation: VacationPlanI;
  isOpen: boolean;
  onToggle: () => void;
  onUpdated: () => void;
}

const VacationPlanItem: React.FC<VacationPlanItemProps> = ({
  vacation,
  isOpen,
  onToggle,
  onUpdated,
}) => {
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

  const handleModalSubmit = async (req: UserPlanDetailsI) => {
    try {
      await client.updateVacationDays(req);

      onUpdated();
      handleCloseModal();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenAddUserModal = () => setModalOpen(true);
  const handleCloseAddUserModal = () => setModalOpen(false);

  const handleUserAdded = () => {
    onUpdated();
  };

  return (
    <Box
      className="vacation-plan-item"
      sx={{
        padding: 2,
        marginBottom: 2,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <MuiTypography
        variant="h6"
        onClick={onToggle}
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {vacation.title}
        <span className="vacation-plan-days">{vacation.days} days</span>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </MuiTypography>

      <Collapse in={isOpen}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          sx={{
            marginTop: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Button
              id="create-vacation-btn"
              sx={{
                float: "right",
              }}
              onClick={handleOpenAddUserModal}
            >
              Add Vacation To User +
            </Button>
            <AddUserToVacationModal
              open={isModalOpen}
              onClose={handleCloseAddUserModal}
              vacationId={vacation.id}
              onUserAdded={handleUserAdded}
            />
          </Box>

          {vacation &&
            vacation.details &&
            vacation.details.map((user) => (
              <Card
                key={user.id}
                sx={{
                  width: 250,
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative", // Positioning relative to allow the button to be placed absolutely
                }}
              >
                <IconButton
                  sx={{ position: "absolute", right: 8, top: 8 }} // Positioning the button at the top right
                  aria-label="edit"
                  onClick={() => handleEditClick(user)}
                >
                  <EditIcon />
                </IconButton>
                <CardContent sx={{ paddingBottom: 2 }}>
                  <MuiTypography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.firstName}
                  </MuiTypography>
                  <MuiTypography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.lastName}
                  </MuiTypography>
                  <MuiTypography
                    variant="body1"
                    sx={{ color: "text.secondary" }}
                  >
                    Remaining days: <strong>{user.remainingDays}</strong>
                  </MuiTypography>
                </CardContent>
              </Card>
            ))}

          {selectedUser && (
            <EditVacationModal
              open={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              user={selectedUser}
              vacation={vacation}
            />
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default VacationPlanItem;
