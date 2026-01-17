
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ExternalLink } from 'lucide-react';
import { ThemeColor, RobotState } from '../types';
import { COLORS } from '../constants';
import { getGeminiChatResponse } from '../services/geminiService';

interface RobotAssistantProps {
  themeColor: ThemeColor;
}

const RobotAssistant: React.FC<RobotAssistantProps> = ({ themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { scrollYProgress } = useScroll();

  // Robot movements and scale based on scroll
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -40, 40, -40, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 50, -30, 60, -20, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

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
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            style={{ height: '500px' }}
          >
            <div className="p-4 flex items-center justify-between text-white" style={{ backgroundColor: primaryColor }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <RobotSVG themeColor={themeColor} size={24} animate={false} />
                </div>
                <div>
                  <h3 className="font-bold">100-Bot</h3>
                  <p className="text-xs opacity-80">Assistant Académique</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center py-8 px-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare size={32} style={{ color: primaryColor }} />
                  </div>
                  <p className="text-sm text-gray-500">
                    Bonjour ! Je suis l'assistant de 100% ACADEMY. Comment puis-je vous aider aujourd'hui ?
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-gray-200 text-gray-800 rounded-tr-none' 
                        : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-gray-300" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-gray-300" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2"
                style={{ ringColor: primaryColor }}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="p-2 rounded-full text-white transition-transform active:scale-95"
                style={{ backgroundColor: primaryColor }}
              >
                <Send size={18} />
              </button>
            </div>
            
            <a 
              href="https://wa.me/237679910922" 
              target="_blank" 
              className="px-4 py-2 text-xs text-center border-t border-gray-100 hover:bg-gray-50 flex items-center justify-center gap-1 text-gray-500"
            >
              Parler à un humain sur WhatsApp <ExternalLink size={12} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Floating Robot Button */}
      <motion.div
        style={{ x, y, rotate, scale }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative group"
      >
        <div className="absolute -top-12 -left-20 bg-white py-1 px-3 rounded-xl shadow-lg border border-gray-100 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Besoin d'aide ? Cliquez-moi ! 🤖
        </div>
        <div className="p-1 rounded-full bg-white shadow-xl border-4" style={{ borderColor: primaryColor }}>
           <RobotSVG themeColor={themeColor} size={64} />
        </div>
      </motion.div>
    </div>
  );
};

const RobotSVG: React.FC<{ themeColor: ThemeColor; size?: number; animate?: boolean }> = ({ themeColor, size = 64, animate = true }) => {
  const color = COLORS[themeColor].primary;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <motion.rect 
        x="25" y="40" width="50" height="40" rx="10" fill={color}
        animate={animate ? { y: [40, 38, 40] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      {/* Head */}
      <motion.rect 
        x="30" y="15" width="40" height="30" rx="15" fill={color}
        animate={animate ? { rotate: [-5, 5, -5] } : {}}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      {/* Eyes */}
      <circle cx="42" cy="30" r="4" fill="white" />
      <circle cx="58" cy="30" r="4" fill="white" />
      <motion.circle 
        cx="42" cy="30" r="2" fill="black" 
        animate={animate ? { scaleY: [1, 0.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 4, times: [0, 0.95, 1] }}
      />
      <motion.circle 
        cx="58" cy="30" r="2" fill="black" 
        animate={animate ? { scaleY: [1, 0.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 4, times: [0, 0.95, 1] }}
      />
      {/* Antenna */}
      <line x1="50" y1="15" x2="50" y2="5" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="5" r="3" fill={color} />
      {/* Arms */}
      <motion.rect 
        x="15" y="45" width="10" height="25" rx="5" fill={color}
        animate={animate ? { rotate: [-20, 0, -20] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <motion.rect 
        x="75" y="45" width="10" height="25" rx="5" fill={color}
        animate={animate ? { rotate: [20, 0, 20] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    </svg>
  );
};

export default RobotAssistant;
