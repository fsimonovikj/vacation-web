import React, { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import "../styles/index.scss"; // Import the styles

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerThreshold = documentHeight - windowHeight - 50; // Adjust the threshold value

      if (scrollPosition > footerThreshold) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      {/* Top Section */}
      <Box className="top-section">
        <Box className="content-container">
          <Typography variant="h2" className="cta-heading">
            Cost-effective, reliable, and used by hundreds of companies today
          </Typography>
          <Link
            href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Get started
          </Link>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box className={`footer-section ${showFooter ? "visible" : ""}`}>
        <Box className="content">
          {/* Footer Left Section */}
          <Box className="left-section">
            <Typography variant="body2">
              © 2024 OdmorCo Company. All rights reserved.
            </Typography>
            <Link href="/privacy-policy" className="link">
              Privacy Policy
            </Link>
          </Box>

          {/* Footer Right Section */}
          <Box className="right-section">
            <Link href="mailto:sales@odmor.co" className="link">
              sales@odmor.co
            </Link>
            <Link
              href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Book a demo
            </Link>
            <Link
              href="https://www.linkedin.com/company/odmorco"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              LinkedIn
            </Link>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
