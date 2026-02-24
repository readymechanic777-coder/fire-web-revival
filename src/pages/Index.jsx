import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ThemesSection from "@/components/ThemesSection";
import HackathonSection from "@/components/HackathonSection";
import GallerySection from "@/components/GallerySection";
import SponsorsSection from "@/components/SponsorsSection";
import PartnersSection from "@/components/PartnersSection";
import ScheduleSection from "@/components/ScheduleSection";
import FAQSection from "@/components/FAQSection";
import WelcomeSection from "@/components/WelcomeSection";
import Footer from "@/components/Footer";
import OceanScene from "@/components/ocean/OceanScene";
import OceanDepthOverlay from "@/components/ocean/OceanDepthOverlay";
import CursorRipple from "@/components/CursorRipple";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden relative">
      {/* Global cursor water ripple effect */}
      <CursorRipple />
      
      {/* Ocean background layers */}
      <OceanDepthOverlay scrollProgress={scrollProgress} />
      <OceanScene scrollProgress={scrollProgress} />
      
      <Navbar />
      <main className="contain-paint relative z-[5]">
        <HeroSection />
        <AboutSection />
        <ThemesSection />
        <HackathonSection />
        <GallerySection />
        <ScheduleSection />
        <SponsorsSection />
        <PartnersSection />
        <FAQSection />
        <WelcomeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
