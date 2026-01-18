
import React, { useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const FloatingObject: React.FC<{ color: string }> = ({ color }) => {
  const x = useMemo(() => Math.random() * 100, []);
  const y = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => Math.random() * 15 + 2, []);
  const duration = useMemo(() => 8 + Math.random() * 15, []);
  const delay = useMemo(() => Math.random() * 20, []);
  const type = useMemo(() => Math.floor(Math.random() * 5), []); // 0: circle, 1: square, 2: triangle, 3: code, 4: ring
  const rotateStart = useMemo(() => Math.random() * 360, []);

  const renderShape = () => {
    switch(type) {
      case 1: return <div style={{ width: size, height: size, border: `1px solid ${color}44`, borderRadius: '20%' }} />;
      case 2: return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.3 }}>
          <path d="M50 10 L90 90 L10 90 Z" stroke={color} fill="none" strokeWidth="2" />
        </svg>
      );
      case 3: return (
        <span className="font-mono text-[8px] font-black opacity-20" style={{ color }}>
          {['{ }', '</>', '=>', '01', '++'][Math.floor(Math.random() * 5)]}
        </span>
      );
      case 4: return <div style={{ width: size, height: size, border: `1px solid ${color}33`, borderRadius: '50%' }} />;
      default: return (
        <div 
          style={{ 
            width: size/2, 
            height: size/2, 
            backgroundColor: 'white', 
            borderRadius: '50%',
            boxShadow: `0 0 ${size * 2}px ${color}`,
            opacity: 0.5
          }} 
        />
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.1, scale: 0.8, rotate: rotateStart }}
      animate={{ 
        opacity: [0.1, 0.4, 0.1], 
        scale: [0.8, 1.1, 0.8],
        rotate: rotateStart + 360,
        x: [`${x}%`, `${x + (Math.random() - 0.5) * 5}%`],
        y: [`${y}%`, `${y + (Math.random() - 0.5) * 5}%`]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "linear" 
      }}
      className="absolute flex items-center justify-center pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {renderShape()}
    </motion.div>
  );
};

const PassingStar: React.FC<{ color: string }> = ({ color }) => {
  const startY = useMemo(() => Math.random() * 80, []);
  const duration = useMemo(() => 1.5 + Math.random() * 2, []);
  const delay = useMemo(() => Math.random() * 15, []);
  const angle = useMemo(() => (Math.random() - 0.5) * 20, []);

  return (
    <motion.div
      initial={{ x: "-20%", y: `${startY}%`, opacity: 0, scale: 0.2 }}
      animate={{ 
        x: "130%", 
        y: [`${startY}%`, `${startY + angle}%`],
        opacity: [0, 1, 0],
        scale: [0.3, 1, 0.3]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "easeIn" 
      }}
      className="absolute h-[1px] rounded-full z-0 pointer-events-none"
      style={{ 
        width: '250px',
        background: `linear-gradient(90deg, transparent, ${color}, white)`,
        boxShadow: `0 0 25px ${color}`,
        transform: `rotate(${angle}deg)`
      }}
    />
  );
};

const AnimatedBackground: React.FC<{ color: string }> = ({ color }) => {
  const { scrollYProgress } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 45, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const parallaxX = useTransform(smoothX, [-1, 1], [-50, 50]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-50, 50]);
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-[1] bg-[#020617]">
      {/* Texture de grain cinématique */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Lueurs nébuleuses colorées */}
      <motion.div 
        style={{ x: useTransform(parallaxX, v => v * 2), y: useTransform(parallaxY, v => v * 2) }}
        className="absolute inset-[-20%] opacity-25"
      >
        <div 
          className="absolute top-[20%] left-[10%] w-[80vw] h-[80vw] rounded-full blur-[250px]"
          style={{ backgroundColor: `${color}44` }}
        />
        <div 
          className="absolute bottom-[10%] right-[15%] w-[70vw] h-[70vw] rounded-full blur-[280px]"
          style={{ backgroundColor: color === '#008B8B' ? '#ec489922' : '#008B8B22' }}
        />
      </motion.div>

      {/* Couche d'objets flottants réactifs - Augmentée à 60 objets pour plus de densité */}
      <motion.div 
        style={{ 
          x: useTransform(parallaxX, v => v * 0.6), 
          y: useTransform(scrollShift, v => v + smoothY.get() * 20) 
        }}
        className="absolute inset-0"
      >
        {[...Array(60)].map((_, i) => (
          <FloatingObject key={`float-${i}`} color={color} />
        ))}
      </motion.div>

      {/* Étoiles passantes */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <PassingStar key={`pass-${i}`} color={color} />
        ))}
      </div>

      {/* Cache radial */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, transparent 30%, rgba(2, 6, 23, 0.85) 100%)` 
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
