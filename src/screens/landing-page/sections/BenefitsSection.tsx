import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import "../styles/index.scss"; // Global SCSS file

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

    const currentCards = cardsRef.current; // Copy the ref value into a local variable

    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <Box className="benefits-section" data-section="section.stackedCards">
      {/* Section Header */}
      <Box className="section-header">
        <Typography variant="caption" className="caption">
          BENEFITS
        </Typography>
        <Typography variant="h3" className="title">
          Streamline Your Vacation Booking Process
        </Typography>
      </Box>

      {/* Benefit Cards */}
      <Box id="cards" className="cards">
        {/* Card 1: Easy Online Booking */}
        <Box
          ref={(el) => {
            cardsRef.current[0] = el as HTMLDivElement;
          }}
          className="card"
        >
          <Box className="card-content">
            <img src="benefits/bulb.svg" alt="icon" className="icon" />
            <Typography variant="h4" className="card-title">
              Easy Online Booking
            </Typography>
            <Typography variant="body1" className="card-text">
              Book your vacation days effortlessly from any device with our
              user-friendly interface.
            </Typography>
          </Box>
          <Box
            className="card-image"
            style={{
              backgroundImage: `url('/images/booking-benefit.svg')`,
            }}
          />
        </Box>

        {/* Card 2: Calendar Integration */}
        <Box
          ref={(el) => {
            cardsRef.current[1] = el as HTMLDivElement;
          }}
          className="card"
        >
          <Box className="card-content">
            <Typography variant="h4" className="card-title">
              Calendar Integration
            </Typography>
            <Typography variant="body1" className="card-text">
              Sync your vacation days with your calendar to avoid conflicts and
              plan your holidays better.
            </Typography>
          </Box>
          <Box
            className="card-image"
            style={{
              backgroundImage: `url('/images/calendar-benefit.svg')`,
            }}
          />
        </Box>

        {/* Card 3: Secure Data Storage */}
        <Box
          ref={(el) => {
            cardsRef.current[2] = el as HTMLDivElement;
          }}
          className="card card-secure"
        >
          <Box className="card-content">
            <Box className="secure-card">
              <img
                src="https://scriptrunner.ai/icon-picker/check.svg"
                alt="icon"
                className="icon"
              />
              <Typography variant="h4" className="card-title">
                Secure Data Storage
              </Typography>
              <Typography variant="body1" className="card-text">
                Compliant data security and storage according to industry
                standards.
              </Typography>
            </Box>
          </Box>

          <Box className="main-image">
            <img
              src="https://cdn.sanity.io/images/69a0nmw1/production/937dd81045086aedd4cdc1180a8f6174501e0992-3600x2400.jpg?w=1500"
              alt="Main"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BenefitsSection;
