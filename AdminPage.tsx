
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, MessageSquare, 
  Settings, LogOut, Plus, Trash2, Edit2, X,
  Eye, Zap, Timer, Layers, Upload, Menu,
  AlertCircle, CheckCircle2, Database as DbIcon, Download, RefreshCw, FileJson,
  Home as HomeIcon, Tag, List as ListIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getData, saveData, KEYS, addItem, updateItem, deleteItem, fileToBase64, exportFullDatabase, importDatabase, resetDatabase } from './services/dataService';
import { ThemeColor } from './types';
import { COLORS } from './constants';

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    className={`fixed bottom-10 right-10 z-[200] px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border ${type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} backdrop-blur-xl`}
  >
    {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
    <span className="text-sm font-black uppercase tracking-widest">{message}</span>
    <button type="button" onClick={onClose} className="ml-4 opacity-40 hover:opacity-100 transition-opacity"><X size={16} /></button>
  </motion.div>
);

// Composant Modal déplacé à l'extérieur pour éviter les rechargements de DOM inutiles lors des changements de state
interface ItemModalProps {
  activeTab: string;
  editingItem: any;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  primaryColor: string;
  data: any;
  imagePreview: string | null;
  setImagePreview: (val: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  curriculum: string[];
  setCurriculum: (c: string[]) => void;
  onSave: (e: React.FormEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemModal = ({ 
  activeTab, editingItem, setShowModal, primaryColor, data, 
  imagePreview, setImagePreview, selectedTags, setSelectedTags, 
  curriculum, setCurriculum, onSave, onFileChange 
}: ItemModalProps) => {

  const toggleTag = (e: React.MouseEvent, tagName: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTags(selectedTags.includes(tagName) 
      ? selectedTags.filter(t => t !== tagName) 
      : [...selectedTags, tagName]
    );
  };

  const addCurriculumItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurriculum([...curriculum, ""]);
  };

  const updateCurriculumItem = (index: number, val: string) => {
    const updated = [...curriculum];
    updated[index] = val;
    setCurriculum(updated);
  };

  const removeCurriculumItem = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurriculum(curriculum.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="glass w-full max-w-2xl rounded-[3rem] border-white/10 p-8 md:p-12 overflow-y-auto max-h-[90vh] custom-scrollbar relative z-[120]"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black uppercase font-display tracking-tighter text-white">
          {editingItem ? 'Modifier' : 'Ajouter'} {activeTab === 'courses' ? 'Formation' : 'Article'}
        </h2>
        <button type="button" onClick={() => setShowModal(false)} className="w-10 h-10 glass rounded-full flex items-center justify-center border-white/10 hover:bg-white/5 text-white">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-6">
         <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Image de couverture</label>
            <div className="relative group h-40 glass rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden">
              <input 
                type="file" 
                accept="image/*" 
                onChange={onFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
              {imagePreview || editingItem?.image ? (
                <img src={imagePreview || editingItem?.image} className="w-full h-full object-cover opacity-50" />
              ) : (
                <Upload size={30} className="text-white/20" />
              )}
            </div>
         </div>

         <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Libellé / Titre unique</label>
              <input 
                name="title" 
                defaultValue={editingItem?.title} 
                required 
                className="w-full glass bg-white/5 p-4 rounded-2xl border-white/10 outline-none focus:border-white/30 text-white" 
                placeholder="Ex: Maîtrise de Midjourney v6"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Catégorie</label>
              <select name="category" defaultValue={editingItem?.category} className="w-full glass bg-[#020617] p-4 rounded-2xl border-white/10 outline-none text-white focus:border-white/30 appearance-none">
                {data.categories.map((c: any) => <option key={c.id} value={c.name} className="bg-[#020617]">{c.name}</option>)}
              </select>
            </div>
         </div>

         {activeTab === 'courses' && (
           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Durée</label>
                <input name="duration" defaultValue={editingItem?.duration} className="w-full glass bg-white/5 p-4 rounded-2xl border-white/10 outline-none text-white" placeholder="ex: 3 Mois" />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Prix</label>
                <input name="price" defaultValue={editingItem?.price} className="w-full glass bg-white/5 p-4 rounded-2xl border-white/10 outline-none text-white" placeholder="ex: 250.000 FCFA" />
              </div>
           </div>
         )}

         {activeTab === 'courses' && (
           <div className="space-y-3">
             <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Programme / Modules</label>
             <div className="space-y-3">
               {curriculum.map((item, idx) => (
                 <div key={idx} className="flex gap-2">
                   <input 
                     value={item} 
                     onChange={(e) => updateCurriculumItem(idx, e.target.value)}
                     className="flex-1 glass bg-white/5 p-4 rounded-2xl border-white/10 outline-none focus:border-white/30 text-white text-sm"
                     placeholder={`Module ${idx + 1}`}
                   />
                   <button type="button" onClick={(e) => removeCurriculumItem(e, idx)} className="p-4 glass rounded-2xl text-red-400 border-white/10 hover:bg-red-500/10">
                     <Trash2 size={16}/>
                   </button>
                 </div>
               ))}
               <button 
                 type="button" 
                 onClick={addCurriculumItem} 
                 className="w-full p-4 glass border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all"
               >
                 + Ajouter un module au programme
               </button>
             </div>
           </div>
         )}

         <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Étiquettes (Tags)</label>
            <div className="flex flex-wrap gap-2 p-4 glass bg-white/5 rounded-2xl border border-white/10">
              {data.tags.map((tag: any) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={(e) => toggleTag(e, tag.name)}
                  className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                    selectedTags.includes(tag.name) 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
         </div>

         <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 px-2">Description complète</label>
            <textarea 
              name="description" 
              defaultValue={editingItem?.description || editingItem?.excerpt} 
              rows={6} 
              className="w-full glass bg-white/5 p-4 rounded-2xl border-white/10 outline-none resize-none text-white custom-scrollbar" 
              placeholder="Détails du contenu..."
            />
         </div>

         <button type="submit" className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-white shadow-2xl hover:brightness-110 transition-all" style={{ backgroundColor: primaryColor }}>
           Enregistrer les données
         </button>
      </form>
    </motion.div>
  );
};

const AdminPage = ({ themeColor }: { themeColor: ThemeColor }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<any>({ courses: [], blog: [], contacts: [], stats: {}, waitlist: [], categories: [], tags: [] });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState<string[]>([]);

  const primaryColor = COLORS[themeColor]?.primary || COLORS.teal.primary;

  const showNotification = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const refreshData = () => {
    setData({
      courses: getData(KEYS.COURSES),
      blog: getData(KEYS.BLOG),
      contacts: getData(KEYS.CONTACTS),
      stats: getData(KEYS.STATS),
      waitlist: getData(KEYS.WAITLIST),
      categories: getData(KEYS.CATEGORIES),
      tags: getData(KEYS.TAGS)
    });
  };

  useEffect(() => {
    refreshData();
    const handleSync = () => refreshData();
    window.addEventListener('100_storage_sync', handleSync);
    return () => window.removeEventListener('100_storage_sync', handleSync);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '100_ADMIN') {
      setIsAuthenticated(true);
      showNotification('Accès autorisé au Terminal Cloud.', 'success');
    } else {
      showNotification('Clé d\'accès invalide.', 'error');
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const itemData: any = {};
    formData.forEach((value, key) => (itemData[key] = value));
    
    // On s'assure que le titre est bien capturé pour l'unicité
    if (imagePreview) itemData.image = imagePreview;
    itemData.tags = selectedTags;
    
    if (activeTab === 'courses') {
      itemData.curriculum = curriculum.filter(item => item.trim() !== "");
    }

    const key = activeTab === 'courses' ? KEYS.COURSES : KEYS.BLOG;
    
    if (editingItem) {
      updateItem(key, editingItem.id, { ...editingItem, ...itemData });
      showNotification(`"${itemData.title}" mis à jour.`, 'success');
    } else {
      const newItem = {
        ...itemData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        readTime: '5 min',
        image: imagePreview || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
      };
      addItem(key, newItem);
      showNotification(`"${itemData.title}" ajouté au catalogue.`, 'success');
    }

    setShowModal(false);
    setEditingItem(null);
    setImagePreview(null);
    setSelectedTags([]);
    setCurriculum([]);
  };

  const handleDelete = (key: string, id: any) => {
    if (window.confirm('Action critique. Confirmer la suppression ?')) {
      deleteItem(key, id);
      showNotification('Donnée effacée du système.', 'success');
    }
  };

  const handleAddSmallItem = (key: string) => {
    if (!newItemName.trim()) return;
    addItem(key, { id: Date.now().toString(), name: newItemName.trim() });
    setNewItemName('');
    showNotification('Élément ajouté.', 'success');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const b64 = await fileToBase64(file);
        setImagePreview(b64);
      } catch (err) {
        showNotification('Fichier corrompu ou illisible.', 'error');
      }
    }
  };

  const handleExport = () => {
    try {
      exportFullDatabase();
      showNotification('Backup généré avec succès.', 'success');
    } catch (error) {
      showNotification('Erreur d\'exportation.', 'error');
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          importDatabase(content);
          showNotification('Restauration Cloud terminée.', 'success');
        } catch (error: any) {
          showNotification('Backup incompatible.', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
        <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 md:p-12 rounded-[3rem] w-full max-w-md border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: primaryColor }} />
          <div className="w-20 h-20 bg-white/5 rounded-3xl mx-auto mb-8 flex items-center justify-center border border-white/10">
            <Settings size={32} style={{ color: primaryColor }} />
          </div>
          <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter text-white">Terminal Admin</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="CODE D'ACCÈS" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full glass bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-white/30 text-center tracking-[0.5em] font-black text-white" 
            />
            <button type="submit" className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm text-white shadow-xl hover:brightness-110 active:scale-95 transition-all" style={{ backgroundColor: primaryColor }}>Authentifier</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex pt-20 lg:pt-0 relative overflow-hidden">
      <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowModal(false)} />
            <ItemModal 
              activeTab={activeTab}
              editingItem={editingItem}
              showModal={showModal}
              setShowModal={setShowModal}
              primaryColor={primaryColor}
              data={data}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              curriculum={curriculum}
              setCurriculum={setCurriculum}
              onSave={handleSaveItem}
              onFileChange={handleFileChange}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar et Navigation */}
      <div className="lg:hidden fixed top-6 left-6 z-[70]">
        <button type="button" onClick={() => setSidebarOpen(true)} className="w-12 h-12 glass rounded-full flex items-center justify-center border-white/10 text-white">
          <Menu size={20} />
        </button>
      </div>

      <div className={`fixed lg:relative inset-y-0 left-0 w-80 glass border-r border-white/5 p-8 flex flex-col gap-4 z-[80] transition-transform duration-500 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black italic tracking-tighter" style={{ color: primaryColor }}>100% ADMIN</h2>
          </div>
          <button type="button" onClick={() => setSidebarOpen(false)} className="lg:hidden w-10 h-10 glass rounded-full flex items-center justify-center border-white/10 text-white"><X size={20} /></button>
        </div>
        
        <nav className="space-y-2 flex-grow overflow-y-auto custom-scrollbar">
          <Link to="/" className="w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-4">
            <HomeIcon size={18} /> Retour au Site
          </Link>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'courses', label: 'Formations', icon: BookOpen },
            { id: 'blog', label: 'Blog', icon: Zap },
            { id: 'categories', label: 'Catégories', icon: Layers },
            { id: 'tags', label: 'Tags', icon: Tag },
            { id: 'database', label: 'Cloud Local', icon: DbIcon },
            { id: 'contacts', label: 'Messages', icon: MessageSquare },
          ].map((item) => (
            <button key={item.id} type="button" onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${activeTab === item.id ? 'glass bg-white/5 text-white border-white/10 shadow-lg' : 'text-white/40 hover:text-white/60'}`}>
              <item.icon size={18} style={{ color: activeTab === item.id ? primaryColor : 'inherit' }} />
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" onClick={() => setIsAuthenticated(false)} className="flex items-center gap-4 p-4 text-white/40 hover:text-red-400 transition-colors text-sm font-bold"><LogOut size={18} /> Déconnexion</button>
      </div>

      <div className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar z-10 pt-28 lg:pt-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-black uppercase font-display tracking-tighter text-white">
            {activeTab === 'dashboard' && 'Vue d\'ensemble'}
            {activeTab === 'courses' && 'Formations'}
            {activeTab === 'blog' && 'Articles'}
            {activeTab === 'categories' && 'Catégories'}
            {activeTab === 'tags' && 'Tags'}
            {activeTab === 'database' && 'Base de Données'}
            {activeTab === 'contacts' && 'Boîte de réception'}
          </h1>
          {(activeTab === 'courses' || activeTab === 'blog') && (
            <button type="button" onClick={() => { setEditingItem(null); setSelectedTags([]); setCurriculum([]); setImagePreview(null); setShowModal(true); }} className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95">
              <Plus size={16} /> Ajouter Nouveau
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { label: 'Visites Totales', val: data.stats?.views || 0, icon: Eye, color: primaryColor },
                { label: 'Inscriptions IA', val: data.waitlist?.length || 0, icon: Timer, color: '#4ade80' },
                { label: 'Flux Messages', val: data.contacts?.length || 0, icon: MessageSquare, color: '#f472b6' },
              ].map((s, i) => (
                <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 w-fit mb-6" style={{ color: s.color }}><s.icon size={20} /></div>
                  <div className="text-5xl font-black mb-1 text-white">{s.val}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/30">{s.label}</div>
                </div>
              ))}
           </div>
        )}

        {(activeTab === 'courses' || activeTab === 'blog') && (
          <div className="grid gap-4">
            {(activeTab === 'courses' ? data.courses : data.blog).map((item: any) => (
              <div key={item.id} className="glass p-8 rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 group hover:bg-white/[0.03] transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                    <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1 block">{item.category}</span>
                    <h3 className="font-bold text-xl text-white">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                       {item.tags?.map((t: string, ti: number) => (
                         <span key={ti} className="text-[7px] px-2 py-0.5 glass border border-white/10 rounded-full text-white/40 uppercase font-black">{t}</span>
                       ))}
                       {activeTab === 'courses' && item.curriculum?.length > 0 && (
                         <span className="text-[7px] px-2 py-0.5 glass border border-white/10 rounded-full text-teal-400 uppercase font-black flex items-center gap-1">
                           <ListIcon size={8}/> {item.curriculum.length} modules
                         </span>
                       )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => { 
                    setEditingItem(item); 
                    setImagePreview(item.image); 
                    setSelectedTags(item.tags || []);
                    if (activeTab === 'courses') setCurriculum(item.curriculum || []);
                    setShowModal(true); 
                  }} className="h-14 w-14 glass rounded-full flex items-center justify-center hover:bg-white/10 border border-white/10 text-white"><Edit2 size={18} /></button>
                  <button type="button" onClick={() => handleDelete(activeTab === 'courses' ? KEYS.COURSES : KEYS.BLOG, item.id)} className="h-14 w-14 glass rounded-full flex items-center justify-center hover:bg-red-500/20 text-red-400 border border-red-500/10"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
            {(activeTab === 'courses' ? data.courses : data.blog).length === 0 && (
              <div className="py-20 text-center opacity-20 uppercase font-black tracking-widest text-xs text-white">Cloud vide. Ajoutez du contenu.</div>
            )}
          </div>
        )}

        {(activeTab === 'categories' || activeTab === 'tags') && (
          <div className="max-w-4xl space-y-12">
            <div className="glass p-8 rounded-[3rem] border-white/5 flex gap-4">
              <input 
                value={newItemName} 
                onChange={(e) => setNewItemName(e.target.value)} 
                placeholder={`Nouveau libellé...`}
                className="flex-1 glass bg-white/5 border border-white/10 p-5 rounded-2xl outline-none text-white focus:border-white/20" 
              />
              <button 
                type="button"
                onClick={() => handleAddSmallItem(activeTab === 'categories' ? KEYS.CATEGORIES : KEYS.TAGS)}
                className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-sm text-white shadow-xl hover:brightness-110 active:scale-95 transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                Ajouter
              </button>
            </div>
            <div className="grid gap-4">
              {(activeTab === 'categories' ? data.categories : data.tags).map((item: any) => (
                <div key={item.id} className="glass p-6 rounded-3xl border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                  <span className="font-bold text-lg text-white">{item.name}</span>
                  <button type="button" onClick={() => handleDelete(activeTab === 'categories' ? KEYS.CATEGORIES : KEYS.TAGS, item.id)} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass p-12 rounded-[4rem] border-white/5 space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl glass border border-white/10 flex items-center justify-center" style={{ color: primaryColor }}><Download size={32} /></div>
                <div>
                  <h3 className="text-2xl font-bold font-display uppercase italic text-white">Export Cloud</h3>
                  <p className="text-white/40 text-sm">Téléchargez la base de données actuelle.</p>
                </div>
              </div>
              <button type="button" onClick={handleExport} className="w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm bg-white text-black hover:scale-[1.02] transition-all flex items-center justify-center gap-4">
                Générer Backup (.json) <FileJson size={18} />
              </button>
            </div>

            <div className="glass p-12 rounded-[4rem] border-white/5 space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl glass border border-white/10 flex items-center justify-center text-teal-400"><RefreshCw size={32} /></div>
                <div>
                  <h3 className="text-2xl font-bold font-display uppercase italic text-white">Restauration</h3>
                  <p className="text-white/40 text-sm">Injecter un fichier de backup.</p>
                </div>
              </div>
              <div className="relative">
                <input type="file" accept=".json" onChange={handleImport} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <button type="button" className="w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm border-2 border-dashed border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-4 text-white/60">
                  Uploader Backup <Upload size={18} />
                </button>
              </div>
            </div>

            <div className="md:col-span-2 glass p-12 rounded-[4rem] border-red-500/5 bg-red-500/[0.02] space-y-8 text-center">
              <h3 className="text-2xl font-bold font-display uppercase italic text-red-500">Réinitialisation</h3>
              <p className="text-white/20 text-xs">Cette action est irréversible et restaure les paramètres d'usine.</p>
              <button type="button" onClick={() => { if(window.confirm('WIPE TOTAL ?')) resetDatabase(); }} className="px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                Factory Reset
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="grid gap-4">
            {data.contacts.length === 0 ? (
              <div className="py-40 text-center opacity-20 uppercase font-black tracking-widest text-xs text-white">Aucun message entrant.</div>
            ) : (
              data.contacts.map((c: any, i: number) => (
                <div key={i} className="glass p-10 rounded-[3rem] border-white/5 space-y-4">
                   <div className="flex justify-between items-start">
                     <div><h4 className="text-xl font-bold text-white">{c.name}</h4><p className="text-xs text-white/40">{c.email}</p></div>
                     <button type="button" onClick={() => handleDelete(KEYS.CONTACTS, c.id)} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                   </div>
                   <p className="text-white/60 font-light italic leading-relaxed">"{c.message}"</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
