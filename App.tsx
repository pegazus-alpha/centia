
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, X, Instagram, Facebook, Twitter, Linkedin, 
  ArrowRight, CheckCircle2, MapPin, Phone, Mail,
  Code, Palette, Video, Database, Sparkles, Zap,
  TrendingUp, Users, Award, ChevronDown, Monitor,
  Shield, Lock, Cpu, Quote, Rocket, Globe, Terminal
} from 'lucide-react';
import { ThemeColor } from './types.ts';
import { COLORS, COURSES, TESTIMONIALS } from './constants.tsx';
import RobotAssistant from './components/RobotAssistant.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import AnimatedBackground from './components/AnimatedBackground.tsx';
import { initData, getData, saveData, KEYS } from './services/dataService';

// Pages
import FormationsPage from './FormationsPage.tsx';
import IA2026Page from './IA2026Page.tsx';
import ContactPage from './ContactPage.tsx';
import BlogPage from './BlogPage.tsx';
import AdminPage from './AdminPage.tsx';

const SplitText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: i * 0.02, 
            ease: [0.215, 0.61, 0.355, 1] 
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group gap-4"
      >
        <span className="text-xl md:text-3xl font-bold font-display group-hover:text-white/80 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-10 h-10 glass rounded-full flex-shrink-0 flex items-center justify-center border-white/10"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-white/40 text-lg font-light leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor]?.primary || COLORS.teal.primary;
  
  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
        <div className="z-10 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-12 inline-flex items-center gap-3 border border-white/10"
          >
            <Terminal size={14} className="text-teal-400" />
            Initialisation de l'Elite Digitale
          </motion.div>
          
          <h1 className="text-[12vw] md:text-[10rem] font-black text-white leading-[0.8] mb-12 font-display flex flex-col items-center tracking-tighter">
            <SplitText text="BÂTISSEZ" />
            <SplitText text="DEMAIN." className="text-gradient" />
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-3xl text-white/40 max-w-4xl mx-auto leading-relaxed mb-20 font-light"
          >
            Le premier centre d'excellence technologique de Douala. <br className="hidden md:block" />
            Maîtrisez les outils qui redéfinissent les frontières du possible.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/formations" className="group relative">
              <div className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: primaryColor }} />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-12 py-6 rounded-full text-white font-black text-xl flex items-center justify-center gap-4 shadow-2xl"
                style={{ backgroundColor: primaryColor }}
              >
                Explorer les Cursus
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/ia-2026" className="px-12 py-6 rounded-full glass border border-white/10 text-white/60 font-black text-xl hover:text-white hover:bg-white/5 transition-all">
              Session IA 2026
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements Parallax Effect Mockup */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 opacity-20 hidden lg:block"
        >
          <Cpu size={120} style={{ color: primaryColor }} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-10 opacity-20 hidden lg:block"
        >
          <Rocket size={100} style={{ color: primaryColor }} />
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6">
          {[
            { label: "Elite Certifiée", val: "1.2k+", icon: <Users size={24} /> },
            { label: "Succès Pro", val: "98%", icon: <Award size={24} /> },
            { label: "Outils IA", val: "50+", icon: <Zap size={24} /> },
            { label: "Partenaires", val: "30+", icon: <Globe size={24} /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 glass rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all">
                <div style={{ color: primaryColor }}>{stat.icon}</div>
              </div>
              <div className="text-5xl md:text-7xl font-black font-display text-white mb-2">{stat.val}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-8xl font-black font-display leading-[0.8] mb-12 uppercase italic">
                FORMATIONS <br />
                <span className="text-white/20">VEDETTES.</span>
              </h2>
              <p className="text-2xl text-white/40 font-light">Les parcours de référence pour dominer le marché actuel.</p>
            </div>
            <Link to="/formations" className="group flex items-center gap-6 text-sm font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all">
              Catalogue Complet <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {COURSES.slice(0, 3).map((course, i) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass p-12 rounded-[4rem] border-white/5 relative overflow-hidden flex flex-col hover:bg-white/[0.04] transition-all"
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] group-hover:bg-white/10 transition-all" />
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-12 transition-transform group-hover:scale-110 group-hover:rotate-12" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                   {course.icon === 'code' ? <Code size={32}/> : course.icon === 'palette' ? <Palette size={32}/> : <Video size={32}/>}
                </div>
                <h3 className="text-3xl font-bold mb-6 font-display group-hover:text-white transition-colors">{course.title}</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed mb-12 line-clamp-3">{course.description}</p>
                <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{course.duration}</span>
                  <Link to="/formations" className="text-[10px] font-black uppercase tracking-widest" style={{ color: primaryColor }}>Détails</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US - PARALLAX REVEAL */}
      <section className="py-40 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16">
            <h2 className="text-5xl md:text-8xl font-black font-display leading-[0.8] uppercase italic tracking-tighter">
              POURQUOI <br /><span className="text-white/20">L'ÉLITE ?</span>
            </h2>
            <div className="space-y-12">
              {[
                { title: "Infrastructure de Pointe", desc: "Stations de travail équipées de RTX 4090 pour l'IA intensive.", icon: <Monitor /> },
                { title: "Experts Internationaux", desc: "Des mentors issus des plus grandes boîtes tech mondiales.", icon: <Globe /> },
                { title: "Accès Terminal 24/7", desc: "Votre propre environnement de dev persistant dans le cloud.", icon: <Terminal /> }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-10 group"
                >
                  <div className="w-16 h-16 rounded-2xl glass border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-all">
                    <div style={{ color: primaryColor }}>{item.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-4 font-display">{item.title}</h4>
                    <p className="text-white/40 text-lg font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 blur-[120px] opacity-10" style={{ backgroundColor: primaryColor }} />
            <div className="aspect-square glass rounded-[5rem] border-white/10 flex items-center justify-center p-20 relative overflow-hidden">
              <div className="text-center relative z-10">
                <div className="text-[15rem] font-black font-display text-gradient leading-none">26</div>
                <p className="text-xs font-black uppercase tracking-[1em] text-white/40 mt-8">Horizon Technologique</p>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10 pointer-events-none"
              >
                <div className="w-full h-full border-[1px] border-dashed border-white rounded-full scale-[0.8]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black font-display mb-32 uppercase text-center italic">
            CONFIANCE <span className="text-white/20">ABSORBÉE.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={t.id}
                whileHover={{ y: -20 }}
                className="glass p-12 rounded-[4rem] border-white/5 flex flex-col gap-12 relative"
              >
                <Quote size={60} className="text-white/5 absolute top-12 right-12" />
                <p className="text-white/60 text-xl font-light leading-relaxed italic">"{t.content}"</p>
                <div className="flex items-center gap-8 mt-auto">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white font-display">{t.name}</h5>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-40 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-9xl font-black font-display mb-20 uppercase italic text-center tracking-tighter">
          QUESTIONS. <span className="text-white/10">REPONSES.</span>
        </h2>
        <div className="space-y-4">
          <FAQItem question="Faut-il savoir coder pour s'inscrire ?" answer="Non. Nos parcours sont conçus pour transformer n'importe quel profil passionné en expert, du débutant absolu au professionnel souhaitant se reconvertir vers l'IA." />
          <FAQItem question="Quelle est la valeur des certifications ?" answer="Nos certificats sont reconnus par l'écosystème tech local et nos partenaires internationaux, attestant de votre capacité réelle à livrer des projets complexes." />
          <FAQItem question="Peut-on payer en plusieurs fois ?" answer="Oui, nous proposons des facilités de paiement échelonnées sur la durée de la formation pour permettre à chacun d'investir sereinement dans son avenir." />
          <FAQItem question="Où se déroulent les cours ?" answer="Les cours ont lieu dans notre campus d'élite à Bonapriso, Douala, dans un environnement ultra-connecté et stimulant." />
        </div>
      </section>
    </div>
  );
};

const Nav: React.FC<{ themeColor: ThemeColor, setThemeColor: (c: ThemeColor) => void }> = ({ themeColor, setThemeColor }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const primaryColor = COLORS[themeColor]?.primary || COLORS.teal.primary;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeTheme = (color: ThemeColor) => {
    setThemeColor(color);
    saveData(KEYS.THEME_COLOR, color);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 pointer-events-none">
        <motion.div animate={{ scale: scrolled ? 0.98 : 1, y: scrolled ? 0 : 10 }} className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-700 rounded-full px-10 py-5 ${scrolled ? 'glass shadow-2xl bg-black/40 border-white/10' : 'bg-transparent'}`}>
          <Link to="/" className="flex items-center gap-4 group">
            <span className="text-4xl font-black italic tracking-tighter" style={{ color: primaryColor }}>100%</span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 hidden sm:block">Academy</span>
          </Link>
          <div className="hidden lg:flex items-center gap-12">
            {[
              { label: 'Accueil', path: '/' },
              { label: 'Formations', path: '/formations' },
              { label: 'IA 2026', path: '/ia-2026' },
              { label: 'Blog', path: '/blog' },
              { label: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link key={link.label} to={link.path} className={`text-[10px] font-black transition-all uppercase tracking-[0.4em] ${location.pathname === link.path ? 'text-white' : 'text-white/30 hover:text-white'}`}>{link.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex p-1.5 glass rounded-full border border-white/5">
              <button onClick={() => changeTheme('teal')} className={`p-2 rounded-full transition-all ${themeColor === 'teal' ? 'bg-teal-500 text-white' : 'text-white/20 hover:bg-white/5'}`}><Zap size={16} /></button>
              <button onClick={() => changeTheme('pink')} className={`p-2 rounded-full transition-all ${themeColor === 'pink' ? 'bg-pink-500 text-white' : 'text-white/20 hover:bg-white/5'}`}><Sparkles size={16} /></button>
            </div>
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden w-12 h-12 glass rounded-full flex items-center justify-center border-white/10 text-white"><Menu size={20} /></button>
            <Link to="/contact" className="hidden sm:flex px-10 py-4 rounded-full text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95" style={{ backgroundColor: primaryColor }}>S'inscrire</Link>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[55] bg-[#020617] lg:hidden flex flex-col p-12 pt-40"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-12 right-12 w-16 h-16 glass rounded-full flex items-center justify-center border-white/10 text-white/40"><X size={30} /></button>
            
            <div className="flex flex-col gap-12">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Formations', path: '/formations' },
                { label: 'IA 2026', path: '/ia-2026' },
                { label: 'Blog', path: '/blog' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <Link key={link.label} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase italic tracking-tighter text-white/50 hover:text-white transition-colors">{link.label}</Link>
              ))}
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-white/20 uppercase tracking-[0.2em] flex items-center gap-4 mt-12"><Lock size={18} /> Terminal Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor]?.primary || COLORS.teal.primary;
  const location = useLocation();
  if (location.pathname === '/admin') return null;

  return (
    <footer className="pt-60 pb-20 px-6 border-t border-white/5 relative z-20 bg-black/80 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32 mb-40">
          <div className="space-y-12">
            <Link to="/" className="flex items-center gap-4">
              <span className="text-5xl font-black italic tracking-tighter" style={{ color: primaryColor }}>100%</span>
              <span className="text-xs font-black uppercase tracking-[0.6em] text-white/40">Academy</span>
            </Link>
            <p className="text-white/40 text-xl font-light leading-relaxed">
              Le centre de formation d'élite piloté par l'IA au cœur de Douala. Nous forgeons les leaders technologiques de 2026.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 glass rounded-full flex items-center justify-center border-white/5 text-white/20 hover:text-white hover:border-white/40 transition-all">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Navigation</h4>
            <div className="grid grid-cols-1 gap-6">
              <Link to="/" className="text-white/40 hover:text-white transition-colors text-lg">Accueil</Link>
              <Link to="/formations" className="text-white/40 hover:text-white transition-colors text-lg">Formations</Link>
              <Link to="/ia-2026" className="text-white/40 hover:text-white transition-colors text-lg">IA 2026</Link>
              <Link to="/blog" className="text-white/40 hover:text-white transition-colors text-lg">Blog</Link>
              <Link to="/contact" className="text-white/40 hover:text-white transition-colors text-lg">Contact</Link>
            </div>
          </div>

          <div className="space-y-12">
            <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Hub de Douala</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-6 text-white/40">
                <MapPin size={24} style={{ color: primaryColor }} />
                <span className="text-lg font-light">Bonapriso, Douala - Cameroun</span>
              </div>
              <div className="flex items-center gap-6 text-white/40">
                <Mail size={24} style={{ color: primaryColor }} />
                <span className="text-lg font-light">contact@100-academy.cm</span>
              </div>
              <div className="flex items-center gap-6 text-white/40">
                <Phone size={24} style={{ color: primaryColor }} />
                <span className="text-lg font-light">+237 679 910 922</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.6em]">© 2026 100% ACADEMY. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex items-center gap-12">
             <Link to="/admin" className="flex items-center gap-3 text-white/10 hover:text-white/40 transition-colors text-[10px] font-black uppercase tracking-widest px-6 py-3 glass rounded-full border border-white/5">
                <Shield size={14} /> Accès Terminal
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollProgress = ({ color }: { color: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left" style={{ scaleX, backgroundColor: color }} />;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="w-full flex-grow flex flex-col">{children}</motion.div>
);

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [themeColor, setThemeColor] = useState<ThemeColor>('teal');
  const location = useLocation();

  useEffect(() => {
    initData();
    const savedTheme = localStorage.getItem(KEYS.THEME_COLOR) as ThemeColor;
    if (savedTheme && (savedTheme === 'teal' || savedTheme === 'pink')) {
      setThemeColor(savedTheme);
    }
    // Check if splash should be shown
    if (localStorage.getItem(KEYS.THEME_COLOR)) {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSelectColor = (color: ThemeColor) => {
    setThemeColor(color);
    saveData(KEYS.THEME_COLOR, color);
    setTimeout(() => setShowSplash(false), 100); 
  };

  const primaryColor = COLORS[themeColor]?.primary || COLORS.teal.primary;

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      <ScrollProgress color={primaryColor} />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen onSelect={handleSelectColor} key="splash" />
        ) : (
          <motion.div key="main-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
            <AnimatedBackground color={primaryColor} />
            {location.pathname !== '/admin' && <Nav themeColor={themeColor} setThemeColor={setThemeColor} />}
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageWrapper><Home themeColor={themeColor} /></PageWrapper>} />
                  <Route path="/formations" element={<PageWrapper><FormationsPage themeColor={themeColor} /></PageWrapper>} />
                  <Route path="/blog" element={<PageWrapper><BlogPage themeColor={themeColor} /></PageWrapper>} />
                  <Route path="/ia-2026" element={<PageWrapper><IA2026Page themeColor={themeColor} /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><ContactPage themeColor={themeColor} /></PageWrapper>} />
                  <Route path="/admin" element={<PageWrapper><AdminPage themeColor={themeColor} /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </main>
            {location.pathname !== '/admin' && <Footer themeColor={themeColor} />}
            <RobotAssistant themeColor={themeColor} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
