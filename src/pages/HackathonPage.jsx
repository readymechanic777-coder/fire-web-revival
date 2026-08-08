import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HackathonSection from "@/components/HackathonSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";

const HackathonPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <HackathonSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default HackathonPage;
