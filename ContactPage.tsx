
import React from 'react';
import { motion } from 'framer-motion';
import { ThemeColor } from './types.ts';
import { COLORS } from './constants.tsx';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin, ExternalLink } from 'lucide-react';

const ContactPage = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor].primary;

  // Coordonnées approximatives pour Bonapriso, Douala
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.1666453711!2d9.6923!3d4.0298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061127040445a47%3A0xc6829146f328f41e!2sBonapriso%2C%20Douala!5e0!3m2!1sfr!2scm!4v1710000000000!5m2!1sfr!2scm`;

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-32">
      {/* Contact Section */}
      <div className="grid lg:grid-cols-2 gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-16"
        >
          <div>
            <h1 className="text-7xl font-black font-display mb-8">CONTACTEZ <br /> <span className="text-gradient">L'ACADÉMIE.</span></h1>
            <p className="text-white/40 text-xl font-light">Nous sommes basés au cœur de Douala, prêts à propulser votre carrière.</p>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center border-white/5 group-hover:bg-white/10 transition-colors">
                <MapPin className="text-teal-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">Localisation</h4>
                <p className="text-lg font-medium">Bonapriso, Douala - Cameroun</p>
              </div>
            </div>

            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center border-white/5 group-hover:bg-white/10 transition-colors">
                <Phone className="text-pink-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">WhatsApp</h4>
                <p className="text-lg font-medium">+237 679 910 922</p>
              </div>
            </div>

            <div className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center border-white/5 group-hover:bg-white/10 transition-colors">
                <Mail className="text-blue-400" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">Email</h4>
                <p className="text-lg font-medium">contact@100-academy.cm</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -5, scale: 1.1 }}
                href="#" 
                className="w-12 h-12 glass rounded-full flex items-center justify-center border-white/5 text-white/40 hover:text-white transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-12 rounded-[4rem] border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] -z-10" />
          
          <form className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 px-4">Votre Nom</label>
              <input type="text" placeholder="John Doe" className="w-full glass bg-white/[0.03] border-white/5 p-6 rounded-3xl outline-none focus:border-white/20 transition-all text-white placeholder:text-white/10" />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 px-4">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full glass bg-white/[0.03] border-white/5 p-6 rounded-3xl outline-none focus:border-white/20 transition-all text-white placeholder:text-white/10" />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 px-4">Message</label>
              <textarea placeholder="Votre projet..." rows={4} className="w-full glass bg-white/[0.03] border-white/5 p-6 rounded-3xl outline-none focus:border-white/20 transition-all text-white placeholder:text-white/10 resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-transform active:scale-95 shadow-2xl"
              style={{ backgroundColor: primaryColor }}
            >
              Envoyer le message <Send size={20} />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group"
      >
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black font-display uppercase italic">Retrouvez-nous.</h2>
            <p className="text-white/40 font-light mt-2 tracking-wide">Au cœur du quartier d'affaires de Bonapriso.</p>
          </div>
          <motion.a 
            href="https://maps.app.goo.gl/9Zp8x6y5Y4Z2Z1Z1" // Lien factice vers Maps
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-3 px-8 py-4 glass border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
          >
            Itinéraire Google Maps <ExternalLink size={14} />
          </motion.a>
        </div>

        <div className="relative h-[600px] w-full rounded-[4rem] overflow-hidden glass border border-white/10 shadow-2xl group">
          {/* Custom Stylized Map Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-transparent group-hover:border-white/5 transition-all duration-700 rounded-[4rem]" />
          
          <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{ 
              border: 0, 
              filter: 'grayscale(1) invert(0.92) contrast(1.2) hue-rotate(180deg)',
              mixBlendMode: 'screen'
            }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 scale-[1.1] group-hover:scale-100 transition-transform duration-[2s] ease-out opacity-60 group-hover:opacity-100"
          ></iframe>

          {/* Map Decoration */}
          <div className="absolute top-10 right-10 z-20 glass px-6 py-4 rounded-3xl border-white/10 pointer-events-none md:block hidden">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: `${primaryColor}44` }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Signal GPS : Actif</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
