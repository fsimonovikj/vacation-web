import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "../styles/index.scss";

const LandingHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);
      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <Box
      component="header"
      className={`landing-header ${!isVisible ? "hidden" : ""}`}
    >
      <a href="/" className="logo">
        ODMORCO
      </a>
      <a
        className="demo-button"
        // TODO: Update the href attribute with your Calendly link
        href="/"
        // href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
      >
        Book a demo
      </a>
    </Box>
  );
};

export default LandingHeader;
