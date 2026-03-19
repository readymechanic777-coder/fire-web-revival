import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ThemesSection from "@/components/ThemesSection";
import HackathonSection from "@/components/HackathonSection";
import GallerySection from "@/components/GallerySection";
import SponsorsSection from "@/components/SponsorsSection";
import PartnersSection from "@/components/PartnersSection";
import FAQSection from "@/components/FAQSection";
import WelcomeSection from "@/components/WelcomeSection";
import Footer from "@/components/Footer";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";
import ScrollFrameAnimation from "@/components/ScrollFrameAnimation";
import ScrollTurtleCompanion from "@/components/ScrollTurtleCompanion";

const Index = () => {
  return (<div className="min-h-screen bg-background scroll-smooth overflow-x-hidden">
    <Navbar />
    <ScrollTurtleCompanion />
    <DeepOceanWrapper>
      <main className="relative z-10">
        <ScrollFrameAnimation>
          <HeroSection />
        </ScrollFrameAnimation>
        <AboutSection />
        <ThemesSection />
        <HackathonSection />
        <GallerySection />
        <SponsorsSection />
        <PartnersSection />
        <FAQSection />
        <WelcomeSection />
      </main>
      <Footer />
    </DeepOceanWrapper>
  </div>);
};
export default Index;
