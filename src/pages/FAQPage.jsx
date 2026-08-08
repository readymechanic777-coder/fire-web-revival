import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <FAQSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default FAQPage;
