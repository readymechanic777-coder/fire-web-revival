import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Flame, X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      if (to.startsWith('#')) {
        const element = document.getElementById(to.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate(to);
      }
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
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
      {/* Fixed Header Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-lg border-b border-primary/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group z-[60]">
              <Flame className="w-8 h-8 text-primary group-hover:animate-flicker" />
              <span className="font-display font-bold text-xl text-gradient-fire">
                AVISHKAAR S4
              </span>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-[60] inline-flex items-center justify-center p-2 rounded-lg text-primary hover:text-primary/80 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl overflow-y-auto"
          >
            {/* Fire Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 min-h-[calc(100vh-8rem)]">
                {/* Navigation Links */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col justify-center"
                >
                  <nav className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <a
                          href={item.to}
                          onClick={(e) => handleLinkClick(e, item.to)}
                          className="group flex items-center text-2xl md:text-4xl font-display font-bold text-foreground hover:text-primary transition-colors duration-300"
                        >
                          <motion.span
                            className="text-primary mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ x: 5 }}
                          >
                            →
                          </motion.span>
                          {item.name}
                        </a>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Register Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8"
                  >
                    <a
                      href="https://unstop.com/o/3C4O1aP?lb=O4B2h3r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Register Now
                      <Flame className="w-5 h-5" />
                    </a>
                  </motion.div>
                </motion.div>

                {/* Info Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-col justify-center"
                >
                  <div className="bg-card/50 border border-primary/20 rounded-2xl p-6 md:p-8">
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-fire mb-4">
                      Avishkaar Season 4
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                      Avishkaar is a 48-hour innovation marathon that challenges bright minds to turn bold ideas into real-world solutions. After three successful seasons, Avishkaar returns bigger and better — now in two phases: a 24-hour online hackathon and an on-campus 48-hour grand finale.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4 mb-8">
                      <a
                        href="#"
                        className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                        aria-label="YouTube"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-green-500/20 hover:text-green-500 transition-colors"
                        aria-label="WhatsApp"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-display font-bold text-foreground">
                        Contact Us
                      </h3>
                      
                      <a href="tel:+917386759626" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-sm">K. Kranthi Kiran: +91 7386759626</span>
                      </a>
                      
                      <a href="tel:+919866854604" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-sm">S. Vinod Kumar: +91 9866854604</span>
                      </a>
                      
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-sm">Aditya Institute of Technology and Management, Tekkali</span>
                      </div>
                      
                      <a href="mailto:avishkaar@adityatekkali.edu.in" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-sm">avishkaar@adityatekkali.edu.in</span>
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
