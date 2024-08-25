import { Box, Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import { VacationPlanI } from "../../interfaces/types";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import CodefixClient from "../../services/CodefixClient";
import "./styles/index.scss";
import CreateVacationModal from "../../components/management/CreateVacationModal";
import VacationPlanItem from "../../components/management/VacationPlanItem";

const Management = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [vacationPlan, setVacationPlan] = useState<VacationPlanI[]>([]);
  const [open, setOpen] = useState(false);
  const client = new CodefixClient();

  useEffect(() => {
    (async () => {
      try {
        const vacationPlan = await client.receiveVacationPlan();

        setVacationPlan(vacationPlan);
      } catch (error) {
        console.error("Error fetching vacation days:", error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newVacationPlan: VacationPlanI = {
        id: uuidV4(),
        title: (event.target as any).title.value,
        start: (event.target as any).start.value,
        end: (event.target as any).end.value,
        days: (event.target as any).days.value,
        createdAt: new Date(),
        deletedAt: null,
      };

      await client.requestVacationPlan(newVacationPlan);

      setVacationPlan((prevPlans) => [...prevPlans, newVacationPlan]);

      handleClose();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleToggle = (id: string) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="management-header">
        <Header />
      </Box>
      <Box className="management-content">
        <Button
          id="create-vacation-btn"
          className="create-vacation-btn"
          onClick={handleClickOpen}
        >
          Create Vacation +
        </Button>

        <CreateVacationModal
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />

        <Box className="vacation-plan-container">
          {vacationPlan.map((vacation) => (
            <VacationPlanItem
              key={vacation.id}
              vacation={vacation}
              isOpen={openItems[vacation.id]}
              onToggle={() => handleToggle(vacation.id)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Management;
