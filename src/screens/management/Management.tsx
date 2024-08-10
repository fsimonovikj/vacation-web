import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import { VacationPlanI } from "../../interfaces/types";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { v4 as uuidV4 } from "uuid";
import MidelClient from "../../services/MidelClient";

const Management = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [vacationPlan, setVacationPlan] = useState<VacationPlanI[]>([]);
  const [open, setOpen] = useState(false);
  const client = new MidelClient();

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
      <Box
        position="fixed"
        left={0}
        top={0}
        style={{
          width: "20%",
          height: "100%",
          backgroundColor: "#1c1c1c",
          color: "white",
        }}
      >
        <Header />
      </Box>
      <Box
        position="absolute"
        left={"20%"}
        top={0}
        style={{ width: "80%", height: "100%", backgroundColor: "#f5f5f5" }}
      >
        <Button
          onClick={handleClickOpen}
          style={{
            margin: "1% 2.5%",
            backgroundColor: "#1c1c1c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "12px",
            padding: "5px 10px",
          }}
        >
          Create Vacation +
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create a new vacation</DialogTitle>
          <DialogContent>
            {/* vacation-solution */}
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
              />
              <TextField
                autoFocus
                margin="dense"
                id="start"
                name="start"
                label="Start"
                placeholder="2024-05-31 (YYYY-MM-DD)"
                type="text"
                required
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="end"
                name="end"
                label="End"
                placeholder="2024-05-31 (YYYY-MM-DD)"
                type="text"
                required
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="days"
                name="days"
                label="Days"
                type="number"
                required
                fullWidth
              />

              {/* <DialogContentText>Content</DialogContentText> */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <Box
          style={{
            width: "96%",
            height: "100%",
            backgroundColor: "#f5f5f5",
            padding: "0 2%",
          }}
        >
          {/* TODO: create a new file for vacation plan */}
          {vacationPlan.map((vacation) => (
            <Box
              key={vacation.id}
              style={{
                border: "1px solid #ababab",
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "0.5rem",
                margin: "0.5rem",
              }}
            >
              <Typography
                onClick={() => handleToggle(vacation.id)}
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "0.4rem",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {vacation.title}
                <span
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    display: "flex",
                    marginLeft: "auto",
                    paddingRight: "1rem",
                  }}
                >
                  {vacation.days} days
                </span>
                {openItems[vacation.id] ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )}{" "}
              </Typography>

              <Collapse in={openItems[vacation.id]}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100% !important",
                  }}
                >
                  {/* TODO: modified this in the dynamic */}
                  <Box
                    sx={{
                      width: "13%",
                      padding: "2%",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                      margin: "1.5%",
                    }}
                  >
                    <Typography.Title
                      level={5}
                      style={{
                        textAlign: "center",
                        margin: 0,
                        paddingBottom: "1.5rem",
                      }}
                    >
                      Filip Simonovikj
                    </Typography.Title>
                    <Typography.Text>
                      <span style={{ fontWeight: "bold" }}>
                        Remaining days:
                      </span>{" "}
                      21
                    </Typography.Text>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Management;
