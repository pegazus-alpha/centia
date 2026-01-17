
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, X, Instagram, Facebook, Twitter, Linkedin, 
  ArrowRight, CheckCircle2, MapPin, Phone, Mail,
  Code, Palette, Video, Database, Sparkles, Zap
} from 'lucide-react';
import { ThemeColor } from './types.ts';
import { COLORS, COURSES, TESTIMONIALS } from './constants.tsx';
import RobotAssistant from './components/RobotAssistant.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import AnimatedBackground from './components/AnimatedBackground.tsx';

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
            delay: i * 0.03, 
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

const MagneticButton: React.FC<{ children: React.ReactNode, className?: string, style?: any }> = ({ children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

const ParallaxSection: React.FC<{ children?: React.ReactNode, offset?: number, className?: string }> = ({ children, offset = 100, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: springY, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

const ScrollProgress = ({ color }: { color: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{ scaleX, backgroundColor: color }}
    />
  );
};

// Fix: Explicitly use React.FC to ensure children prop is correctly recognized by TypeScript in JSX templates
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -40, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const Home = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor].primary;
  
  return (
    <div className="relative">
      <AnimatedBackground color={primaryColor} />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
        <div className="z-10 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-12 inline-flex items-center gap-3 border border-white/10"
          >
            <Sparkles size={14} className="text-teal-400" />
            L'Élite de l'IA est ici
          </motion.div>
          
          <h1 className="text-6xl md:text-[10rem] font-black text-white leading-[0.8] mb-16 font-display select-none flex flex-col items-center">
            <SplitText text="MAÎTRISEZ" />
            <SplitText text="L'AVENIR." className="text-gradient" />
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto leading-relaxed mb-16 font-light"
          >
            Accélérez votre carrière avec les technologies qui façonnent demain. <br />
            Du développement web à la création visuelle par IA.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link to="/formations">
              <MagneticButton 
                className="px-12 py-6 rounded-full text-white font-black text-xl flex items-center gap-4 group relative overflow-hidden shadow-2xl shadow-teal-500/20"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                Explorer les Cours
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </MagneticButton>
            </Link>
            
            <div className="flex items-center gap-6 glass p-2 pr-6 rounded-full border-white/5">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-10 h-10 rounded-full border-2 border-slate-950" />
                 ))}
              </div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Rejoignez 500+ Étudiants</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-60 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <ParallaxSection offset={50} className="mb-32">
             <h2 className="text-5xl md:text-8xl font-black font-display leading-[0.9]">
                <span className="text-white/20 uppercase tracking-tighter">Impact</span> <br />
                INSTANTANÉ.
             </h2>
           </ParallaxSection>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {COURSES.map((course, i) => (
               <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
                className="group p-12 glass rounded-[3rem] flex flex-col transition-all hover:bg-white/[0.05] border border-white/5 relative overflow-hidden"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-12 bg-white/5 border border-white/10 group-hover:rotate-[15deg] transition-transform" style={{ color: primaryColor }}>
                    {course.icon === 'code' && <Code size={30} />}
                    {course.icon === 'palette' && <Palette size={30} />}
                    {course.icon === 'video' && <Video size={30} />}
                    {course.icon === 'database' && <Database size={30} />}
                 </div>
                 <h3 className="text-3xl font-bold mb-6 font-display group-hover:translate-x-2 transition-transform">{course.title}</h3>
                 <p className="text-white/40 text-sm mb-12 leading-relaxed flex-grow font-light">{course.description}</p>
                 <div className="flex items-center justify-between pt-8 border-t border-white/5 group-hover:border-white/20 transition-colors">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">{course.duration}</span>
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                       <ArrowRight size={18} />
                    </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* IMMERSION / ELITE SECTION */}
      <section className="py-60 relative">
        <div className="max-w-7xl mx-auto px-6">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="relative rounded-[5rem] overflow-hidden glass p-12 md:p-32 border border-white/10"
           >
              <div className="relative z-10 grid lg:grid-cols-2 gap-32 items-center">
                 <div className="space-y-12">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-teal-400"
                    >
                      Élite Digital 2026
                    </motion.div>
                    <h2 className="text-6xl md:text-9xl font-black font-display leading-[0.8] tracking-tighter">
                      MODE <br />
                      <span className="text-white/20 italic">ELITE.</span>
                    </h2>
                    <p className="text-white/40 text-2xl leading-relaxed font-light">
                      L'expérience la plus intense du continent. <br />
                      4 semaines pour redéfinir ce qui est possible.
                    </p>
                    <MagneticButton>
                      <button className="px-12 py-6 rounded-full font-black text-xl transition-all hover:scale-110 shadow-2xl shadow-teal-500/20" style={{ backgroundColor: primaryColor }}>
                        Rejoindre le cercle
                      </button>
                    </MagneticButton>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6 relative">
                    <div className="absolute inset-0 bg-teal-500/20 blur-[120px] -z-10" />
                    <ParallaxSection offset={100} className="space-y-6">
                       <div className="h-56 glass rounded-[3rem] p-8 flex flex-col justify-between border-white/10 group">
                          <Zap size={32} className="text-teal-400 group-hover:scale-125 transition-transform" />
                          <div>
                            <span className="text-4xl font-black font-display block">100%</span>
                            <span className="text-[10px] uppercase font-bold text-white/20 tracking-[0.4em]">Propulsé par IA</span>
                          </div>
                       </div>
                       <motion.div whileHover={{ scale: 0.98 }} className="h-80 rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all border border-white/10 shadow-2xl">
                          <img src="https://picsum.photos/seed/tech1/600/800" className="w-full h-full object-cover" />
                       </motion.div>
                    </ParallaxSection>
                    <ParallaxSection offset={-100} className="space-y-6 pt-12">
                       <motion.div whileHover={{ scale: 0.98 }} className="h-80 rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all border border-white/10 shadow-2xl">
                          <img src="https://picsum.photos/seed/tech2/600/800" className="w-full h-full object-cover" />
                       </motion.div>
                       <div className="h-56 glass rounded-[3rem] p-8 flex flex-col justify-between border-white/10 group">
                          <Database size={32} className="text-pink-400 group-hover:scale-125 transition-transform" />
                          <div>
                            <span className="text-4xl font-black font-display block">DATA</span>
                            <span className="text-[10px] uppercase font-bold text-white/20 tracking-[0.4em]">Immersion Totale</span>
                          </div>
                       </div>
                    </ParallaxSection>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

const Nav: React.FC<{ themeColor: ThemeColor }> = ({ themeColor }) => {
  const [scrolled, setScrolled] = useState(false);
  const primaryColor = COLORS[themeColor].primary;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 pointer-events-none">
      <motion.div 
        animate={{ y: scrolled ? 0 : 0, scale: scrolled ? 0.95 : 1 }}
        className={`max-w-6xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-700 rounded-full px-10 py-5 ${scrolled ? 'glass shadow-2xl bg-white/[0.02]' : ''}`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-4xl font-black italic tracking-tighter transition-transform group-hover:scale-110" style={{ color: primaryColor }}>100%</span>
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-white/50">Academy</span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {['Accueil', 'Formations', 'Elite 2026', 'Support'].map((label, i) => (
             <Link 
               key={label} 
               to={`/${label.toLowerCase().replace(" ", "-")}`} 
               className="text-[10px] font-black text-white/40 hover:text-white transition-all uppercase tracking-[0.4em]"
             >
               {label}
             </Link>
          ))}
        </div>

        <MagneticButton>
          <Link 
            to="/inscription" 
            className="px-8 py-3 rounded-full text-white font-black text-[10px] transition-all uppercase tracking-[0.3em] flex items-center gap-2 group overflow-hidden"
            style={{ backgroundColor: primaryColor }}
          >
            <span>S'inscrire</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </MagneticButton>
      </motion.div>
    </nav>
  );
};

