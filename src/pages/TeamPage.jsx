import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import DeepOceanWrapper from "@/components/DeepOceanWrapper";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <DeepOceanWrapper>
        <main className="relative z-10 pt-20">
          <TeamSection />
        </main>
        <Footer />
      </DeepOceanWrapper>
    </div>
  );
};

export default TeamPage;
