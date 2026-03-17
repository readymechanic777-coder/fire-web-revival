import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import WaterTextEffect from "./WaterTextEffect";
const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Team', path: '/team' },
    { name: 'Tracks', path: '/tracks' },
  ];
  const contacts = [
    { icon: Phone, text: ' : ', href: '' },
    { icon: Phone, text: 'S Vinod Kumar : +91 9866854604', href: 'tel:+919866854604' },
    { icon: MapPin, text: 'Aditya Institute of Technology And Management, Tekkali', href: '#' },
    { icon: Mail, text: 'avishkaar@adityatekkali.edu.in', href: 'mailto:avishkaar@adityatekkali.edu.in' },
  ];
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];
  return (<footer className="relative bg-gradient-to-b from-background to-card border-t border-primary/20">

    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h3 className="text-xl font-display font-bold text-gradient-water mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (<li key={link.name}>
              <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                {link.name}
              </Link>
            </li>))}
          </ul>
        </motion.div>


        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
          <h3 className="text-xl font-display font-bold text-gradient-water mb-6">Contact Us</h3>
          <ul className="space-y-4">
            {contacts.map((contact, index) => (<li key={index}>
              <a href={contact.href} className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group">
                <contact.icon className="w-4 h-4 text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{contact.text}</span>
              </a>
            </li>))}
          </ul>
        </motion.div>


        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          <h3 className="text-xl font-display font-bold text-gradient-water mb-6">Follow Us</h3>
          <div className="flex gap-4">
            {socialLinks.map((social) => (<a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
              <social.icon className="w-5 h-5" />
            </a>))}
          </div>
        </motion.div>
      </div>
    </div>


    <div className="border-t border-primary/10 bg-card/50">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-muted-foreground">
          Copyrights © 2026 Designed and developed by{' '}
          <span className="text-primary">S</span> .{' '}
          <span className="text-primary">Vinod kumar</span> and{' '}
          <span className="text-primary">Vinod kumar</span> From{' '}
          <span className="text-primary">SSC</span>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>);
};
export default Footer;
