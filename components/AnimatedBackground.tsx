
import React, { useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const FloatingStar: React.FC<{ color: string }> = ({ color }) => {
  const x = useMemo(() => Math.random() * 100, []);
  const y = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => Math.random() * 2 + 0.5, []);
  const duration = useMemo(() => 4 + Math.random() * 6, []);
  const delay = useMemo(() => Math.random() * 10, []);

  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 0.5 }}
      animate={{ 
        opacity: [0.2, 0.8, 0.2], 
        scale: [0.8, 1.2, 0.8],
        x: [`${x}%`, `${x + (Math.random() - 0.5) * 1}%`],
        y: [`${y}%`, `${y + (Math.random() - 0.5) * 1}%`]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className="absolute rounded-full pointer-events-none"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        width: size, 
        height: size, 
        backgroundColor: 'white',
        boxShadow: `0 0 ${size * 3}px ${color}`
      }}
    />
  );
};

const PassingStar: React.FC<{ color: string }> = ({ color }) => {
  const startY = useMemo(() => Math.random() * 80, []);
  const duration = useMemo(() => 1.5 + Math.random() * 2, []);
  const delay = useMemo(() => Math.random() * 15, []);
  const angle = useMemo(() => (Math.random() - 0.5) * 20, []);

  return (
    <motion.div
      initial={{ x: "-20%", y: `${startY}%`, opacity: 0, scale: 0.1 }}
      animate={{ 
        x: "120%", 
        y: [`${startY}%`, `${startY + angle}%`],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "easeIn" 
      }}
      className="absolute h-[1px] rounded-full z-0 pointer-events-none"
      style={{ 
        width: '150px',
        background: `linear-gradient(90deg, transparent, ${color}, white)`,
        boxShadow: `0 0 15px ${color}`,
        transform: `rotate(${angle}deg)`
      }}
    />
  );
};

const AnimatedBackground: React.FC<{ color: string }> = ({ color }) => {
  const { scrollYProgress } = useScroll();
  
  // Suivi de la souris pour la parallaxe
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 30, damping: 20 };
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

  // Parallaxe basée sur la souris
  const parallaxX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-30, 30]);
  
  // Effet de scroll sur les étoiles
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-[1] bg-[#020617]">
      {/* 1. Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 2. Nébuleuses Parallaxe */}
      <motion.div 
        style={{ x: useTransform(parallaxX, v => v * 1.5), y: useTransform(parallaxY, v => v * 1.5) }}
        className="absolute inset-[-10%] opacity-20"
      >
        <div 
          className="absolute top-[10%] left-[5%] w-[60vw] h-[60vw] rounded-full blur-[180px]"
          style={{ backgroundColor: `${color}44` }}
        />
        <div 
          className="absolute bottom-[5%] right-[5%] w-[50vw] h-[50vw] rounded-full blur-[200px]"
          style={{ backgroundColor: color === '#008B8B' ? '#ec489933' : '#008B8B33' }}
        />
      </motion.div>

      {/* 3. Champ d'étoiles flottantes avec scroll effect */}
      <motion.div 
        style={{ 
          x: useTransform(parallaxX, v => v * 0.4), 
          y: useTransform(scrollY, v => v + smoothY.get() * 10) 
        }}
        className="absolute inset-0"
      >
        {[...Array(100)].map((_, i) => (
          <FloatingStar key={`float-${i}`} color={color} />
        ))}
      </motion.div>

      {/* 4. Étoiles passantes rapides */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <PassingStar key={`pass-${i}`} color={color} />
        ))}
      </div>

      {/* 5. Cache de profondeur (Vignettage) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 0.7) 100%)` 
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
