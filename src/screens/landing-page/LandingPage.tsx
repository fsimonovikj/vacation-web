import VideoSection from "./sections/VideoSection";
import PreviewImageSection from "./sections/PreviewImageSection";
import BenefitsSection from "./sections/BenefitsSection";
import FAQSection from "./sections/FAQSection";
import Footer from "./sections/Footer";
import { Box } from "@mui/material";
import LandingHeader from "./sections/LandingHeader";

const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f7",
      }}
    >
      <LandingHeader />
      <VideoSection />
      <PreviewImageSection />
      <BenefitsSection />
      <FAQSection />
      <Footer />
    </Box>
  );
};

export default LandingPage;
