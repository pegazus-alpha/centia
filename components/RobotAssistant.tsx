
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles, Zap, Brain, graduationCap, ShieldAlert } from 'lucide-react';
import { ThemeColor, RobotState } from '../types.ts';
import { COLORS } from '../constants.tsx';
import { getGeminiChatResponse } from '../services/geminiService.ts';
import { getData, saveData, KEYS } from '../services/dataService.ts';

interface RobotAssistantProps {
  themeColor: ThemeColor;
}

const RobotAssistant: React.FC<RobotAssistantProps> = ({ themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentState, setCurrentState] = useState<RobotState>(RobotState.IDLE);
  const [contextualMsg, setContextualMsg] = useState('Besoin d\'aide ?');
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const robotRef = useRef<HTMLDivElement>(null);

  // Chargement de l'historique persistant au démarrage
  useEffect(() => {
    const history = getData(KEYS.CHAT_HISTORY);
    if (history && Array.isArray(history)) {
      setMessages(history);
    }
  }, []);

  // Sauvegarde automatique de l'historique lors des changements
  useEffect(() => {
    if (messages.length > 0) {
      saveData(KEYS.CHAT_HISTORY, messages);
    }
  }, [messages]);

  // Mouse tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePos({ 
          x: Math.max(-5, Math.min(5, (e.clientX - centerX) / 50)), 
          y: Math.max(-5, Math.min(5, (e.clientY - centerY) / 50)) 
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      if (isOpen) return;

      if (location.pathname === '/') {
        if (latest < 0.2) {
          setContextualMsg("Bienvenue dans le futur ! 🚀");
          setCurrentState(RobotState.WAVING);
        } else if (latest < 0.5) {
          setContextualMsg("Nos stats sont impressionnantes, non ? 📈");
          setCurrentState(RobotState.EXCITED);
        } else if (latest < 0.8) {
          setContextualMsg("Une question sur nos méthodes ? 🧠");
          setCurrentState(RobotState.THINKING);
        } else {
          setContextualMsg("Prêt à franchir le pas ? ✨");
          setCurrentState(RobotState.IDLE);
        }
      } else if (location.pathname === '/formations') {
        setContextualMsg("Trouvons la formation idéale ! 🎓");
        setCurrentState(RobotState.TEACHING);
      } else if (location.pathname === '/admin') {
        setContextualMsg("Accès restreint. Identifiez-vous. 🔐");
        setCurrentState(RobotState.IDLE);
      }
    });
    return () => unsub();
  }, [scrollYProgress, location.pathname, isOpen]);

  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.7]);
  const scale = useSpring(isOpen ? 1 : scaleRaw, { stiffness: 200, damping: 20 });
  const primaryColor = COLORS[themeColor].primary;

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);
    setCurrentState(RobotState.THINKING);

    const response = await getGeminiChatResponse(userMsg, messages);
    const finalMessages = [...newMessages, { role: 'model' as const, text: response || '' }];
    setMessages(finalMessages);
    setIsLoading(false);
    setCurrentState(RobotState.EXCITED);
    setTimeout(() => setCurrentState(RobotState.IDLE), 3000);
  };

  const clearChat = () => {
    if(window.confirm('Effacer l\'historique de la conversation ?')) {
      setMessages([]);
      saveData(KEYS.CHAT_HISTORY, []);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-6 w-80 sm:w-96 glass rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col pointer-events-auto h-[550px]"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/5" style={{ backgroundColor: `${primaryColor}15` }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/10">
                  <RobotSVG themeColor={themeColor} size={32} state={currentState} mousePos={mousePos} />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest">Assistant 100%</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-white/40 uppercase">Mode: {currentState}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                 {messages.length > 0 && <button onClick={clearChat} className="w-10 h-10 glass rounded-full flex items-center justify-center border-white/10 hover:text-red-400"><Trash2 size={16}/></button>}
                 <button onClick={() => setIsOpen(false)} className="w-10 h-10 glass rounded-full flex items-center justify-center border-white/10"><X size={18} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-10 opacity-40">
                  <Brain size={40} className="mx-auto mb-4" style={{ color: primaryColor }} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Système de dialogue initialisé.<br/>Posez votre question.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-none' : 'glass border-white/5 text-white/80 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && <div className="flex gap-1 p-4"><div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]" /><div className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]" /></div>}
            </div>

            <div className="p-6 bg-black/20 flex gap-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Une question ?" className="flex-1 px-5 py-3 glass bg-white/5 border border-white/10 rounded-full text-xs outline-none focus:border-white/30" />
              <button onClick={handleSendMessage} className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-all" style={{ backgroundColor: primaryColor }}><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        ref={robotRef}
        style={{ scale }}
        className="pointer-events-auto relative cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-6 glass px-6 py-3 rounded-3xl border-white/10 whitespace-nowrap shadow-2xl"
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-white/80">{contextualMsg}</div>
              <div className="absolute top-full right-8 w-4 h-4 glass border-r border-b border-white/10 rotate-45 -translate-y-2" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`p-3 rounded-[2.5rem] glass shadow-2xl border-2 transition-all duration-500 ${isOpen ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30'}`}
        >
          <RobotSVG themeColor={themeColor} size={window.innerWidth < 768 ? 60 : 80} state={currentState} mousePos={mousePos} />
        </motion.div>
      </motion.div>
    </div>
  );
};

// SVG component remains same...
import { Trash2 } from 'lucide-react';

const RobotSVG = ({ themeColor, size, state, mousePos }: { themeColor: ThemeColor, size: number, state: RobotState, mousePos: {x: number, y: number} }) => {
  const color = COLORS[themeColor].primary;
  const accent = COLORS[themeColor].accent;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>
      <motion.rect x="25" y="45" width="50" height="40" rx={state === RobotState.TEACHING ? "20" : "12"} fill="url(#robotGrad)" />
      <motion.g animate={{ y: state === RobotState.EXCITED ? -5 : 0 }}>
        <rect x="30" y="15" width="40" height="32" rx="14" fill="url(#robotGrad)" />
        <rect x="35" y="22" width="30" height="14" rx="7" fill="black" opacity="0.2" />
        <motion.g animate={{ x: mousePos.x, y: mousePos.y }}>
          <circle cx="42" cy="29" r="3" fill="white" />
          <circle cx="58" cy="29" r="3" fill="white" />
        </motion.g>
        <motion.circle cx="50" cy="5" r="4" fill={color} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1 }} />
      </motion.g>
    </svg>
  );
};

export default RobotAssistant;
