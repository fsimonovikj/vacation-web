import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import CodefixClient from "../../services/CodefixClient";
import { Header } from "../../components/header/Header";
import "./styles/index.scss";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Reports = () => {
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [timePeriod, setTimePeriod] = useState("month"); // Default time period
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRealData = async (
    filterType: string,
    range?: [Date | null, Date | null]
  ) => {
    const client = new CodefixClient();
    let bookings = [];

    if (
      filterType === "week" ||
      filterType === "month" ||
      filterType === "year"
    ) {
      bookings = await client.receiveBookedVacations();
    } else if (range && range[0] && range[1]) {
      bookings = await client.receiveBookedVacations();
    }

    // Format the fetched bookings for charts and details
    formatDataForCharts(bookings);
  };

  const formatDataForCharts = (bookings: any) => {
    // Format data for PieChart
    const pieData = bookings.reduce((acc: any, booking: any) => {
      const user = acc.find((u: any) => u.name === booking.title);
      if (user) {
        user.daysUsed += parseFloat(booking.bookedDays);
      } else {
        acc.push({
          name: booking.title,
          daysUsed: parseFloat(booking.bookedDays),
        });
      }
      return acc;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Aggregate data by user and month for BarChart
    const userDetailsData = bookings.reduce((acc: any, booking: any) => {
      const userIndex = acc.findIndex((u: any) => u.id === booking.userId);

      const bookingMonth = new Date(booking.start).toLocaleString("default", {
        month: "long",
      });

      if (userIndex !== -1) {
        const existingMonth = acc[userIndex].vacationHistory.find(
          (item: any) => item.month === bookingMonth
        );

        if (existingMonth) {
          existingMonth.daysUsed += parseFloat(booking.bookedDays);
        } else {
          acc[userIndex].vacationHistory.push({
            month: bookingMonth,
            daysUsed: parseFloat(booking.bookedDays),
          });
        }
      } else {
        acc.push({
          id: booking.userId,
          name: booking.title,
          daysUsed: parseFloat(booking.bookedDays),
          periods: booking.description,
          vacationHistory: [
            {
              month: bookingMonth,
              daysUsed: parseFloat(booking.bookedDays),
            },
          ],
        });
      }
      return acc;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    setData(pieData);
    setUserDetails(userDetailsData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (timePeriod) {
        fetchRealData(timePeriod);
      } else if (dateRange[0] && dateRange[1]) {
        fetchRealData("range", dateRange);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePeriod, dateRange]);

  // eslint-disable-next-line
  const handleTimePeriodChange = (event: any) => {
    setTimePeriod(event.target.value);
    setDateRange([null, null]); // Clear date range when time period is selected
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
    setSearchTerm("");
  };

  const filteredUserDetails =
    searchTerm.length > 0
      ? userDetails.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : userDetails;
  return (
    <>
      <Box className="reports-header">
        <Header />
      </Box>
      <Box className="reports-content">
        <Box p={4}>
          {/* Tabs for switching between Summary and User Vacation Details */}
          <Tabs
            sx={{ marginBottom: 3, borderBottom: "1px solid gray" }}
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="report tabs"
          >
            <Tab label="Summary View" />
            <Tab label="User Vacation Details" />
          </Tabs>

          <Grid container spacing={4}>
            {/* Conditionally render PieChart or User Vacation Details based on selected tab */}
            {tabIndex === 0 ? (
              <Grid item xs={12} md={12} lg={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Vacation Days Used by Users
                    </Typography>
                    <ResponsiveContainer
                      className="pie-contrainer"
                      width="100%"
                      height={500}
                    >
                      <PieChart>
                        <Pie
                          data={data}
                          dataKey="daysUsed"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          fill="#8884d8"
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} days used`,
                            `${props.payload.name}`,
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  label="Search by user name"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ marginBottom: 5 }}
                />
                <Grid container spacing={2}>
                  {filteredUserDetails.length > 0 ? (
                    filteredUserDetails.map((user) => (
                      <Grid item xs={12} key={user.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography>
                              Total Days Used:{" "}
                              {user.vacationHistory.reduce(
                                (sum: any, month: any) => sum + month.daysUsed,
                                0
                              )}
                            </Typography>
                            <Typography>Periods: {user.periods}</Typography>

                            <ResponsiveContainer width="100%" height={150}>
                              <BarChart data={user.vacationHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <RechartsTooltip />
                                <Bar dataKey="daysUsed" fill="#82ca9d" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body1">No users found.</Typography>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Reports;
