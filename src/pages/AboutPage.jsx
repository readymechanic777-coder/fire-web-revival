import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <AboutSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default AboutPage;
