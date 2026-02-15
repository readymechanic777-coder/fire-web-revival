import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideIn } from '@/lib/motion';
import { Phone, Mail, MapPin, Droplets, X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, to) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      if (to.startsWith('#')) {
        const element = document.getElementById(to.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate(to);
      }
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '#about' },
    { name: 'Hackathon', to: '#hackathon' },
    { name: 'FAQ', to: '#faq' },
    { name: 'Team', to: '/team' },
    { name: 'Tracks', to: '/tracks' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-panel-strong' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 group z-[60]">
              <Droplets className="w-8 h-8 text-primary group-hover:animate-flicker" />
              <span className="font-display font-bold text-xl text-gradient-liquid">
                AVISHKAAR S4
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-[60] inline-flex items-center justify-center p-2 rounded-lg text-primary hover:text-primary/80 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl overflow-y-auto"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 min-h-[calc(100vh-8rem)]">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col justify-center"
                >
                  <nav className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.div key={item.name} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
                        <a
                          href={item.to}
                          onClick={(e) => handleLinkClick(e, item.to)}
                          className="group flex items-center text-2xl md:text-4xl font-display font-bold text-foreground hover:text-primary transition-colors duration-300"
                        >
                          <motion.span className="text-primary mr-4 opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ x: 5 }}>→</motion.span>
                          {item.name}
                        </a>
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
                    <a
                      href="https://unstop.com/o/3C4O1aP?lb=O4B2h3r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Register Now
                      <Droplets className="w-5 h-5" />
                    </a>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-col justify-center"
                >
                  <div className="glass-panel rounded-2xl p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-liquid mb-4">Avishkaar Season 4</h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                      Avishkaar is a 48-hour innovation marathon that challenges bright minds to turn bold ideas into real-world solutions. After three successful seasons, Avishkaar returns bigger and better — now in two phases: a 24-hour online hackathon and an on-campus 48-hour grand finale.
                    </p>

                    <div className="flex gap-4 mb-8">
                      {['Instagram', 'LinkedIn', 'YouTube', 'WhatsApp'].map((platform) => (
                        <a key={platform} href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors" aria-label={platform}>
                          <span className="text-xs font-bold">{platform[0]}</span>
                        </a>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-display font-bold text-foreground">Contact Us</h3>
                      <a href="tel:+917386759626" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4 text-primary" /><span className="text-sm">K. Kranthi Kiran: +91 7386759626</span>
                      </a>
                      <a href="tel:+919866854604" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4 text-primary" /><span className="text-sm">S. Vinod Kumar: +91 9866854604</span>
                      </a>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary mt-0.5" /><span className="text-sm">Aditya Institute of Technology and Management, Tekkali</span>
                      </div>
                      <a href="mailto:avishkaar@adityatekkali.edu.in" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="w-4 h-4 text-primary" /><span className="text-sm">avishkaar@adityatekkali.edu.in</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
