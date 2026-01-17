
import React, { useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const FloatingStar: React.FC<{ color: string }> = ({ color }) => {
  const x = useMemo(() => Math.random() * 100, []);
  const y = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => Math.random() * 2 + 0.5, []);
  const duration = useMemo(() => 5 + Math.random() * 7, []);
  const delay = useMemo(() => Math.random() * 10, []);

  return (
    <motion.div
      initial={{ opacity: 0.1, scale: 0.8 }}
      animate={{ 
        opacity: [0.2, 0.8, 0.2], 
        scale: [0.8, 1.2, 0.8],
        x: [`${x}%`, `${x + (Math.random() - 0.5) * 2}%`],
        y: [`${y}%`, `${y + (Math.random() - 0.5) * 2}%`]
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
        boxShadow: `0 0 ${size * 4}px ${color}`
      }}
    />
  );
};

const PassingStar: React.FC<{ color: string }> = ({ color }) => {
  const startY = useMemo(() => Math.random() * 70, []);
  const duration = useMemo(() => 1.2 + Math.random() * 1.5, []);
  const delay = useMemo(() => Math.random() * 12, []);
  const angle = useMemo(() => (Math.random() - 0.5) * 15, []);

  return (
    <motion.div
      initial={{ x: "-20%", y: `${startY}%`, opacity: 0, scale: 0.2 }}
      animate={{ 
        x: "130%", 
        y: [`${startY}%`, `${startY + angle}%`],
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.5]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "easeIn" 
      }}
      className="absolute h-[1px] rounded-full z-0 pointer-events-none"
      style={{ 
        width: '200px',
        background: `linear-gradient(90deg, transparent, ${color}, white)`,
        boxShadow: `0 0 20px ${color}`,
        transform: `rotate(${angle}deg)`
      }}
    />
  );
};

const AnimatedBackground: React.FC<{ color: string }> = ({ color }) => {
  const { scrollYProgress } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 25 };
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

  const parallaxX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-40, 40]);
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-[1] bg-[#020617]">
      {/* Texture de grain subtile */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Lueurs nébuleuses en arrière-plan */}
      <motion.div 
        style={{ x: useTransform(parallaxX, v => v * 1.8), y: useTransform(parallaxY, v => v * 1.8) }}
        className="absolute inset-[-15%] opacity-30"
      >
        <div 
          className="absolute top-[15%] left-[10%] w-[70vw] h-[70vw] rounded-full blur-[200px]"
          style={{ backgroundColor: `${color}33` }}
        />
        <div 
          className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full blur-[220px]"
          style={{ backgroundColor: color === '#008B8B' ? '#ec489922' : '#008B8B22' }}
        />
      </motion.div>

      {/* Couche d'étoiles flottantes avec effet de profondeur */}
      <motion.div 
        style={{ 
          x: useTransform(parallaxX, v => v * 0.5), 
          y: useTransform(scrollShift, v => v + smoothY.get() * 15) 
        }}
        className="absolute inset-0"
      >
        {[...Array(110)].map((_, i) => (
          <FloatingStar key={`float-${i}`} color={color} />
        ))}
      </motion.div>

      {/* Étoiles filantes épisodiques */}
      <div className="absolute inset-0">
        {[...Array(7)].map((_, i) => (
          <PassingStar key={`pass-${i}`} color={color} />
        ))}
      </div>

      {/* Vignettage pour focaliser le contenu central */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, transparent 20%, rgba(2, 6, 23, 0.8) 100%)` 
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
