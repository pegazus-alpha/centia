
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from './constants.tsx';
import { ThemeColor, BlogPost, BlogComment } from './types.ts';
import { Calendar, Clock, ArrowRight, Zap, X, Share2, Bookmark, Heart, MessageCircle, Send, User } from 'lucide-react';
import { getData, saveData, KEYS, updateItem } from './services/dataService';

const BlogPage = ({ themeColor }: { themeColor: ThemeColor }) => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const primaryColor = COLORS[themeColor].primary;
  
  const refreshPosts = () => {
    setPosts(getData(KEYS.BLOG));
    setSavedPosts(getData(KEYS.SAVED_POSTS));
  };

  useEffect(() => {
    refreshPosts();
    window.addEventListener('100_storage_sync', refreshPosts);
    return () => window.removeEventListener('100_storage_sync', refreshPosts);
  }, []);

  const categories = ['Tous', ...new Set(posts.map(post => post.category))];
  const filteredPosts = activeCategory === 'Tous' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const handleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    const post = posts.find(p => p.id === postId);
    if (post) {
      const updatedPost = { ...post, likes: (post.likes || 0) + 1 };
      updateItem(KEYS.BLOG, postId, updatedPost);
      if (selectedPost?.id === postId) setSelectedPost(updatedPost);
    }
  };

  const handleSave = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    const currentSaved = getData(KEYS.SAVED_POSTS);
    let newSaved;
    if (currentSaved.includes(postId)) {
      newSaved = currentSaved.filter((id: string) => id !== postId);
    } else {
      newSaved = [...currentSaved, postId];
    }
    saveData(KEYS.SAVED_POSTS, newSaved);
    setSavedPosts(newSaved);
  };

  const handleShare = async (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Lien de l\'article copié dans le presse-papier !');
    }
  };

  const handleAddComment = (postId: string, commentText: string, userName: string) => {
    const post = posts.find(p => p.id === postId);
    if (post && commentText.trim()) {
      const newComment: BlogComment = {
        id: Date.now().toString(),
        user: userName || 'Anonyme',
        text: commentText,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      const updatedPost = {
        ...post,
        comments: [...(post.comments || []), newComment]
      };
      updateItem(KEYS.BLOG, postId, updatedPost);
      if (selectedPost?.id === postId) setSelectedPost(updatedPost);
    }
  };

  const CommentSection = ({ post }: { post: BlogPost }) => {
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');

    return (
      <div className="mt-20 space-y-12">
        <div className="flex items-center gap-4">
          <MessageCircle size={32} style={{ color: primaryColor }} />
          <h3 className="text-3xl font-black uppercase font-display italic">Commentaires ({(post.comments || []).length})</h3>
        </div>

        <div className="glass p-10 rounded-[3rem] border-white/10 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="w-full glass bg-white/5 p-4 rounded-2xl outline-none focus:border-white/20 text-white text-sm"
            />
            <div className="hidden md:block"></div>
          </div>
          <div className="relative">
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full glass bg-white/5 p-6 rounded-[2rem] outline-none focus:border-white/20 text-white text-sm min-h-[120px] resize-none"
            />
            <button 
              onClick={() => { handleAddComment(post.id, comment, name); setComment(''); }}
              className="absolute bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {(post.comments || []).slice().reverse().map((c) => (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-[2.5rem] border-white/5 flex gap-6"
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border-white/10 flex-shrink-0">
                <User size={20} className="text-white/20" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white">{c.user}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">• {c.date}</span>
                </div>
                <p className="text-white/60 font-light leading-relaxed">{c.text}</p>
              </div>
            </motion.div>
          ))}
          {(post.comments || []).length === 0 && (
            <div className="py-10 text-center opacity-20 uppercase font-black tracking-widest text-xs">Soyez le premier à commenter !</div>
          )}
        </div>
      </div>
    );
  };

  const PostDetail = ({ post, onClose }: { post: BlogPost, onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-3xl overflow-y-auto custom-scrollbar"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
        className="min-h-screen w-full max-w-4xl mx-auto py-20 px-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-16">
          <button onClick={onClose} className="w-14 h-14 glass rounded-full flex items-center justify-center border-white/10 hover:bg-white/5"><X size={24} className="text-white"/></button>
          <div className="flex gap-4">
            <button 
              onClick={(e) => handleShare(e, post)}
              className="w-14 h-14 glass rounded-full flex items-center justify-center border-white/10 hover:bg-white/5"
            >
              <Share2 size={20} className="text-white" />
            </button>
            <button 
              onClick={(e) => handleSave(e, post.id)}
              className={`w-14 h-14 glass rounded-full flex items-center justify-center border-white/10 hover:bg-white/5 transition-colors ${savedPosts.includes(post.id) ? 'text-pink-500' : 'text-white'}`}
            >
              <Bookmark size={20} fill={savedPosts.includes(post.id) ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <article className="space-y-16 pb-40">
           <div className="space-y-8 text-center">
             <div className="inline-block px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-widest text-teal-400 border-white/10">{post.category}</div>
             <h1 className="text-5xl md:text-8xl font-black font-display leading-[1.1] tracking-tighter italic text-white">{post.title}</h1>
             <div className="flex items-center justify-center gap-8 text-[11px] font-black uppercase tracking-[0.3em] text-white/30">
               <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
               <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
               <button onClick={(e) => handleLike(e, post.id)} className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                 <Heart size={14} fill={post.likes ? "currentColor" : "none"} /> {post.likes || 0}
               </button>
             </div>
           </div>

           <div className="h-[500px] w-full rounded-[4rem] overflow-hidden glass border border-white/10">
              <img src={post.image} className="w-full h-full object-cover" />
           </div>

           <div className="prose prose-invert max-w-none space-y-8">
              {post.excerpt && (
                <p className="text-3xl font-light text-white leading-relaxed italic border-l-4 border-teal-500 pl-10 py-4 bg-white/5 rounded-r-[2rem]">
                  "{post.excerpt}"
                </p>
              )}
              <div className="text-xl text-white/60 leading-relaxed font-light space-y-8 whitespace-pre-wrap">
                {post.description || post.content || "Contenu de l'article en cours de synchronisation avec le cloud local..."}
              </div>
           </div>

           <CommentSection post={post} />
        </article>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <AnimatePresence>
        {selectedPost && <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 glass mb-8"><Zap size={14} style={{ color: primaryColor }} /><span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Intelligence Hub</span></div>
        <h1 className="text-6xl md:text-8xl font-black font-display mb-8 text-white uppercase italic">LE <span className="text-gradient">MAGAZINE.</span></h1>
        <p className="text-white/40 text-xl max-w-2xl mx-auto font-light leading-relaxed">Décryptage, tutoriels et visions sur le futur de la technologie en Afrique.</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'}`}>{cat}</button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="group glass rounded-[3.5rem] border border-white/5 overflow-hidden flex flex-col hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"/>
                <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-[9px] font-black uppercase tracking-widest text-white border-white/10">{post.category}</div>
                <div className="absolute bottom-6 right-6 flex gap-2">
                   <button 
                    onClick={(e) => handleSave(e, post.id)}
                    className={`w-10 h-10 glass rounded-full flex items-center justify-center border-white/10 hover:bg-white/10 transition-colors ${savedPosts.includes(post.id) ? 'text-pink-500' : 'text-white'}`}
                   >
                     <Bookmark size={14} fill={savedPosts.includes(post.id) ? "currentColor" : "none"} />
                   </button>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20 mb-6">
                  <div className="flex items-center gap-2"><Calendar size={12} /> {post.date}</div>
                  <div className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</div>
                  <div className="flex items-center gap-2"><Heart size={12} /> {post.likes || 0}</div>
                </div>
                <h3 className="text-2xl font-bold mb-6 font-display leading-tight text-white group-hover:text-teal-400 transition-colors">{post.title}</h3>
                <p className="text-white/40 text-sm mb-10 font-light leading-relaxed line-clamp-3">{post.excerpt || post.description}</p>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all group-hover:gap-5" style={{ color: primaryColor }}>Lire l'article <ArrowRight size={14} /></button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        {filteredPosts.length === 0 && (
          <div className="col-span-full py-20 text-center opacity-20 uppercase font-black tracking-widest text-sm text-white">Aucun article dans cette catégorie.</div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogPage;
