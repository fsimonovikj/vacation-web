import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const PreviewImageSection = () => {
  const [scrollPosition, setScrollPosition] = useState("initial");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const intersectionRatio = entry.intersectionRatio;

        // Adjusting thresholds for smaller screens
        if (intersectionRatio >= 0.6) {
          setScrollPosition("final"); // Trigger final state earlier
        } else if (intersectionRatio >= 0.3) {
          setScrollPosition("intermediate"); // Intermediate state
        } else {
          setScrollPosition("initial"); // Initial state
        }
      },
      { threshold: [0, 0.3, 0.6] } // Lower thresholds for better visibility on smaller screens
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line
        observer.unobserve(sectionRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  const getTransformStyle = () => {
    if (scrollPosition === "final") {
      return "scale(1.1) rotateX(0deg)"; // Final transformation
    } else if (scrollPosition === "intermediate") {
      return "scale(1.05) rotateX(10deg)"; // Intermediate transformation
    } else {
      return "scale(1) rotateX(20deg)"; // Initial transformation
    }
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, lg: 16 },
        mx: "auto",
        textAlign: "center",
        maxWidth: { xs: "95%", lg: "80%" }, // Max width based on screen size
      }}
      data-section="section.callToAction"
    >
      {/* 3D Image Effect */}
      <Box
        sx={{
          perspective: "1000px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            transform: getTransformStyle(),
            transition: "transform 0.7s ease-out",
            width: "100%",
            maxWidth: { xs: "100%", lg: "1200px" }, // Responsive width
            height: { xs: "16rem", sm: "25rem", md: "35rem", lg: "40rem" }, // Responsive height
            overflow: "hidden",
            borderRadius: "20px",
            boxShadow:
              "0px 20px 40px rgba(0,0,0,0.1), 0px 30px 60px rgba(0,0,0,0.05)", // Enhanced box shadow
          }}
        >
          <img
            src="https://cdn.sanity.io/images/69a0nmw1/production/abde3626e50b38190694cce42822e1f8a7706b93-3840x2770.png"
            alt="App screen"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "initial",
            }}
          />
        </Box>
      </Box>

      {/* Call to Action Text */}
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 2, lg: 4 },
          color: "#3f51b5",
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "2rem" }, // Adjust font size for responsiveness
        }}
      >
        Modern prescription logistics software that creates efficiencies in your
        workflow.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "black",
          mb: { xs: 4, lg: 8 },
          maxWidth: { xs: "90%", lg: "60%" },
          mx: "auto",
          fontSize: { xs: "1rem", lg: "1.25rem" }, // Adjust font size for responsiveness
        }}
      >
        Save labour hours with a secure and compliant solution built for optimal
        patient outcomes.
      </Typography>

      {/* Call to Action Button */}
      <Button
        variant="contained"
        href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: "#3f51b5",
          padding: "10px 24px",
          fontSize: { xs: "14px", lg: "16px" }, // Adjust button font size
          borderRadius: "50px",
          "&:hover": {
            backgroundColor: "#303f9f",
          },
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default PreviewImageSection;
