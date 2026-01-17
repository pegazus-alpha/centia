
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, ExternalLink } from 'lucide-react';
import { ThemeColor, RobotState } from '../types.ts';
import { COLORS } from '../constants.tsx';
import { getGeminiChatResponse } from '../services/geminiService.ts';

interface RobotAssistantProps {
  themeColor: ThemeColor;
}

const RobotAssistant: React.FC<RobotAssistantProps> = ({ themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentState, setCurrentState] = useState<RobotState>(RobotState.IDLE);
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const robotRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for eye movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) / 100;
        const dy = (e.clientY - centerY) / 100;
        // Limit range
        setMousePos({ 
          x: Math.max(-4, Math.min(4, dx)), 
          y: Math.max(-4, Math.min(4, dy)) 
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine robot state based on the current page
  useEffect(() => {
    if (isOpen) {
      setCurrentState(isLoading ? RobotState.THINKING : RobotState.IDLE);
      return;
    }
    switch (location.pathname) {
      case '/':
        setCurrentState(RobotState.WAVING);
        break;
      case '/formations':
        setCurrentState(RobotState.TEACHING);
        break;
      case '/ia-2026':
        setCurrentState(RobotState.THINKING);
        break;
      case '/contact':
        setCurrentState(RobotState.IDLE);
        break;
      default:
        setCurrentState(RobotState.IDLE);
    }
  }, [location.pathname, isOpen, isLoading]);

  const rawX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -40, 40, -40, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 50, -30, 60, -20, 0]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 15]); // Reduced rotation for cleaner look
  
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  const rotate = useSpring(rawRotate, { stiffness: 60, damping: 20 });
  const scale = useSpring(isOpen ? 0.8 : 1, { stiffness: 200, damping: 20 });

  const primaryColor = COLORS[themeColor].primary;

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiChatResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
    
    // Briefly show excited state on response
    setCurrentState(RobotState.EXCITED);
    setTimeout(() => {
      if (isOpen) setCurrentState(RobotState.IDLE);
    }, 2000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="mb-6 w-80 sm:w-96 glass rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col pointer-events-auto"
            style={{ height: '550px' }}
          >
            <div className="p-6 flex items-center justify-between text-white border-b border-white/5" style={{ backgroundColor: `${primaryColor}22` }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <RobotSVG themeColor={themeColor} size={32} state={currentState} animate={true} mousePos={mousePos} />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase">100-Bot</h3>
                  <p className="text-[9px] font-bold opacity-40 uppercase tracking-[0.2em]">Neural Core Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-12 px-6">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 glass rounded-3xl mx-auto mb-6 flex items-center justify-center border border-white/10"
                  >
                    <MessageSquare size={32} style={{ color: primaryColor }} />
                  </motion.div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold leading-relaxed">
                    Système Initialisé. <br /> Posez votre question à l'IA.
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-white/5 text-white border border-white/10 rounded-tr-none' 
                        : 'glass text-white/80 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass p-5 rounded-[2rem] border border-white/5 rounded-tl-none flex gap-2">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message à 100-Bot..."
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all outline-none"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-all active:scale-90 hover:brightness-110 disabled:opacity-50 shadow-xl"
                style={{ backgroundColor: primaryColor }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={robotRef} className="pointer-events-auto">
        <motion.div
          style={{ x, y, rotate, scale }}
          whileHover={{ scale: 1.1, y: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer relative group"
        >
          <div className="absolute -top-16 -left-24 bg-white/95 backdrop-blur-xl py-2 px-4 rounded-2xl shadow-2xl border border-gray-100 text-[10px] font-black uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap">
            {currentState === RobotState.THINKING ? 'Calcul en cours... 🧠' : currentState === RobotState.TEACHING ? 'Prêt pour le cours ! 🎓' : 'Besoin d\'aide ?'}
            <div className="absolute bottom-[-6px] left-[70%] w-3 h-3 bg-white rotate-45 border-r border-b border-gray-100" />
          </div>
          <div className="p-2 rounded-[2rem] glass shadow-2xl border-2 transition-colors duration-500 overflow-hidden" style={{ borderColor: isOpen ? 'white' : `${primaryColor}44` }}>
             <RobotSVG themeColor={themeColor} size={80} state={currentState} mousePos={mousePos} />
          </div>
          
          {/* Status pulse */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
        </motion.div>
      </div>
    </div>
  );
};

interface RobotSVGProps {
  themeColor: ThemeColor;
  size?: number;
  animate?: boolean;
  state?: RobotState;
  mousePos?: { x: number; y: number };
}

const RobotSVG: React.FC<RobotSVGProps> = ({ 
  themeColor, 
  size = 80, 
  animate = true,
  state = RobotState.IDLE,
  mousePos = { x: 0, y: 0 }
}) => {
  const color = COLORS[themeColor].primary;
  const accent = COLORS[themeColor].accent;

  // Spring animations for organic feel
  const springConfig = { stiffness: 100, damping: 10 };
  
  // Dynamic Head Rotation
  const headRotate = state === RobotState.THINKING ? 10 : state === RobotState.WAVING ? -5 : 0;
  const headY = state === RobotState.EXCITED ? -5 : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Shadow */}
      <motion.ellipse 
        cx="50" cy="90" rx="20" ry="5" fill="black" opacity="0.1"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Left Arm */}
      <motion.g
        animate={{ 
          rotate: state === RobotState.WAVING ? [-30, -100, -30] : state === RobotState.EXCITED ? [-40, -60, -40] : -10,
          x: state === RobotState.WAVING ? -2 : 0
        }}
        transition={{ duration: state === RobotState.WAVING ? 0.6 : 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: '20px', originY: '45px' }}
      >
        <rect x="12" y="45" width="10" height="28" rx="5" fill={color} opacity="0.8" />
        <rect x="12" y="45" width="10" height="8" rx="4" fill="white" opacity="0.2" />
      </motion.g>

      {/* Right Arm */}
      <motion.g
        animate={{ 
          rotate: state === RobotState.TEACHING ? [30, 90, 30] : state === RobotState.EXCITED ? [40, 60, 40] : 10,
          y: state === RobotState.TEACHING ? [-2, 2, -2] : 0
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: '80px', originY: '45px' }}
      >
        <rect x="78" y="45" width="10" height="28" rx="5" fill={color} />
        <rect x="78" y="45" width="10" height="8" rx="4" fill="white" opacity="0.2" />
      </motion.g>

      {/* Body */}
      <motion.g
        animate={{ y: [40, 38, 40], rotateX: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="25" y="40" width="50" height="42" rx="12" fill="url(#bodyGrad)" />
        {/* Screen/Detail on body */}
        <rect x="35" y="52" width="30" height="18" rx="4" fill="white" opacity="0.1" />
        <motion.rect 
          x="38" y="55" width="24" height="2" rx="1" fill="white" opacity="0.4"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* 3D Highlight */}
        <rect x="25" y="40" width="50" height="4" rx="2" fill="white" opacity="0.2" />
      </motion.g>

      {/* Head */}
      <motion.g
        animate={{ 
          y: [18 + headY, 16 + headY, 18 + headY],
          rotate: headRotate,
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: '50px', originY: '45px' }}
      >
        <rect x="30" y="15" width="40" height="32" rx="14" fill="url(#bodyGrad)" />
        <rect x="30" y="15" width="40" height="4" rx="2" fill="white" opacity="0.2" />
        
        {/* Antenna */}
        <line x1="50" y1="15" x2="50" y2="5" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <motion.circle 
          cx="50" cy="5" r="4" 
          fill={state === RobotState.THINKING ? accent : color} 
          filter="url(#glow)"
          animate={state === RobotState.THINKING ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        />

        {/* Face/Eyes Area */}
        <rect x="36" y="24" width="28" height="14" rx="7" fill="black" opacity="0.2" />
        
        {/* Eyes - Dynamic Tracking */}
        <motion.g
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'spring', ...springConfig }}
        >
          <motion.circle 
            cx="44" cy="31" r="3" fill="white" 
            animate={{ scaleY: [1, 0.1, 1] }} 
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
          />
          <motion.circle 
            cx="56" cy="31" r="3" fill="white" 
            animate={{ scaleY: [1, 0.1, 1] }} 
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
          />
        </motion.g>

        {/* Thinking effect */}
        {state === RobotState.THINKING && (
          <motion.path 
            d="M 40 20 Q 50 10 60 20" 
            stroke={accent} 
            strokeWidth="2" 
            fill="none" 
            opacity="0.6"
            animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.g>
    </svg>
  );
};

export default RobotAssistant;
