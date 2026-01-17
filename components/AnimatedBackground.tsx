
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedBackground: React.FC<{ color: string }> = ({ color }) => {
  const { scrollYProgress } = useScroll();
  
  // Parallax offsets for different background layers
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#020617]">
      {/* 3D Moving Grid with Scroll Parallax */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 opacity-20"
      >
        <motion.div 
          animate={{ 
            backgroundPosition: ['0px 0px', '0px 50px'] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-0 grid-bg"
          style={{ 
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }}
        />
      </motion.div>

      {/* Floating Blobs with multi-layered parallax */}
      {/* Fix: Merged duplicate style attributes into a single style prop to resolve JSX attribute name duplication error */}
      <motion.div 
        style={{ y: blob1Y, rotate: blobRotate, backgroundColor: color }}
        animate={{ 
          scale: [1, 1.2, 1], 
          x: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full blur-[150px] opacity-[0.15]"
      />
      
      {/* Fix: Merged duplicate style attributes into a single style prop to resolve JSX attribute name duplication error */}
      <motion.div 
        style={{ y: blob2Y, backgroundColor: color === '#008B8B' ? '#ec4899' : '#008B8B' }}
        animate={{ 
          scale: [1.2, 1, 1.2], 
          x: [0, -50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] rounded-full blur-[150px] opacity-[0.1]"
      />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default AnimatedBackground;
