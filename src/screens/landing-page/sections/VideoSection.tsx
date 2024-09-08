import React from "react";
import { Box, Typography, Container } from "@mui/material";
import "../styles/index.scss"; // Make sure to import your SCSS file

const VideoSection = () => {
  return (
    <Box className="video-section">
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        className="video-background"
      >
        <source src="/video/young-boy.mp4" type="video/mp4" />
        <source src="/video/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </Box>

      {/* Overlay Text and Content */}
      <Container className="overlay-content">
        <Typography className="overlay-heading" gutterBottom>
          Streamline your leave management with our HR solution.
        </Typography>
        <Typography className="overlay-text">
          Simplify the process of booking leave days and ensure seamless
          approvals and tracking for a more efficient workforce.
        </Typography>
      </Container>

      {/* Gradient Overlay */}
      <Box className="gradient-overlay" />
    </Box>
  );
};

export default VideoSection;
