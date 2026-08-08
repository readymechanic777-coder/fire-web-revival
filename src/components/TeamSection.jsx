import { motion } from "framer-motion";
import TeamCard from "./TeamCard";

const teamMembers = [
  { id: 1, role: 'Convener', name: 'G. Chinmay', dept: 'CSM' },
  { id: 2, role: 'Co Convener', name: 'Niranjan Muddada', dept: 'EEE' },
  { id: 3, role: 'Co Convener', name: 'Smruti Sabujima', dept: 'CSE' },
  { id: 4, role: 'Corporate Relations', name: 'Ruppa Kritika', dept: 'CSE' },
  { id: 5, role: 'Corporate Relations', name: 'Kanthuri Yamini', dept: 'IT' },
  { id: 6, role: 'Finance', name: 'Korrayi Yuvraju', dept: 'CSD' },
  { id: 7, role: 'Promotions', name: 'Jaddu Pavani', dept: 'ECE' },
  { id: 8, role: 'Promotions', name: 'Sanapala Pavan Kumar', dept: 'CIVIL' },
  { id: 9, role: 'Promotions', name: 'Nalla Madhulatha', dept: 'CSM' },
  { id: 10, role: 'Design', name: 'Magam Blesson', dept: 'CSE' },
  { id: 11, role: 'Design', name: 'Chennamsetty Chaitanya Sai Koushik', dept: 'IT' },
  { id: 12, role: 'Media', name: 'R. Srinivas Naidu', dept: 'CSM' },
  { id: 13, role: 'Media', name: 'Nadiminti kali prasanna', dept: 'ECE' },
  { id: 14, role: 'Outreach', name: 'Abdul Rehman', dept: 'IT' },
  { id: 15, role: 'Outreach', name: 'Bonthu Yamini Gayatri', dept: 'ECE' },
  { id: 16, role: 'Outreach', name: 'Sripurushottama Mohan Sai', dept: 'CSE' },
  { id: 17, role: 'Sponsorships', name: 'Potnuru Joshitha', dept: 'IT' },
  { id: 18, role: 'Sponsorships', name: 'Medepalli Vamsi', dept: 'CSE' },
  { id: 19, role: 'Art & Creative', name: 'Tampa Likhitha', dept: 'CSM' },
  { id: 20, role: 'Art & Creative', name: 'Yogendra korada', dept: 'ECE' },
  { id: 21, role: 'Entertainment', name: 'Korla Niharika', dept: 'CSM' },
  { id: 22, role: 'Entertainment', name: 'Macharala Anand Kumar', dept: 'IT' },
  { id: 23, role: 'Web', name: 'Sanapala Vinod Kumar', dept: 'CSE' },
  { id: 24, role: 'Tech Team', name: 'Tudumu Omkar', dept: 'ECE' },
  { id: 25, role: 'Tech Team', name: 'Allu Dhilleswara Rao', dept: 'CSM' },
  { id: 26, role: 'Food & Logistics', name: 'Gorribanda Tarun Kumar', dept: 'IT' },
  { id: 27, role: 'Food & Logistics', name: 'Balli Sai Kiran', dept: 'CSE' },
  { id: 28, role: 'Travel', name: 'Gunttamukkala Santosh Kumar', dept: 'IT' },
  { id: 29, role: 'Travel', name: 'Sahukari Sidhartha', dept: 'MCA' },
  { id: 30, role: 'Hospitality', name: 'Behera Samira Patnaik', dept: 'ECE' },
  { id: 31, role: 'Hospitality', name: 'Sai Sravan', dept: 'IT' },
  { id: 32, role: 'Registration', name: 'Annepu Pujitha', dept: 'CSM' },
  { id: 33, role: 'Registration', name: 'Kintali Reshma Sree', dept: 'IT' },
  { id: 34, role: 'Registration', name: 'Gudla Swaroopa', dept: 'IT' },
  { id: 35, role: 'Registration', name: 'Killamsetti Venkata Sree Sai charishma', dept: 'CSE' },
  { id: 36, role: 'Quality Assurance', name: 'Pavitra Pasala', dept: 'EEE' },
  { id: 37, role: 'Quality Assurance', name: 'Reddy Durga Pavan Kumar', dept: 'CSE' },
  { id: 38, role: 'Reporting', name: 'Inkuri Benarji Kumar', dept: 'CSD' },
  { id: 39, role: 'Reporting', name: 'Vakamullu Tejaswi', dept: 'CSE' },
  { id: 40, role: 'Operation', name: 'Pragada Surya Santosh', dept: 'IT' },
  { id: 41, role: 'Operation', name: 'Kola Vivekanandu', dept: 'CSM' },
];

const TeamSection = () => {
  return (
    <section className="relative py-24 overflow-hidden min-h-screen" id="team">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] tracking-wide mb-6">
            OUR TEAM
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="w-full"
              style={{ perspective: "1000px" }}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
