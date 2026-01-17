
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeColor } from '../types.ts';
import { COLORS } from '../constants.tsx';

interface SplashScreenProps {
  onSelect: (color: ThemeColor) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onSelect }) => {
  const [hoveredColor, setHoveredColor] = useState<ThemeColor | null>(null);

  const getBgStyle = () => {
    if (!hoveredColor) return 'bg-[#0f172a]';
    return hoveredColor === 'teal' ? 'bg-[#002e2e]' : 'bg-[#2e0014]';
  };

  return (
    <motion.div 
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-colors duration-700 ${getBgStyle()}`}
      exit={{ scale: 20, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeIn" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full border-[1px] border-white/10 rounded-full"
        />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 text-center px-6"
      >
        <div className="mb-8 inline-block px-4 py-1 rounded-full border border-white/20 text-white/60 text-sm font-medium tracking-widest uppercase">
          Bienvenue chez 100% Academy
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display tracking-tight">
          Choisissez votre <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-400">Expérience Visuelle</span>
        </h1>
        <p className="text-gray-400 mb-12 max-w-md mx-auto text-lg leading-relaxed">
          Personnalisez votre interface pour une immersion totale dans le futur de l'intelligence artificielle.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <ThemeCard 
            color="teal" 
            onSelect={onSelect} 
            onHover={() => setHoveredColor('teal')}
            onLeave={() => setHoveredColor(null)}
          />
          <ThemeCard 
            color="pink" 
            onSelect={onSelect}
            onHover={() => setHoveredColor('pink')}
            onLeave={() => setHoveredColor(null)}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {hoveredColor && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-12 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 shadow-2xl pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-2 text-[10px] text-white/40 uppercase tracking-widest">Preview Mode: {hoveredColor === 'teal' ? 'Oceanic Tech' : 'Cyber Pink'}</div>
            </div>
            <div className="space-y-3">
              <div className="h-6 rounded-md w-3/4" style={{ backgroundColor: COLORS[hoveredColor].primary }} />
              <div className="h-32 rounded-md w-full bg-white/5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full" style={{ backgroundColor: COLORS[hoveredColor].primary }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ThemeCard: React.FC<{ color: ThemeColor; onSelect: (c: ThemeColor) => void; onHover: () => void; onLeave: () => void }> = ({ color, onSelect, onHover, onLeave }) => {
  const styles = color === 'teal' 
    ? 'from-teal-500 to-cyan-500 shadow-teal-500/20' 
    : 'from-pink-600 to-rose-400 shadow-pink-500/20';

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onSelect(color)}
      className={`w-64 h-48 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 bg-gradient-to-br ${styles} shadow-2xl relative overflow-hidden group border border-white/20`}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-white" />
      </div>
      <div className="text-white font-black text-2xl tracking-tight uppercase">
        {color === 'teal' ? 'Teal Vision' : 'Pink Pulse'}
      </div>
      <div className="text-white/60 text-xs font-bold uppercase tracking-widest">Sélectionner</div>
    </motion.button>
  );
};

export default SplashScreen;
