
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES, COLORS } from './constants.tsx';
import { ThemeColor } from './types.ts';
import { Code, Palette, Video, Database, ArrowRight, Filter, TrendingUp, Workflow, CheckCircle } from 'lucide-react';

const FormationsPage = ({ themeColor }: { themeColor: ThemeColor }) => {
  const [filter, setFilter] = useState<string>('all');
  const primaryColor = COLORS[themeColor].primary;
  
  const categories = ['all', ...new Set(COURSES.map(c => c.category))];
  const filteredCourses = filter === 'all' ? COURSES : COURSES.filter(c => c.category === filter);

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'code': return <Code size={32} />;
      case 'palette': return <Palette size={32} />;
      case 'video': return <Video size={32} />;
      case 'database': return <Database size={32} />;
      case 'trending': return <TrendingUp size={32} />;
      case 'workflow': return <Workflow size={32} />;
      default: return <Code size={32} />;
    }
  };

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <h1 className="text-6xl md:text-8xl font-black font-display mb-8">
          VOTRE <span className="text-gradient">AVENIR.</span>
        </h1>
        <p className="text-white/40 text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Un catalogue conçu pour l'employabilité immédiate. Maîtrisez les outils qui feront de vous un profil incontournable.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${
              filter === cat 
                ? 'bg-white text-black border-white' 
                : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
            }`}
          >
            {cat === 'all' ? 'Toutes les formations' : cat}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-40"
      >
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className="group glass p-10 rounded-[3.5rem] border border-white/5 hover:bg-white/[0.05] transition-all flex flex-col h-full"
            >
              <div 
                className="w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-transform group-hover:rotate-12"
                style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
              >
                {getIcon(course.icon)}
              </div>
              <div className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                {course.category} • {course.duration}
              </div>
              <h3 className="text-3xl font-bold mb-6 font-display leading-tight">{course.title}</h3>
              <p className="text-white/40 text-sm mb-12 flex-grow leading-relaxed font-light">
                {course.description}
              </p>
              
              <div className="mb-10 p-5 rounded-2xl bg-white/5 border border-white/5">
                 <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-4">Investissement</div>
                 <div className="text-2xl font-bold text-white">{course.price || 'Sur Devis'}</div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <button 
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:gap-5"
                  style={{ color: primaryColor }}
                >
                  Détails du programme <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Methodology / Why us */}
      <section className="py-40 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black font-display mb-10 leading-[0.9]">POURQUOI NOUS <br /><span className="text-white/20 italic">CHOISIR ?</span></h2>
            <div className="space-y-12">
              {[
                { t: "Pratique à 100%", d: "Pas de théorie inutile. Chaque module se termine par un projet concret pour votre portfolio." },
                { t: "Mentors Experts", d: "Formez-vous avec des professionnels qui utilisent ces outils IA quotidiennement." },
                { t: "Accès à Vie", d: "Rejoignez notre communauté privée et profitez des mises à jour gratuites sur les outils." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center flex-shrink-0" style={{ color: primaryColor }}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 uppercase tracking-tighter">{item.t}</h4>
                    <p className="text-white/40 font-light leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square">
             <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-pink-500/20 blur-[120px] rounded-full" />
             <div className="relative h-full w-full glass rounded-[5rem] border-white/10 overflow-hidden">
                <img src="https://picsum.photos/seed/learn/800/800" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="p-8 glass rounded-3xl text-center border-white/20 backdrop-blur-3xl">
                      <div className="text-5xl font-black mb-2">98%</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Taux d'insertion professionnelle</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormationsPage;
