import { useEffect, useRef, useState } from "react";
import { Typography, Button, Box } from "@mui/material";

import "../styles/index.scss";

const PreviewImageSection = () => {
  const [scrollPosition, setScrollPosition] = useState("initial");
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ensure the ref is typed correctly

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const intersectionRatio = entry.intersectionRatio;

        if (intersectionRatio >= 0.6) {
          setScrollPosition("final");
        } else if (intersectionRatio >= 0.3) {
          setScrollPosition("intermediate");
        } else {
          setScrollPosition("initial");
        }
      },
      { threshold: [0, 0.3, 0.6] }
    );

    const currentSectionRef = sectionRef.current; // Copy the current value of sectionRef

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const getTransformStyle = () => {
    if (scrollPosition === "final") {
      return "scale(1.1) rotateX(0deg)";
    } else if (scrollPosition === "intermediate") {
      return "scale(1.05) rotateX(10deg)";
    } else {
      return "scale(1) rotateX(20deg)";
    }
  };

  return (
    <div ref={sectionRef} className="preview-section">
      {/* 3D Image Effect */}
      <div className="perspective-box">
        <div
          className="inner-box"
          style={{
            transform: getTransformStyle(),
          }}
        >
          <img
            src="https://cdn.sanity.io/images/69a0nmw1/production/abde3626e50b38190694cce42822e1f8a7706b93-3840x2770.png"
            alt="App screen"
            className="image"
          />
        </div>
      </div>

      <Box className="cta">
        {/* Call to Action Text */}
        <Typography className="cta-heading">
          Modern logistics software that creates efficiencies in your workflow.
        </Typography>
        <Typography variant="body1" className="cta-text">
          Save labour hours with a secure and compliant solution built for
          optimal patient outcomes.
        </Typography>
      </Box>

      {/* Call to Action Button */}
      <Button
        variant="contained"
        href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button"
      >
        Get Started
      </Button>
    </div>
  );
};

export default PreviewImageSection;
