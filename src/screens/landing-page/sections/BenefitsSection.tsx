import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import "../styles/index.scss"; // Global SCSS file

const BenefitsSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video");
          if (entry.isIntersecting) {
            entry.target.classList.add("inView");
            if (video) {
              video.play();
            }
          } else {
            entry.target.classList.remove("inView");
            if (video) {
              video.pause();
              video.currentTime = 0; // Reset video to the beginning
            }
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold for when the video should play
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
            <img src="benefits/bulb.svg" alt="icon" className="card-icon" />
            <Typography variant="h4" className="card-title">
              Easy Online Booking
            </Typography>
            <Typography variant="body1" className="card-text">
              Book your vacation days effortlessly from any device with our
              user-friendly interface.
            </Typography>
          </Box>
          <Box className="video-container">
            <video
              className="benefits-video"
              src="/benefits-video/video1.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </Box>
        </Box>

        {/* Card 2: Calendar Integration */}
        <Box
          ref={(el) => {
            cardsRef.current[1] = el as HTMLDivElement;
          }}
          className="card"
        >
          <Box className="card-content">
            <img src="benefits/calendar.svg" alt="icon" className="card-icon" />
            <Typography variant="h4" className="card-title">
              Calendar Integration
            </Typography>
            <Typography variant="body1" className="card-text">
              Sync your vacation days with your calendar to avoid conflicts and
              plan your holidays better.
            </Typography>
          </Box>
          <Box className="video-container">
            <video
              className="benefits-video"
              src="/benefits-video/video2.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </Box>
        </Box>

        {/* Card 3: Secure Data Storage */}
        <Box
          ref={(el) => {
            cardsRef.current[2] = el as HTMLDivElement;
          }}
          className="card card-secure"
        >
          <Box className="card-content">
            <img src="benefits/padlock.svg" alt="icon" className="card-icon" />
            <Typography variant="h4" className="card-title">
              Secure Data Storage
            </Typography>
            <Typography variant="body1" className="card-text">
              Compliant data security and storage according to industry
              standards.
            </Typography>
          </Box>

          <Box className="video-container">
            <video
              className="benefits-video"
              src="/benefits-video/video3.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </Box>
        </Box>

        {/* Card 4: Reports and Statistics */}
        <Box
          ref={(el) => {
            cardsRef.current[3] = el as HTMLDivElement;
          }}
          className="card card-reports"
        >
          <Box className="card-content">
            <img src="benefits/reports.svg" alt="icon" className="card-icon" />
            <Typography variant="h4" className="card-title">
              Reports & Statistics
            </Typography>
            <Typography variant="body1" className="card-text">
              Access detailed reports and statistics to track your vacation
              usage and gain insights for future planning.
            </Typography>
          </Box>

          <Box className="video-container">
            <video
              className="benefits-video"
              src="/benefits-video/video4.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BenefitsSection;
