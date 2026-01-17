
import React from 'react';
import { motion } from 'framer-motion';
import { ThemeColor } from './types.ts';
import { COLORS } from './constants.tsx';
import { Zap, Sparkles, Shield, Cpu, Timer, ArrowRight, Laptop, Coffee, Award, Globe } from 'lucide-react';

const IA2026Page = ({ themeColor }: { themeColor: ThemeColor }) => {
  const primaryColor = COLORS[themeColor].primary;

  const timeline = [
    { week: "Semaine 01", title: "Fondations Neurales", desc: "Immersion dans les architectures transformer et le prompt engineering avancé." },
    { week: "Semaine 02", title: "Creative Engine", desc: "Production intensive de média synthétiques (Vidéo, Audio, Image) de qualité 8K." },
    { week: "Semaine 03", title: "Agentic Workflows", desc: "Construction de votre propre armée d'agents IA autonomes pour votre business." },
    { week: "Semaine 04", title: "Elite Project", desc: "Développement d'une application IA complète prête pour le marché mondial." }
  ];

  const perks = [
    { icon: <Laptop />, text: "Licences Pro incluses" },
    { icon: <Coffee />, text: "Networking VIP Douala" },
    { icon: <Award />, text: "Certification Elite 2026" },
    { icon: <Globe />, text: "Accès Talent Network International" }
  ];

  return (
    <div className="pt-40 pb-20 overflow-hidden">
      <section className="px-6 max-w-7xl mx-auto mb-60 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1.5 }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />
        
        <div className="relative z-10 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 glass text-teal-400 text-[10px] font-black tracking-[0.6em] uppercase mb-12"
          >
            <Timer size={14} /> session de juin 2026
          </motion.div>
          
          <h1 className="text-[15vw] font-black font-display leading-[0.75] tracking-tighter uppercase italic mb-12">
            ÉLITE <br />
            <span className="text-gradient">IA 2026.</span>
          </h1>
          
          <p className="text-2xl md:text-4xl text-white/50 max-w-4xl mx-auto font-light leading-tight mb-20">
            L'expérience de formation la plus exclusive d'Afrique centrale. Devenez le 1% qui maîtrise vraiment l'IA.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <h2 className="text-6xl font-black font-display uppercase">LE <br /><span className="text-white/20">PROGRAMME.</span></h2>
            <p className="text-white/40 text-xl font-light leading-relaxed">4 semaines de haute intensité. Un format Bootcamp pensé pour transformer votre vision du digital.</p>
            <div className="grid grid-cols-2 gap-8">
               {perks.map((p, i) => (
                 <div key={i} className="flex items-center gap-4 glass p-6 rounded-3xl border-white/5">
                   <div style={{ color: primaryColor }}>{p.icon}</div>
                   <span className="text-[10px] font-black uppercase tracking-widest">{p.text}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="space-y-6 relative">
             <div className="absolute left-10 top-0 bottom-0 w-px bg-white/5" />
             {timeline.map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="relative pl-24 group"
               >
                 <div className="absolute left-8 top-10 w-4 h-4 rounded-full border-2 border-white/10 bg-[#020617] group-hover:bg-white group-hover:scale-125 transition-all z-10" />
                 <div className="glass p-10 rounded-[3rem] border-white/5 group-hover:border-white/20 transition-all">
                    <div className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-4">{item.week}</div>
                    <h4 className="text-3xl font-bold mb-4 uppercase font-display">{item.title}</h4>
                    <p className="text-white/40 font-light leading-relaxed">{item.desc}</p>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Vibe / CTA */}
      <section className="py-60 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex pointer-events-none">
           {[...Array(20)].map((_, i) => (
             <div key={i} className="flex-1 h-full border-r border-white/10" />
           ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-12 font-display italic">PLACES LIMITÉES.</h2>
          <p className="text-white/40 mb-16 text-lg leading-relaxed">
            Seuls 20 candidats seront sélectionnés pour cette session. Les dossiers sont examinés par notre comité pédagogique international.
            <br /> <span className="text-white/80 font-bold mt-4 block">Ouverture des candidatures : 15 Janvier 2026.</span>
          </p>
          <button 
            className="px-16 py-8 rounded-full text-white font-black text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-6 mx-auto group"
            style={{ backgroundColor: primaryColor }}
          >
            S'inscrire sur la liste d'attente
            <ArrowRight className="group-hover:translate-x-3 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default IA2026Page;
