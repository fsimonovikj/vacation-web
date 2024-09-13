import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const LandingHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // If scrolling down, hide the header
        setIsVisible(false);
      } else {
        // If scrolling up, show the header
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);

      // Cleanup function
      return () => {
        window.removeEventListener("scroll", controlHeader);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <Box
      component="header"
      className="flex items-center justify-between py-2 px-6 fixed left-1/2 top-6 z-20 w-[calc(100%-3rem)] lg:w-[640px] min-w-[300px] rounded-full transition-all duration-500 ease-in-out"
      sx={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
        opacity: isVisible ? 1 : 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
        backdropFilter: "blur(10px)", // For blur effect
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Shadow for elevation
        color: "#fff", // Text color for better contrast
        position: "fixed",
        top: "32px",
        left: "50%",
        zIndex: 20,
      }}
    >
      <a href="/" className="text-lg font-bold">
        {/* Add your logo SVG here */}
        Your Logo
      </a>
      <a
        className="relative body-s whitespace-nowrap flex items-center gap-1 rounded-full py-2 px-4 bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-300 ease-in-out"
        href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
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
