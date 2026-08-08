import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemesSection from "@/components/ThemesSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";

const TracksPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <ThemesSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default TracksPage;
