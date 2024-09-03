import { Box, Button } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import { VacationPlanI } from "../../interfaces/types";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import CodefixClient from "../../services/CodefixClient";
import "./styles/index.scss";
import CreateVacationModal, {
  VacationData,
} from "../../components/management/CreateVacationModal";
import VacationPlanItem from "../../components/management/VacationPlanItem";
import CreateHolidayModal from "../../components/management/CreateHolidayModal";

const Management = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [vacationPlan, setVacationPlan] = useState<VacationPlanI[]>([]);
  const [openVacation, setOpenVacation] = useState(false);
  const [openHoliday, setOpenHoliday] = useState(false);
  const client = new CodefixClient();

  useEffect(() => {
    (async () => {
      try {
        const vacationPlan = await client.receiveVacationPlan();

        console.log(`vacationPlan`, vacationPlan);
        setVacationPlan(vacationPlan);
      } catch (error) {
        console.error("Error fetching vacation days:", error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleSubmitVacation = async (vacationData: VacationData) => {
    try {
      const newVacationPlan: VacationPlanI = {
        id: uuidV4(),
        title: vacationData.title,
        start: new Date(
          Date.UTC(
            vacationData.start.getFullYear(),
            vacationData.start.getMonth(),
            vacationData.start.getDate()
          )
        ),
        end: new Date(
          Date.UTC(
            vacationData.end.getFullYear(),
            vacationData.end.getMonth(),
            vacationData.end.getDate()
          )
        ),
        days: vacationData.days,
        createdAt: new Date(),
        deletedAt: null,
      };

      await client.requestVacationPlan(newVacationPlan);

      setVacationPlan((prevPlans) => [...prevPlans, newVacationPlan]);

      handleCloseVacation();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmitHoliday = async (holidayData: {
    title: string;
    description: string;
    start: Date;
    end: Date;
  }) => {
    try {
      const startUtc = new Date(
        Date.UTC(
          holidayData.start.getFullYear(),
          holidayData.start.getMonth(),
          holidayData.start.getDate()
        )
      );

      let endUtc = new Date(
        Date.UTC(
          holidayData.end.getFullYear(),
          holidayData.end.getMonth(),
          holidayData.end.getDate()
        )
      );

      endUtc.setUTCDate(endUtc.getUTCDate() + 1);

      const holidayDataUtc = {
        ...holidayData,
        start: startUtc,
        end: endUtc,
      };

      await client.requestHoliday(holidayDataUtc);
      handleHolidayClose();
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

  const handleClickOpenVacation = () => {
    setOpenVacation(true);
  };

  const handleCloseVacation = () => {
    setOpenVacation(false);
  };

  const handleHolidayClickOpen = () => {
    setOpenHoliday(true);
  };

  const handleHolidayClose = () => {
    setOpenHoliday(false);
  };

  const onUpdated = async () => {
    try {
      const vacationPlan = await client.receiveVacationPlan();

      setVacationPlan(vacationPlan);
    } catch (error) {
      console.error("Error fetching vacation days:", error);
    }
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
          onClick={handleClickOpenVacation}
        >
          Create Vacation +
        </Button>

        <Button
          id="create-vacation-btn"
          className="create-vacation-btn"
          onClick={handleHolidayClickOpen}
        >
          Create Holiday +
        </Button>

        <CreateVacationModal
          open={openVacation}
          onClose={handleCloseVacation}
          onSubmit={handleSubmitVacation}
        />

        <CreateHolidayModal
          open={openHoliday}
          onClose={handleHolidayClose}
          onSubmit={handleSubmitHoliday}
        />

        <Box className="vacation-plan-container">
          {vacationPlan.map((vacation) => (
            <VacationPlanItem
              key={vacation.id}
              vacation={vacation}
              isOpen={openItems[vacation.id]}
              onToggle={() => handleToggle(vacation.id)}
              onUpdated={onUpdated}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Management;
