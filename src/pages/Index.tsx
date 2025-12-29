import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ThemesSection from "@/components/ThemesSection";
import HackathonSection from "@/components/HackathonSection";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ThemesSection />
      <HackathonSection />
      <GallerySection />
    </div>
  );
};

export default Index;
