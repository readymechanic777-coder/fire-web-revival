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
import LazySection from "@/components/LazySection";
import ScrollTurtle3D from "@/components/ScrollTurtle3D";
import Fish3DSection from "@/components/Fish3DSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth overflow-x-hidden">
      <Navbar />
      <ScrollTurtle3D />
      <DeepOceanWrapper>
        <main className="relative z-10">
          <ScrollFrameAnimation>
            <HeroSection />
          </ScrollFrameAnimation>
          <LazySection animation="fade-up">
            <AboutSection />
          </LazySection>
          <LazySection animation="fade-left" delay={0.1}>
            <ThemesSection />
          </LazySection>
          <LazySection animation="scale">
            <Fish3DSection />
          </LazySection>
          <LazySection animation="scale">
            <HackathonSection />
          </LazySection>
          <LazySection animation="fade-right" delay={0.1}>
            <GallerySection />
          </LazySection>
          <LazySection animation="fade-up">
            <SponsorsSection />
          </LazySection>
          <LazySection animation="fade-up" delay={0.1}>
            <PartnersSection />
          </LazySection>
          <LazySection animation="scale">
            <FAQSection />
          </LazySection>
          <LazySection animation="fade-up">
            <WelcomeSection />
          </LazySection>
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default Index;
