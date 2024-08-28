// VacationPlanItem.tsx
import React from "react";
import { Box, Collapse, Typography as MuiTypography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { VacationPlanI } from "../../interfaces/types";

interface VacationPlanItemProps {
  vacation: VacationPlanI;
  isOpen: boolean;
  onToggle: () => void;
}

const VacationPlanItem: React.FC<VacationPlanItemProps> = ({
  vacation,
  isOpen,
  onToggle,
}) => {
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
        <Box className="collapse-content" sx={{ marginTop: 2 }}>
          {vacation.details?.map((user) => (
            <Box
              key={user.id}
              className="vacation-plan-summary"
              sx={{ marginBottom: 2 }}
            >
              <MuiTypography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {user.name}
              </MuiTypography>
              <MuiTypography variant="body2">
                <span className="vacation-plan-summary-text">
                  Remaining days:
                </span>{" "}
                {user.remainingDays}
              </MuiTypography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default VacationPlanItem;
