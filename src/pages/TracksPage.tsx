import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemesSection from "@/components/ThemesSection";

const TracksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ThemesSection />
      </div>
      <Footer />
    </div>
  );
};

export default TracksPage;
