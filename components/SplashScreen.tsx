
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeColor } from '../types.ts';
import { COLORS } from '../constants.tsx';
import { Sparkles, Zap, Shield, Cpu, Code, Palette, Monitor } from 'lucide-react';

interface SplashScreenProps {
  onSelect: (color: ThemeColor) => void;
}

const FloatingElement = ({ children, delay = 0, duration = 4 }: { children?: React.ReactNode, delay?: number, duration?: number }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none opacity-20"
  >
    {children}
  </motion.div>
);

// Fix: Explicitly use React.FC to support the 'key' prop when used within AnimatePresence
const ThemePreviewPortal: React.FC<{ color: ThemeColor }> = ({ color }) => {
  const theme = COLORS[color];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Neural Grid Preview */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="grid-bg w-full h-full scale-[1.5]" 
          style={{ 
            backgroundImage: `linear-gradient(${theme.primary}11 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}11 1px, transparent 1px)` 
          }}
        />
      </div>

      {/* Abstract Site Mockup */}
      <div className="relative w-full max-w-4xl text-center space-y-8 px-12">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[12rem] font-black font-display leading-none opacity-10 select-none tracking-tighter"
          style={{ color: theme.primary }}
        >
          100%
        </motion.div>
        
        <div className="space-y-4">
          <div className="h-2 w-32 bg-white/10 mx-auto rounded-full" />
          <div className="h-20 w-full max-w-lg bg-gradient-to-r from-transparent via-white/5 to-transparent mx-auto rounded-2xl" />
        </div>

        <div className="flex justify-center gap-4">
          <div className="w-40 h-12 rounded-full border border-white/10 bg-white/5" />
          <div className="w-12 h-12 rounded-full" style={{ backgroundColor: theme.primary }} />
        </div>
      </div>

      {/* Glow Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${theme.primary}33 0%, transparent 70%)` }}
      />
    </motion.div>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onSelect }) => {
  const [hoveredColor, setHoveredColor] = useState<ThemeColor | null>(null);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* Background Portals */}
      <AnimatePresence mode="wait">
        {hoveredColor && <ThemePreviewPortal key={hoveredColor} color={hoveredColor} />}
      </AnimatePresence>

      {/* Default Neural Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid-bg w-full h-full scale-[2]" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={5}><div className="top-[15%] left-[10%]"><Code size={60} className="text-white" /></div></FloatingElement>
        <FloatingElement delay={1} duration={6}><div className="bottom-[15%] left-[15%]"><Palette size={50} className="text-white" /></div></FloatingElement>
        <FloatingElement delay={0.5} duration={7}><div className="top-[20%] right-[10%]"><Cpu size={70} className="text-white" /></div></FloatingElement>
        <FloatingElement delay={2} duration={5.5}><div className="bottom-[20%] right-[15%]"><Zap size={50} className="text-white" /></div></FloatingElement>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-6"
      >
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-8 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 glass text-white/50 text-[10px] font-black tracking-[0.5em] uppercase"
        >
          <Monitor size={14} className="text-teal-400" />
          Sélection du profil énergétique
        </motion.div>

        <h1 className="text-5xl md:text-[6rem] font-black text-white mb-16 font-display tracking-tighter leading-none uppercase">
          VOTRE <span className="text-gradient">EXPÉRIENCE.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <ThemeCard 
            color="teal" 
            label="CYBER"
            description="L'esthétique brute du code et de l'innovation."
            onSelect={onSelect} 
            onHover={() => setHoveredColor('teal')}
            onLeave={() => setHoveredColor(null)}
            isActive={hoveredColor === 'teal'}
          />
          <ThemeCard 
            color="pink" 
            label="PULSE"
            description="La vibration créative et le design émotionnel."
            onSelect={onSelect}
            onHover={() => setHoveredColor('pink')}
            onLeave={() => setHoveredColor(null)}
            isActive={hoveredColor === 'pink'}
          />
        </div>
      </motion.div>

      {/* Status Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 flex items-center gap-12 text-[9px] font-black text-white/20 tracking-[0.8em] uppercase"
      >
        <span>Douala HUB</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span>100% ACADEMY OS v2.6</span>
      </motion.div>
    </motion.div>
  );
};

const ThemeCard: React.FC<{ 
  color: ThemeColor; 
  label: string;
  description: string;
  onSelect: (c: ThemeColor) => void; 
  onHover: () => void; 
  onLeave: () => void;
  isActive: boolean;
}> = ({ color, label, description, onSelect, onHover, onLeave, isActive }) => {
  const primary = COLORS[color].primary;

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -10 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onSelect(color)}
      className={`w-72 h-[420px] rounded-[3.5rem] p-10 flex flex-col items-center justify-between glass border transition-all duration-500 relative overflow-hidden group ${
        isActive ? 'border-white/30 bg-white/[0.04] shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]' : 'border-white/5'
      }`}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" 
        style={{ 
          background: `radial-gradient(circle at top, ${primary}, transparent 70%)` 
        }} 
      />
      
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 mt-4 relative z-10"
        style={{ 
          backgroundColor: isActive ? primary : 'rgba(255,255,255,0.02)',
          borderColor: isActive ? 'white' : 'rgba(255,255,255,0.1)',
          boxShadow: isActive ? `0 0 30px ${primary}66` : 'none'
        }}
      >
        {color === 'teal' ? <Zap size={28} className="text-white" /> : <Shield size={28} className="text-white" />}
      </div>

      <div className="space-y-4 relative z-10 flex-grow flex flex-col justify-center">
        <h3 className="text-white font-black text-3xl font-display leading-none tracking-tight">
          {label}
        </h3>
        <p className={`text-[11px] font-medium leading-relaxed transition-colors duration-500 px-4 ${isActive ? 'text-white/70' : 'text-white/20'}`}>
          {description}
        </p>
      </div>

      <motion.div 
        animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 5 }}
        className="pb-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] relative z-10"
        style={{ color: isActive ? primary : 'rgba(255,255,255,0.2)' }}
      >
        <span>Sélectionner</span>
        <ArrowRight size={10} />
      </motion.div>

      {/* Progress Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1"
        initial={{ width: 0 }}
        animate={{ width: isActive ? "100%" : "0%" }}
        style={{ backgroundColor: primary }}
      />
    </motion.button>
  );
};

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default SplashScreen;
