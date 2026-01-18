
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeColor } from '../types.ts';
import { COLORS } from '../constants.tsx';
import { Zap, Shield, Cpu, Code, Palette, Monitor, ArrowRight, Binary, Activity, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onSelect: (color: ThemeColor) => void;
}

const FloatingParticle: React.FC<{ color: string; delay: number }> = ({ color, delay }) => (
  <motion.div
    initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0 }}
    animate={{ 
      y: "-10%", 
      opacity: [0, 0.5, 0],
      x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
    }}
    transition={{ 
      duration: 5 + Math.random() * 5, 
      repeat: Infinity, 
      delay,
      ease: "linear" 
    }}
    className="absolute w-1 h-1 rounded-full blur-[1px]"
    style={{ backgroundColor: color }}
  />
);

const BinaryRain: React.FC<{ color: string }> = ({ color }) => (
  <div className="absolute inset-0 opacity-10 flex justify-around pointer-events-none overflow-hidden">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -100 }}
        animate={{ y: 1000 }}
        transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
        className="text-[10px] font-mono leading-none flex flex-col gap-2"
        style={{ color }}
      >
        {Array.from({ length: 40 }).map((_, j) => (
          <span key={j}>{Math.round(Math.random())}</span>
        ))}
      </motion.div>
    ))}
  </div>
);

const ThemePreviewPortal: React.FC<{ color: ThemeColor }> = ({ color }) => {
  const theme = COLORS[color];
  const isTeal = color === 'teal';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#020617]">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `radial-gradient(circle at center, ${theme.primary}33 0%, transparent 70%)` 
          }}
        />
        <div 
          className="grid-bg w-full h-full scale-[1.5] opacity-30" 
          style={{ 
            backgroundImage: `linear-gradient(${theme.primary}22 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}22 1px, transparent 1px)` 
          }}
        />
        
        {/* Theme Specific Background Elements */}
        {isTeal ? <BinaryRain color={theme.primary} /> : (
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1],
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0]
                }}
                transition={{ duration: 10 + i, repeat: Infinity }}
                className="absolute w-64 h-64 rounded-full blur-[80px]"
                style={{ backgroundColor: theme.primary, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content Mockup */}
      <div className="relative w-full max-w-7xl px-12 flex flex-col items-center">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 glass mb-8">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Aperçu du Système</span>
          </div>
          
          <h2 className="text-[12vw] font-black font-display leading-[0.8] mb-8 tracking-tighter uppercase italic">
            <span className="text-white/10">MODE</span> <br />
            <span style={{ color: theme.primary }} className="drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {isTeal ? 'CYBER' : 'PULSE'}
            </span>
          </h2>
          
          <div className="max-w-xl mx-auto h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Floating Cards Mockup */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="aspect-[4/5] glass rounded-[2.5rem] border-white/5 p-8 flex flex-col justify-end relative overflow-hidden group"
            >
              <div className="absolute top-8 left-8 p-3 rounded-2xl bg-white/5" style={{ color: theme.primary }}>
                {isTeal ? (i === 0 ? <Binary size={20} /> : i === 1 ? <Cpu size={20} /> : <Code size={20} />) : 
                          (i === 0 ? <Palette size={20} /> : i === 1 ? <Activity size={20} /> : <Sparkles size={20} />)}
              </div>
              <div className="space-y-4">
                <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                <div className="h-8 w-full bg-white/5 rounded-xl border border-white/5" />
                <div className="h-8 w-2/3 bg-white/5 rounded-xl border border-white/5" />
              </div>
              {/* Animated glow on card */}
              <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 120%, ${theme.primary}22, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <FloatingParticle key={i} color={theme.primary} delay={i * 0.2} />
        ))}
      </div>
    </motion.div>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onSelect }) => {
  const [hoveredColor, setHoveredColor] = useState<ThemeColor | null>(null);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } }}
    >
      {/* Dynamic Background Preview */}
      <AnimatePresence mode="wait">
        {hoveredColor ? (
          <ThemePreviewPortal key={hoveredColor} color={hoveredColor} />
        ) : (
          <motion.div 
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 grid-bg w-full h-full scale-[2] pointer-events-none opacity-10" 
          />
        )}
      </AnimatePresence>

      {/* Main UI Overlay */}
      <motion.div
        animate={{ y: hoveredColor ? -40 : 0 }}
        className="relative z-10 text-center px-6 transition-all duration-700"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 glass text-white/50 text-[10px] font-black tracking-[0.5em] uppercase"
        >
          <Monitor size={14} className="text-teal-400" />
          Initialisation de l'Interface
        </motion.div>

        <h1 className="text-5xl md:text-[7rem] font-black text-white mb-16 font-display tracking-tighter leading-none uppercase select-none">
          CHOISISSEZ <br /> VOTRE <span className="text-gradient">UNIVERS.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <ThemeCard 
            color="teal" 
            label="CYBER"
            description="L'esthétique de l'innovation pure et du code performant."
            onSelect={onSelect} 
            onHover={() => setHoveredColor('teal')}
            onLeave={() => setHoveredColor(null)}
            isActive={hoveredColor === 'teal'}
          />
          <ThemeCard 
            color="pink" 
            label="PULSE"
            description="La puissance créative et l'excellence du design."
            onSelect={onSelect}
            onHover={() => setHoveredColor('pink')}
            onLeave={() => setHoveredColor(null)}
            isActive={hoveredColor === 'pink'}
          />
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredColor ? 0.8 : 0.2 }}
          className="text-[9px] font-black text-white uppercase tracking-[1em]"
        >
          {hoveredColor ? `ACTIVATION DU MODULE ${hoveredColor}` : "SÉLECTION DU PRISME REQUISE"}
        </motion.div>
        <div className="flex items-center gap-8 text-[8px] font-medium text-white/10 tracking-[0.4em] uppercase">
          <span>DOUALA HUB</span>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span>v2.0-2026</span>
        </div>
      </div>
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onSelect(color)}
      className={`w-80 h-[420px] rounded-[3.5rem] p-10 flex flex-col items-center justify-between glass border transition-all duration-700 relative overflow-hidden group ${
        isActive ? 'border-white/40 bg-white/[0.08] shadow-[0_0_100px_-20px_rgba(255,255,255,0.1)]' : 'border-white/5 opacity-70'
      }`}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" 
        style={{ background: `radial-gradient(circle at center, ${primary}, transparent 80%)` }} 
      />
      
      <div 
        className="w-20 h-20 rounded-3xl flex items-center justify-center border transition-all duration-700 relative z-10"
        style={{ 
          backgroundColor: isActive ? primary : 'rgba(255,255,255,0.02)',
          borderColor: isActive ? 'white' : 'rgba(255,255,255,0.1)',
          boxShadow: isActive ? `0 0 40px ${primary}66` : 'none'
        }}
      >
        {color === 'teal' ? <Zap size={32} className="text-white" /> : <Shield size={32} className="text-white" />}
      </div>

      <div className="relative z-10 text-center space-y-4">
        <h3 className="text-white font-black text-4xl font-display tracking-tight uppercase italic">{label}</h3>
        <p className={`text-[11px] leading-relaxed transition-all duration-700 px-4 ${isActive ? 'text-white/80' : 'text-white/20'}`}>
          {description}
        </p>
      </div>

      <div 
        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] relative z-10 py-4 px-8 rounded-full border border-transparent transition-all"
        style={{ color: isActive ? primary : 'white', borderColor: isActive ? `${primary}33` : 'transparent' }}
      >
        ENTRER <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>

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

export default SplashScreen;
