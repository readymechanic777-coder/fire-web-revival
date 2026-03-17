import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User } from "lucide-react";
const teamMembers = [
    { name: "K. Kranthi Kiran", role: "Coordinator", department: "CSE" },
    { name: "S Vinod Kumar", role: "Technical Lead", department: "CSE" },
    { name: "Bhargav", role: "Developer", department: "SSC" },
    { name: "Vinod Kumar", role: "Developer", department: "SSC" },
];
const TeamPage = () => {
    return (<div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 min-h-screen">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-water mb-4">
                Our Team
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the passionate individuals behind AVISHKAAR S4
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (<motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <div className="bg-card border border-primary/20 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <User className="w-10 h-10 text-primary"/>
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm mb-1">{member.role}</p>
                    <p className="text-muted-foreground text-xs">{member.department}</p>
                  </div>
                </motion.div>))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>);
};
export default TeamPage;
