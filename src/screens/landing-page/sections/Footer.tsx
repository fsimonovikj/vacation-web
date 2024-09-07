import React, { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";

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
    <footer className="flex flex-col transition-all">
      {/* Top Section */}
      <Box
        sx={{
          backgroundColor: "#fff",
          py: { xs: 8, lg: 16 },
          px: { xs: 4, lg: 12 },
          textAlign: "center",
          marginBottom: { xs: "390px", lg: "300px" },
          overflow: "hidden",
        }}
      >
        <Box
          className="mx-auto flex flex-col items-center gap-6 lg:gap-12 "
          sx={{
            display: "inline-block",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              maxWidth: { xs: "400px", lg: "960px" },
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Cost-effective, reliable, and used by hundreds of companies today
          </Typography>
          <Link
            href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: "none",
              backgroundColor: "#3f51b5",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
          >
            Get started
          </Link>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: "#3f51b5",
          color: "#fff",
          minHeight: { xs: "390px", lg: "300px" },
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: showFooter ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          width: "100%",
          zIndex: 10,
        }}
        className="footer-hide"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            py: { xs: 8, lg: 16 },
            px: { xs: 4, lg: 12 },
            position: "relative",
          }}
        >
          {/* Footer Left Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography variant="body2">
              © 2024 OdmorCo Company. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="/privacy-policy"
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Privacy Policy
              </Link>
            </Box>
          </Box>

          {/* Footer Right Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Link
              href="mailto:sales@odmor.co"
              sx={{
                textDecoration: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              sales@odmor.co
            </Link>
            <Link
              href="https://calendly.com/scriptrunner-sales/30min?month=2024-05"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Book a demo
            </Link>
            <Link
              href="https://www.linkedin.com/company/scriptrunnerai"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Linkedin
            </Link>
          </Box>

          {/* Footer Logo */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
            }}
          >
            <img
              src="/icons/footer-logo.svg"
              alt="Footer Logo"
              style={{ width: "100%" }}
            />
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
