
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from './constants.tsx';
import { ThemeColor, Course } from './types.ts';
import { Code, Palette, Video, Database, ArrowRight, TrendingUp, Workflow, CheckCircle, X, Book, Timer, Zap, List } from 'lucide-react';
import { getData, KEYS } from './services/dataService';

const FormationsPage = ({ themeColor }: { themeColor: ThemeColor }) => {
  const [filter, setFilter] = useState<string>('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const primaryColor = COLORS[themeColor].primary;
  
  const refreshCourses = () => {
    setCourses(getData(KEYS.COURSES));
  };

  useEffect(() => {
    refreshCourses();
    window.addEventListener('100_storage_sync', refreshCourses);
    return () => window.removeEventListener('100_storage_sync', refreshCourses);
  }, []);

  const categories = ['all', ...new Set(courses.map(c => c.category))];
  const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.category === filter);

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

  const CourseDetail = ({ course, onClose }: { course: Course, onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 100 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 100 }}
        className="glass w-full max-w-6xl rounded-[4rem] border-white/10 p-12 md:p-20 relative overflow-hidden my-auto"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-10 right-10 w-16 h-16 glass rounded-full flex items-center justify-center border-white/10 hover:bg-white/5 z-20"><X size={24} /></button>
        
        <div className="grid lg:grid-cols-2 gap-24 relative z-10">
          <div className="space-y-12">
            <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center border border-white/10" style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}>
              {getIcon(course.icon)}
            </div>
            <div className="space-y-6">
              <div className="text-[12px] font-black uppercase tracking-[0.6em] text-teal-400">{course.category} • {course.duration}</div>
              <h2 className="text-6xl md:text-8xl font-black font-display leading-[0.85] tracking-tighter uppercase italic text-white">{course.title}</h2>
            </div>
            <p className="text-white/40 text-2xl font-light leading-relaxed">{course.description}</p>
            
            <div className="grid grid-cols-2 gap-10">
              <div className="p-10 glass rounded-[2.5rem] border-white/5">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Investissement</div>
                <div className="text-3xl font-bold text-white">{course.price || 'Nous contacter'}</div>
              </div>
              <div className="p-10 glass rounded-[2.5rem] border-white/5 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Certification</div>
                <div className="text-3xl font-bold text-white">Inclus</div>
              </div>
            </div>
          </div>

          <div className="space-y-16 bg-white/[0.02] p-16 rounded-[4rem] border border-white/5">
             <h3 className="text-3xl font-bold font-display uppercase tracking-widest flex items-center gap-6 text-white">
               <Book style={{ color: primaryColor }} size={32} /> Programme Elite
             </h3>
             <div className="space-y-10 custom-scrollbar max-h-[400px] overflow-y-auto pr-4">
               {(course.curriculum && course.curriculum.length > 0) ? course.curriculum.map((point, i) => (
                 <div key={i} className="flex gap-8 group">
                   <div className="w-12 h-12 rounded-full glass flex items-center justify-center border-white/10 group-hover:border-white/30 transition-all"><CheckCircle size={20} style={{ color: primaryColor }} /></div>
                   <div>
                     <h4 className="text-xl font-bold text-white mb-1">Module {i + 1}</h4>
                     <p className="text-white/30 text-base font-light">{point}</p>
                   </div>
                 </div>
               )) : (
                 <div className="text-center py-20 opacity-20 italic">Programme en cours de finalisation...</div>
               )}
             </div>
             <button className="w-full py-10 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: primaryColor }}>Réserver ma place</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="pt-48 pb-40 px-6 max-w-7xl mx-auto min-h-screen">
      <AnimatePresence>{selectedCourse && <CourseDetail course={selectedCourse} onClose={() => setSelectedCourse(null)} />}</AnimatePresence>

      <div className="text-center mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 glass text-white/40 text-[10px] font-black tracking-[0.5em] uppercase mb-12"
        >
          <Zap size={14} style={{ color: primaryColor }} />
          Catalogue de Compétences 2026
        </motion.div>
        <h1 className="text-[10vw] font-black font-display mb-12 uppercase italic leading-none text-white">CURSUS.</h1>
        <p className="text-white/40 text-2xl max-w-3xl mx-auto font-light leading-relaxed italic">Des parcours d'exception pour forger l'élite numérique du continent.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-32">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${filter === cat ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredCourses.map((course) => (
            <motion.div 
              key={course.id} 
              layout
              onClick={() => setSelectedCourse(course)} 
              className="group glass p-12 rounded-[4rem] border border-white/5 flex flex-col cursor-pointer transition-all hover:bg-white/[0.05] hover:scale-[1.02]"
            >
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-12 transition-transform group-hover:rotate-12" style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}>{getIcon(course.icon)}</div>
              <h3 className="text-4xl font-bold mb-8 font-display leading-[0.9] text-white group-hover:text-teal-400 transition-colors">{course.title}</h3>
              <p className="text-white/40 text-lg mb-12 flex-grow font-light line-clamp-3 leading-relaxed">{course.description}</p>
              <div className="pt-10 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-white/20 flex items-center gap-3"><Timer size={14} /> {course.duration}</span>
                <span style={{ color: primaryColor }}>Exploration <ArrowRight size={14} className="inline ml-3" /></span>
              </div>
            </motion.div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-20 uppercase font-black tracking-widest text-sm text-white">Aucun cursus disponible.</div>
          )}
      </div>
    </div>
  );
};

export default FormationsPage;
