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

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth overflow-x-hidden">
      <Navbar />
      <main className="contain-paint">
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
