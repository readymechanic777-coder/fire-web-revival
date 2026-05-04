import { useState } from "react";
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
import SmoothScroll from "@/components/SmoothScroll";
import CinematicDiveIntro from "@/components/CinematicDiveIntro";
import { ParallaxSection } from "@/components/Parallax";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {!introDone && <CinematicDiveIntro onDone={() => setIntroDone(true)} />}
      <SmoothScroll />
      <Navbar />
      <ScrollTurtle3D />
      <DeepOceanWrapper>
        <main className="relative z-10">
          <ScrollFrameAnimation>
            <HeroSection />
          </ScrollFrameAnimation>

          <ParallaxSection variant="zoom">
            <LazySection animation="fade-up">
              <AboutSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="mask">
            <LazySection animation="fade-left" delay={0.1}>
              <ThemesSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="tilt">
            <LazySection animation="scale">
              <HackathonSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="zoom" intensity={0.85}>
            <LazySection animation="fade-right" delay={0.1}>
              <GallerySection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="rise">
            <LazySection animation="fade-up">
              <SponsorsSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="rise" intensity={0.7}>
            <LazySection animation="fade-up" delay={0.1}>
              <PartnersSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="mask">
            <LazySection animation="scale">
              <FAQSection />
            </LazySection>
          </ParallaxSection>

          <ParallaxSection variant="zoom">
            <LazySection animation="fade-up">
              <WelcomeSection />
            </LazySection>
          </ParallaxSection>
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default Index;
