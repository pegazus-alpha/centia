
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Instagram, Facebook, Twitter, Linkedin, 
  ArrowRight, CheckCircle2, MapPin, Phone, Mail, Clock,
  Code, Palette, Video, Database 
} from 'lucide-react';
import { ThemeColor } from './types.ts';
import { COLORS, COURSES, TESTIMONIALS } from './constants.tsx';
import RobotAssistant from './components/RobotAssistant.tsx';
import SplashScreen from './components/SplashScreen.tsx';

const Nav: React.FC<{ themeColor: ThemeColor }> = ({ themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const primaryColor = COLORS[themeColor].primary;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-3 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-black italic tracking-tighter" style={{ color: primaryColor }}>100%</span>
          <span className="text-sm font-bold uppercase tracking-widest text-slate-800">Academy</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" label="Accueil" />
          <NavLink to="/formations" label="Formations" />
          <NavLink to="/ia-2026" label="IA 2026" />
          <NavLink to="/a-propos" label="À propos" />
          <NavLink to="/contact" label="Contact" />
        </div>

        <Link 
          to="/inscription" 
          className="hidden md:block px-6 py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 shadow-lg active:scale-95"
          style={{ backgroundColor: primaryColor }}
        >
          S'inscrire maintenant
        </Link>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-6 right-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
          >
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-bold">Accueil</Link>
              <Link to="/formations" onClick={() => setIsOpen(false)} className="text-lg font-bold">Formations</Link>
              <Link to="/ia-2026" onClick={() => setIsOpen(false)} className="text-lg font-bold text-pink-500">IA 2026</Link>
              <Link to="/a-propos" onClick={() => setIsOpen(false)} className="text-lg font-bold">À propos</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg font-bold">Contact</Link>
              <hr />
              <Link 
                to="/inscription" 
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl text-center text-white font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                S'inscrire
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, label }: { to: string, label: string }) => (
  <Link to={to} className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-wider">{label}</Link>
);

