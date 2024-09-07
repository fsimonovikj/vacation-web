import React from "react";
import { Box, Typography, Container } from "@mui/material";

const VideoSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "600px", lg: "min(calc(100vh - 2rem), 2000px)" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: "30px",
        margin: "16px",
      }}
    >
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/video/video.mp4" type="video/mp4" />
        <source src="/video/video.webm" type="video/webm" />
        {/* <source src="/leave-video.mp4" type="video/mp4" /> */}
        {/* <source src="/leave-video.webm" type="video/webm" /> */}
        {/* <source
          src="https://stream.mux.com/b00Wa3K4QrfmgUQjps01vkrgWCfCT4EVfXlr1eDWC00288/high.mp4"
          type="video/mp4"
        />
        <source
          src="https://stream.mux.com/b00Wa3K4QrfmgUQjps01vkrgWCfCT4EVfXlr1eDWC00288/high.webm"
          type="video/webm"
        /> */}
        Your browser does not support the video tag.
      </Box>

      {/* Overlay Text and Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
          Manage Your Free Days from Work
        </Typography>
        <Typography variant="h6" component="p" maxWidth="lg" margin="auto">
          Keep track of your booked leave dates and request time off
          effortlessly.
        </Typography>
      </Container>

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(77.84% 125.76% at 77.74% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default VideoSection;
