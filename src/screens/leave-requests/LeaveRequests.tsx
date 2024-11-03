import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import CodefixClient from "../../services/CodefixClient";
import "./styles/index.scss";
import { Header } from "../../components/header/Header";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LeaveRequestDetailsDialog from "./LeaveRequestDetailsDialog";

export interface Request {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  start: string;
  end: string;
  bookedDays: string;
  status: string;
  userId: string;
  vacationId: string;
}

const LeaveRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const client = new CodefixClient();

  useEffect(() => {
    (async () => {
      try {
        const requests = await client.receiveLeaveRequests();
        setRequests(requests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (id: string) => {
    setLoading(id);
    await client.approveVacation(id);
    setLoading(null);
    setIsDialogOpen(false);
    refreshRequests();
  };

  const handleReject = async (id: string) => {
    setLoading(id);
    await client.rejectVacation(id);
    setLoading(null);
    setIsDialogOpen(false);
    refreshRequests();
  };

  const openDetailsDialog = (request: Request) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const closeDetailsDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  const refreshRequests = async () => {
    try {
      const requests = await client.receiveLeaveRequests();
      setRequests(requests);
    } catch (error) {
      console.error("Error refreshing leave requests:", error);
    }
  };

  return (
    <>
      <Box className="leave-request-header">
        <Header />
        {/* Add your header component if needed */}
      </Box>
      <Box className="leave-request-content">
        <Box className="leave-request-list">
          {requests.length === 0 && (
            <Typography variant="h5" className="no-requests">
              No leave requests found...
            </Typography>
          )}
          {requests.map((request) => (
            <Box
              key={request.id}
              className="leave-request-item"
              onClick={() => openDetailsDialog(request)}
            >
              <Box className="request-left">
                <Box className="request-buttons">
                  {/* Status */}
                  <Typography
                    variant="subtitle1"
                    className="status pending animated-jump"
                  >
                    {request.status === "Pending" && "pending"}
                  </Typography>

                  <Box className="action-icons">
                    <Tooltip title="Approve the request" placement="top">
                      <IconButton
                        color="primary"
                        onClick={() => handleApprove(request.id)}
                      >
                        {loading === request.id ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <CheckCircleIcon
                            sx={{
                              fontSize: {
                                xs: "1.5rem",
                                sm: "1.5rem",
                                md: "2.0rem",
                                lg: "2.5rem",
                                xl: "3.0rem",
                              },
                            }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel the request" placement="top">
                      <IconButton
                        color="error"
                        onClick={() => handleReject(request.id)}
                      >
                        {loading === request.id ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <CancelIcon
                            sx={{
                              fontSize: {
                                xs: "1.5rem",
                                sm: "1.5rem",
                                md: "2.0rem",
                                lg: "2.5rem",
                                xl: "3.0rem",
                              },
                            }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Start and End Dates */}
                <Box className="request-dates">
                  <ListItem
                    sx={{
                      paddingLeft: 0,
                    }}
                  >
                    <ListItemAvatar className="leave-date">
                      <Avatar className="avatar">
                        <BeachAccessIcon
                          sx={{
                            fontSize: 10,
                          }}
                        />
                      </Avatar>
                      <ListItemText
                        className="leave-date-text"
                        // primary="Start"
                        secondary={new Date(request.start).toLocaleDateString()}
                      />
                    </ListItemAvatar>
                  </ListItem>
                  <ListItem
                    sx={{
                      paddingLeft: 0,
                    }}
                  >
                    <ListItemAvatar className="leave-date">
                      <Avatar className="avatar">
                        <BeachAccessIcon
                          sx={{
                            fontSize: 10,
                          }}
                        />
                      </Avatar>
                      <ListItemText
                        className="leave-date-text"
                        // primary="End"
                        secondary={new Date(request.end).toLocaleDateString()}
                      />
                    </ListItemAvatar>
                  </ListItem>
                </Box>
              </Box>

              <Box className="request-right">
                <Box className="request-details">
                  <Typography>{request.title}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <LeaveRequestDetailsDialog
        open={isDialogOpen}
        onClose={closeDetailsDialog}
        request={selectedRequest}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
};

export default LeaveRequests;
