import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Header } from "../../components/header/Header";
import { UserViewModel } from "../../interfaces/types";
import { getLocalStorageWithExpiry } from "../../core/utils/utils";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";

const Management = () => {
  const user: UserViewModel = getLocalStorageWithExpiry("user");

  const [isOpen, setIsOpen] = useState(true);
  // eslint-disable-next-line
  const [data, setData] = useState<any>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/vacation/lists`
      );
      setData(res.data);
    } catch (error) {
      // Handle error if API call fails.
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      console.log(`creating vacation solution`);
      const res = await axios.post(`http://localhost:3000/vacation-solution`, {
        id: "8b9b8090-bbcd-4ebc-8f54-a4622079b200",
        title: "test",
        start: "2023-06-01",
        end: "2023-06-01",
      });
      console.log(`created vacation solution`);
    } catch (error) {
      // Handle error if API call fails.
      console.error("Error fetching data:", error);
    }
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
        <Header user={user} />
      </Box>
      <Box
        position="absolute"
        left={"20%"}
        top={0}
        style={{ width: "80%", height: "100%", backgroundColor: "#f5f5f5" }}
      >
        {/* <VacationBooking user={user} /> */}

        <Button onClick={handleClickOpen}>Create +</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create a new vacation</DialogTitle>
          <DialogContent>
            {/* vacation-solution */}
            <form onClick={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="start"
                label="Start"
                type="text"
                placeholder="2023-06-01 (YYYY-MM-DD)"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="end"
                label="End"
                type="text"
                placeholder="2024-05-31 (YYYY-MM-DD)"
                fullWidth
              />
            </form>
            <DialogContentText>Content</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Create</Button>
          </DialogActions>
        </Dialog>

        {/* ODMORI */}
        <Box
          style={{
            width: "98%",
            height: "100%",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
          }}
        >
          <Box
            style={{
              border: "1px solid #ababab",
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "0.5rem",
            }}
          >
            <Typography
              onClick={handleToggle}
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
              {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />} Year: 2023
            </Typography>

            <Collapse in={isOpen}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100% !important",
                }}
              >
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
                    <span style={{ fontWeight: "bold" }}>Remaining days:</span>{" "}
                    21
                  </Typography.Text>
                </Box>
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
                    <span style={{ fontWeight: "bold" }}>Remaining days:</span>{" "}
                    21
                  </Typography.Text>
                </Box>
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
                    <span style={{ fontWeight: "bold" }}>Remaining days:</span>{" "}
                    21
                  </Typography.Text>
                </Box>
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
                    <span style={{ fontWeight: "bold" }}>Remaining days:</span>{" "}
                    21
                  </Typography.Text>
                </Box>
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
                    <span style={{ fontWeight: "bold" }}>Remaining days:</span>{" "}
                    21
                  </Typography.Text>
                </Box>
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Management;
