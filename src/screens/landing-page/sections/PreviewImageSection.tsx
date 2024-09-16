import { useEffect, useRef, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import "../styles/index.scss";

const PreviewImageSection = () => {
  const [intersectionRatio, setIntersectionRatio] = useState(0); // Track the exact intersection ratio
  const sectionRef = useRef<HTMLDivElement | null>(null); // Ensure the ref is typed correctly

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIntersectionRatio(entry.intersectionRatio); // Directly track the ratio
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) } // Use fine-grained thresholds from 0 to 1
    );

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  // Function to calculate smooth transformations
  const getTransformStyle = () => {
    const scale = 1 + 0.1 * intersectionRatio; // Scale from 1 to 1.1
    const rotateX = 20 - 20 * intersectionRatio; // RotateX from 20deg to 0deg
    return `scale(${scale}) rotateX(${rotateX}deg)`;
  };

  return (
    <div ref={sectionRef} className="preview-section">
      {/* 3D Image Effect */}
      <div className="perspective-box">
        <div
          className="inner-box"
          style={{
            transform: getTransformStyle(), // Apply smooth transformation
            transition: "transform 0.2s ease-out", // Smooth transition
          }}
        >
          <img
            src="images/tablet-mockup.webp"
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
