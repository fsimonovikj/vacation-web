import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

const BenefitsSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inView");
          } else {
            entry.target.classList.remove("inView");
          }
        });
      },
      { threshold: 0.5 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 8, lg: 16 },
        px: { xs: 2, lg: 12 },
        textAlign: "center",
        maxWidth: "1200px",
        mx: "auto",
      }}
      data-section="section.stackedCards"
    >
      {/* Section Header */}
      <Box sx={{ mb: { xs: 6, lg: 12 } }}>
        <Typography variant="caption" sx={{ color: "#3f51b5", mb: 1 }}>
          BENEFITS
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333" }}>
          Streamline Your Vacation Booking Process
        </Typography>
      </Box>

      {/* Benefit Cards */}
      <Box id="cards" sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Card 1: Easy Online Booking */}
        <Box
          ref={(el) => {
            cardsRef.current[0] = el as HTMLDivElement;
          }}
          className="card"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            minHeight: "600px",
            overflow: "hidden",
            borderRadius: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#f9f9f9",
            position: { lg: "sticky" },
            top: "100px",
            opacity: 0.3,
            transform: "scale(0.95)",
            transition: "transform 0.7s ease, opacity 0.7s ease",
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: { xs: "24px", lg: "48px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#3f51b5" }}>
              Easy Online Booking
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              Book your vacation days effortlessly from any device with our
              user-friendly interface.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: `url('/images/booking-benefit.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
            }}
          />
        </Box>

        {/* Card 2: Calendar Integration */}
        <Box
          ref={(el) => {
            cardsRef.current[1] = el as HTMLDivElement;
          }}
          className="card"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            minHeight: "600px",
            overflow: "hidden",
            borderRadius: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#f9f9f9",
            position: { lg: "sticky" },
            top: "100px",
            opacity: 0.3,
            transform: "scale(0.95)",
            transition: "transform 0.7s ease, opacity 0.7s ease",
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: { xs: "24px", lg: "48px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#3f51b5" }}>
              Calendar Integration
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              Sync your vacation days with your calendar to avoid conflicts and
              plan your holidays better.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: `url('/images/calendar-benefit.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "300px",
            }}
          />
        </Box>

        {/* Card 3: Secure Data Storage */}
        <Box
          ref={(el) => {
            cardsRef.current[2] = el as HTMLDivElement;
          }}
          className="card"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            minHeight: "600px",
            overflow: "hidden",
            borderRadius: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#f5f5f5",
            position: { lg: "sticky" },
            top: "100px",
            opacity: 1, // Fully opaque
            transition: "transform 0.7s ease",
          }}
        >
          {/* Left Side Content */}
          <Box
            sx={{
              flex: 1,
              padding: { xs: "24px", lg: "48px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                height: "50%",
              }}
            >
              <img
                src="https://scriptrunner.ai/icon-picker/check.svg"
                alt="icon"
                style={{ width: "50px", marginBottom: "20px" }}
              />
              <Typography variant="h4" sx={{ mb: 2, color: "#3f51b5" }}>
                Secure Data Storage
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", maxWidth: "450px" }}
              >
                Compliant data security and storage according to industry
                standards.
              </Typography>
            </Box>
          </Box>

          {/* Right Side Image */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              padding: { xs: "0px 16px", lg: "0px 48px" },
            }}
          >
            {/* Floating Images */}
            <img
              src="/benefits/stacked-card-security-1.svg"
              alt="decorative image 1"
              style={{
                position: "absolute",
                top: "10%",
                left: "-10%",
                width: "30%",
                zIndex: 1,
              }}
            />

            {/* Main Image */}
            <Box
              sx={{
                position: "absolute",
                top: "30%",
                height: "60%",
                width: "80%",
                borderRadius: "20px",
                overflow: "hidden",
                borderBottomRightRadius: "0",
              }}
            >
              <img
                src="https://cdn.sanity.io/images/69a0nmw1/production/937dd81045086aedd4cdc1180a8f6174501e0992-3600x2400.jpg?w=1500"
                alt="Main"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BenefitsSection;
