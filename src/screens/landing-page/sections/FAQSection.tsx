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
        py: { xs: 8, lg: 12 },
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
            <Typography className="faq-header">FAQ</Typography>
            <Typography className="faq-header-title">
              Questions? Answers.
            </Typography>
            <Typography variant="body1" className="faq-header-description">
              We have a lot to offer, here is a sneak peek
            </Typography>
          </Box>
        </Grid>

        {/* Right Column: FAQ Accordion */}
        <Grid item xs={10} md={7} sx={{}} className="faq-accordion-container">
          {/* FAQ Accordion List */}
          <Box className="faq-accordion-list">
            {/* Question 1 */}
            <Accordion className="faq-question">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="faq-accordion-summary"
              >
                <Typography className="faq-accordion-title">
                  How do I book free days from work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-accordion-details">
                  You can book your free days directly through our platform by
                  selecting the dates you want and submitting a request.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 2 */}
            <Accordion className="faq-question">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="faq-accordion-summary"
              >
                <Typography className="faq-accordion-title">
                  Can I cancel or reschedule my booked days?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-accordion-details">
                  Yes, you can cancel or reschedule your booked days depending
                  on your company’s policy and availability.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 3 */}
            <Accordion className="faq-question">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="faq-accordion-summary"
              >
                <Typography className="faq-accordion-title">
                  What happens if my leave request is rejected?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-accordion-details">
                  If your leave request is rejected, you'll receive a
                  notification with the reason and may submit another request.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 4 */}
            <Accordion className="faq-question">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="faq-accordion-summary"
              >
                <Typography className="faq-accordion-title">
                  How many days in advance should I request leave?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-accordion-details">
                  It depends on your company’s policy, but generally, it's
                  recommended to submit your request at least 2 weeks in
                  advance.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Question 5 */}
            <Accordion className="faq-question">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="faq-accordion-summary"
              >
                <Typography className="faq-accordion-title">
                  Can I track the status of my leave request?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-accordion-details">
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
