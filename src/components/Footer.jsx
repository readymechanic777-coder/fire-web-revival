import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Linkedin, Youtube, Twitter, MessageCircle } from 'lucide-react';
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
    { icon: Phone, text: 'G. Chinmay: +91 9553975331', href: 'tel:+919553975331', wa: '919553975331' },
    { icon: Phone, text: 'Smruti Sabujima: +91 9345192331', href: 'tel:+919345192331', wa: '919345192331' },
    { icon: Phone, text: 'Niranjan Muddada: +91 8897809548', href: 'tel:+918897809548', wa: '918897809548' },
    { icon: Mail, text: 'avishkaar@adityatekkali.edu.in', href: 'mailto:avishkaar@adityatekkali.edu.in' },
    { icon: MapPin, text: 'Aditya Institute of Technology and Management, Tekkali', href: 'https://www.google.com/maps/search/?api=1&query=Aditya+Institute+of+Technology+and+Management+Tekkali' },
  ];
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];
  return (<footer className="relative bg-gradient-to-b from-background to-card border-t border-primary/20">

    <div className="container mx-auto px-4 pt-8 pb-4">
      <div className="grid md:grid-cols-3 gap-4">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h3 className="text-lg font-display font-bold text-gradient-water mb-2">Quick Links</h3>
          <ul className="flex flex-col gap-1">
            {quickLinks.map((link) => (<li key={link.name}>
              <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs leading-5">
                {link.name}
              </Link>
            </li>))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
          <h3 className="text-lg font-display font-bold text-gradient-water mb-2">Contact Us</h3>
          <ul className="flex flex-col gap-1.5">
            {contacts.map((contact, index) => (<li key={index} className="flex items-center">
              <a href={contact.href} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group">
                <contact.icon className="w-3.5 h-3.5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs">{contact.text}</span>
              </a>
              {contact.wa && (
                <a href={`https://wa.me/${contact.wa}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition-transform hover:scale-110 ml-2 shrink-0 flex items-center justify-center" title="Chat on WhatsApp">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              )}
            </li>))}
          </ul>
        </motion.div>


        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          <h3 className="text-lg font-display font-bold text-gradient-water mb-1.5">Follow Us</h3>
          <div className="flex gap-4">
            {socialLinks.map((social) => (<a key={social.label} href={social.href} aria-label={social.label} className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
              <social.icon className="w-5 h-5" />
            </a>))}
          </div>
        </motion.div>
      </div>
    </div>


    <div className="border-t border-primary/10 bg-card/50">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm text-muted-foreground leading-relaxed">
          Copyrights ©️ 2026 Designed and developed by <a href="https://www.linkedin.com/in/saisateeshwarareddy/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:text-cyan-300 hover:underline transition-all">T. Saisateeshwara Reddy</a> and <a href="https://github.com/vinod7777" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:text-cyan-300 hover:underline transition-all">S Vinod kumar</a> From SSC . All rights reserved.
        </p>
      </div>
    </div>
  </footer>);
};
export default Footer;