const Home = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor].primary;
  const secondaryColor = COLORS[themeColor].secondary;

  return (
    <div className="pt-32 pb-20">
      <section className="container mx-auto px-6 mb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-widest border border-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            L'excellence technologique à Douala
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1]"
          >
            Le Futur de votre Carrière est <span style={{ color: primaryColor }}>100% IA</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl leading-relaxed"
          >
            Ne subissez pas la révolution de l'intelligence artificielle, menez-la. Maîtrisez les outils qui transforment le monde, du design à la programmation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link 
              to="/formations" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              Découvrir les formations <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-800 font-bold text-lg border-2 border-slate-100 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
            >
              Nous contacter
            </Link>
          </motion.div>

          <div className="flex items-center gap-8 pt-4">
             <div className="text-center">
                <div className="text-3xl font-black" style={{ color: primaryColor }}>500+</div>
                <div className="text-xs uppercase text-slate-400 font-bold tracking-widest">Étudiants</div>
             </div>
             <div className="h-8 w-px bg-slate-200" />
             <div className="text-center">
                <div className="text-3xl font-black" style={{ color: primaryColor }}>15+</div>
                <div className="text-xs uppercase text-slate-400 font-bold tracking-widest">Outils IA</div>
             </div>
             <div className="h-8 w-px bg-slate-200" />
             <div className="text-center">
                <div className="text-3xl font-black" style={{ color: primaryColor }}>98%</div>
                <div className="text-xs uppercase text-slate-400 font-bold tracking-widest">Satisfaction</div>
             </div>
          </div>
        </div>

        <div className="flex-1 relative">
           <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-square border-8 border-white"
           >
              <img src="https://picsum.photos/seed/tech/800/800" alt="Tech training" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
           </motion.div>
           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
             transition={{ duration: 5, repeat: Infinity }}
             className="absolute -top-10 -right-10 w-32 h-32 rounded-3xl opacity-20 blur-2xl" 
             style={{ backgroundColor: primaryColor }} 
           />
           <motion.div 
             animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
             transition={{ duration: 7, repeat: Infinity }}
             className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-20 blur-3xl" 
             style={{ backgroundColor: secondaryColor }} 
           />
        </div>
      </section>

      <section className="bg-slate-50 py-32">
        <div className="container mx-auto px-6">
           <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl md:text-5xl font-black text-slate-900">Nos Formations <span style={{ color: primaryColor }}>Certifiantes</span></h2>
             <p className="text-slate-500 max-w-xl mx-auto">Chaque programme est conçu pour être 100% pratique avec des projets réels assistés par les meilleures IA du marché.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {COURSES.map((course, i) => (
               <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 hover:border-white relative overflow-hidden"
               >
                 <div className="relative z-10">
                   <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ backgroundColor: `${primaryColor}15` }}>
                     <div className="w-8 h-8" style={{ color: primaryColor }}>
                        {course.icon === 'code' && <Code />}
                        {course.icon === 'palette' && <Palette />}
                        {course.icon === 'video' && <Video />}
                        {course.icon === 'database' && <Database />}
                     </div>
                   </div>
                   <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-slate-900">{course.title}</h3>
                   <p className="text-slate-500 text-sm mb-6 leading-relaxed">{course.description}</p>
                   <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">{course.duration}</span>
                      <Link to={`/formations/${course.id}`} className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </Link>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      <section className="py-32 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
           <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
              <div className="flex-1 space-y-8">
                 <div className="inline-block px-4 py-1 rounded-full bg-pink-500 text-[10px] font-black uppercase tracking-widest">Événement Spécial</div>
                 <h2 className="text-4xl md:text-6xl font-black leading-tight">Formation Intensive <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-400">Juin 2026</span></h2>
                 <p className="text-slate-400 text-lg leading-relaxed">
                   Plongez pendant 4 semaines dans le futur. Maîtrisez l'intégralité de la chaîne de production assistée par IA : de l'idée au déploiement final.
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 className="text-teal-400" />
                       <span className="text-sm font-bold">Certification Internationale</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <CheckCircle2 className="text-teal-400" />
                       <span className="text-sm font-bold">Projets Clients Réels</span>
                    </div>
                 </div>
                 <button className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5">
                   Réserver ma place (Places limitées)
                 </button>
              </div>
              <div className="flex-1 w-full flex justify-center">
                 <Countdown themeColor={themeColor} />
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-20">Ils ont <span style={{ color: primaryColor }}>transformé</span> leur carrière</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-8 rounded-3xl bg-slate-50 relative">
                 <div className="absolute -top-6 left-8 w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg">
                   <img src={t.image} alt={t.name} />
                 </div>
                 <p className="text-slate-600 italic mb-6 leading-relaxed pt-4">"{t.content}"</p>
                 <div className="font-bold text-slate-900">{t.name}</div>
                 <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-100">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-teal-50 text-teal-600">
               <MapPin size={24} />
             </div>
             <div>
               <div className="font-bold">Douala, Cameroun</div>
               <div className="text-sm text-slate-500">Akwa, Rue de la Joie</div>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-pink-50 text-pink-600">
               <Phone size={24} />
             </div>
             <div>
               <div className="font-bold">+237 679 910 922</div>
               <div className="text-sm text-slate-500">Disponible 24/7 sur WhatsApp</div>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100 text-slate-600">
               <Mail size={24} />
             </div>
             <div>
               <div className="font-bold">contact@100academy.com</div>
               <div className="text-sm text-slate-500">Réponse sous 2h maximum</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Countdown = ({ themeColor }: { themeColor: ThemeColor }) => {
  return (
    <div className="flex gap-4 md:gap-8">
       <TimeUnit value="452" label="Jours" themeColor={themeColor} />
       <TimeUnit value="14" label="Heures" themeColor={themeColor} />
       <TimeUnit value="32" label="Min" themeColor={themeColor} />
       <TimeUnit value="55" label="Sec" themeColor={themeColor} />
    </div>
  );
};

const TimeUnit = ({ value, label, themeColor }: { value: string, label: string, themeColor: ThemeColor }) => (
  <div className="text-center">
    <div className="w-16 h-20 md:w-24 md:h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-2">
       <span className="text-2xl md:text-4xl font-black">{value}</span>
    </div>
    <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">{label}</div>
  </div>
);

const Footer = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor].primary;
  return (
    <footer className="bg-slate-950 text-white pt-32 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-4xl font-black italic tracking-tighter" style={{ color: primaryColor }}>100%</span>
              <span className="text-lg font-bold uppercase tracking-widest">Academy</span>
            </Link>
            <p className="text-slate-400 max-w-sm text-lg">
              Le centre de référence pour la maîtrise des outils d'intelligence artificielle en Afrique Centrale.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram />} />
              <SocialIcon icon={<Facebook />} />
              <SocialIcon icon={<Twitter />} />
              <SocialIcon icon={<Linkedin />} />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-8">Navigation</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/formations" className="hover:text-white transition-colors">Nos Formations</Link></li>
              <li><Link to="/ia-2026" className="hover:text-white transition-colors">Événement 2026</Link></li>
              <li><Link to="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-8">Légal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Conditions d'Utilisation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
           <div>© 2024 100% ACADEMY. Tous droits réservés.</div>
           <div>Conçu avec passion à Douala.</div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" />
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-950 transition-all">
    {icon}
  </a>
);

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [themeColor, setThemeColor] = useState<ThemeColor>('teal');
  const location = useLocation();

  const handleSelectColor = (color: ThemeColor) => {
    setThemeColor(color);
    setTimeout(() => {
      setShowSplash(false);
    }, 800);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen onSelect={handleSelectColor} key="splash" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Nav themeColor={themeColor} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, type: 'spring', damping: 25, stiffness: 100 }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home themeColor={themeColor} />} />
                  <Route path="/formations" element={<div className="pt-40 container mx-auto px-6 text-center h-screen"><h1 className="text-4xl font-bold">Nos Formations Détaillées</h1><p className="mt-4 text-slate-500">Catalogue complet en cours de chargement...</p></div>} />
                  <Route path="/ia-2026" element={<div className="pt-40 container mx-auto px-6 text-center h-screen"><h1 className="text-4xl font-bold">L'Événement de l'Année</h1><p className="mt-4 text-slate-500">Préparez-vous pour le futur...</p></div>} />
                  <Route path="/a-propos" element={<div className="pt-40 container mx-auto px-6 text-center h-screen"><h1 className="text-4xl font-bold">À propos de 100% Academy</h1><p className="mt-4 text-slate-500">L'histoire de notre vision...</p></div>} />
                  <Route path="/contact" element={<div className="pt-40 container mx-auto px-6 text-center h-screen"><h1 className="text-4xl font-bold">Contactez-nous</h1><p className="mt-4 text-slate-500">Nous sommes à votre écoute.</p></div>} />
                </Routes>
              </motion.div>
            </AnimatePresence>

            <Footer themeColor={themeColor} />
            <RobotAssistant themeColor={themeColor} />
            
            <a 
              href="https://wa.me/237679910922" 
              target="_blank" 
              className="fixed bottom-28 right-8 z-40 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
            >
              <Phone size={32} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
