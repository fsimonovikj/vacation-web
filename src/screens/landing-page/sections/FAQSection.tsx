import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, lg: 16 },
        px: { xs: 2, lg: 12 },
        maxWidth: "1200px",
        mx: "auto",
      }}
      data-section="section.faq"
    >
      {/* Two-column layout with Grid */}
      <Grid container spacing={4}>
        {/* Left Column: FAQ Header */}
        <Grid item xs={12} md={5}>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#ff5722", mb: 1, fontSize: "20px" }} // Larger font for "FAQ"
            >
              FAQ
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#333",
                mb: 2,
                fontSize: "48px",
              }} // Increased font size for main heading
            >
              Questions? Answers.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#666", fontSize: "22px" }} // Larger font for body text
            >
              We have a lot to offer, here is a sneak peek
            </Typography>
          </Box>
        </Grid>

        {/* Right Column: FAQ Accordion */}
        <Grid item xs={12} md={7}>
          {/* FAQ Accordion List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Question 1 */}
            <Accordion
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: "16px" }}
              >
                <Typography variant="h6" sx={{ fontSize: "20px" }}>
                  How do I book free days from work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "18px" }}>
                  You can book your free days directly through our platform by
                  selecting the dates you want and submitting a request.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 2 */}
            <Accordion
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: "16px" }}
              >
                <Typography variant="h6" sx={{ fontSize: "20px" }}>
                  Can I cancel or reschedule my booked days?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "18px" }}>
                  Yes, you can cancel or reschedule your booked days depending
                  on your company’s policy and availability.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 3 */}
            <Accordion
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: "16px" }}
              >
                <Typography variant="h6" sx={{ fontSize: "20px" }}>
                  What happens if my leave request is rejected?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "18px" }}>
                  If your leave request is rejected, you'll receive a
                  notification with the reason and may submit another request.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 4 */}
            <Accordion
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: "16px" }}
              >
                <Typography variant="h6" sx={{ fontSize: "20px" }}>
                  How many days in advance should I request leave?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "18px" }}>
                  It depends on your company’s policy, but generally, it's
                  recommended to submit your request at least 2 weeks in
                  advance.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 5 */}
            <Accordion
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                boxShadow: "none",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: "16px" }}
              >
                <Typography variant="h6" sx={{ fontSize: "20px" }}>
                  Can I track the status of my leave request?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "18px" }}>
                  Yes, you can track the status of your leave request directly
                  in your account under the "My Requests" section.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FaqSection;