const Footer = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor].primary;
  return (
    <footer className="pt-60 pb-20 px-6 border-t border-white/5 bg-[#020617] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-40">
           <div className="space-y-12">
              <Link to="/" className="flex items-center gap-4">
                <span className="text-7xl font-black italic tracking-tighter" style={{ color: primaryColor }}>100%</span>
                <span className="text-2xl font-bold uppercase tracking-[0.5em] text-white/20">Academy</span>
              </Link>
              <p className="text-white/30 max-w-sm text-2xl font-light leading-relaxed">
                Le futur ne se prédit pas, il se code. Rejoignez la révolution numérique au Cameroun.
              </p>
           </div>
           <div className="grid grid-cols-2 gap-20">
              <div className="space-y-8">
                 <h4 className="text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">Navigation</h4>
                 <ul className="space-y-6 text-xl font-bold font-display">
                    <li><Link to="/" className="hover:text-teal-400 transition-colors">Accueil</Link></li>
                    <li><Link to="/formations" className="hover:text-teal-400 transition-colors">Cours</Link></li>
                    <li><Link to="/ia-2026" className="hover:text-teal-400 transition-colors">Élite</Link></li>
                 </ul>
              </div>
              <div className="space-y-8">
                 <h4 className="text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">Social</h4>
                 <ul className="space-y-6 text-xl font-bold font-display">
                    <li><a href="#" className="hover:text-pink-400 transition-colors">Instagram</a></li>
                    <li><a href="#" className="hover:text-pink-400 transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-pink-400 transition-colors">Twitter</a></li>
                 </ul>
              </div>
           </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-[10px] font-black text-white/10 uppercase tracking-[1em] pt-12 border-t border-white/5">
           <div>© 2024 100% ACADEMY. NEXT GEN EDUCATION.</div>
           <div>DOUALA, CAMEROUN</div>
        </div>
      </div>
    </footer>
  );
};

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [themeColor, setThemeColor] = useState<ThemeColor>('teal');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSelectColor = (color: ThemeColor) => {
    setThemeColor(color);
    setTimeout(() => {
      setShowSplash(false);
    }, 100); 
  };

  const primaryColor = COLORS[themeColor].primary;

  return (
    <div className="min-h-screen bg-[#020617]">
      <ScrollProgress color={primaryColor} />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen onSelect={handleSelectColor} key="splash" />
        ) : (
          <motion.div
            key="main-container"
            className="selection:bg-teal-500/30 selection:text-teal-200"
          >
            <Nav themeColor={themeColor} />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route 
                  path="/" 
                  element={
                    <PageWrapper>
                      <Home themeColor={themeColor} />
                    </PageWrapper>
                  } 
                />
                <Route 
                  path="*" 
                  element={
                    <PageWrapper>
                      <div className="min-h-screen flex items-center justify-center text-white/20 uppercase tracking-[1em] text-xs">
                        Page en construction
                      </div>
                    </PageWrapper>
                  } 
                />
              </Routes>
            </AnimatePresence>
            <Footer themeColor={themeColor} />
            <RobotAssistant themeColor={themeColor} />
            
            <motion.a 
              whileHover={{ scale: 1.1, rotate: 5 }}
              href="https://wa.me/237679910922" 
              className="fixed bottom-12 left-12 z-[60] w-20 h-20 glass rounded-full flex items-center justify-center border border-white/10 shadow-2xl"
            >
              <Phone size={28} style={{ color: COLORS[themeColor].primary }} />
            </motion.a>
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
