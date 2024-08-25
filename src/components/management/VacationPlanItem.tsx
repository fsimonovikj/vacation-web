// VacationPlanItem.tsx
import React from "react";
import { Box, Collapse } from "@mui/material";
import { Typography } from "antd";
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
    <Box className="vacation-plan-item">
      <Typography onClick={onToggle} className="vacation-plan-title">
        {vacation.title}
        <span className="vacation-plan-days">{vacation.days} days</span>
        {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Typography>

      <Collapse in={isOpen}>
        <Box className="collapse-content">
          <Box className="vacation-plan-summary">
            <Typography.Title level={5} className="vacation-plan-summary-title">
              Filip Simonovikj
            </Typography.Title>
            <Typography.Text>
              <span className="vacation-plan-summary-text">
                Remaining days:
              </span>{" "}
              21
            </Typography.Text>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default VacationPlanItem;
