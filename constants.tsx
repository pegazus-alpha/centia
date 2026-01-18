
import React from 'react';
import { 
  Code, Brain, Database, ShieldCheck, Palette, 
  Video, Zap, TrendingUp, Workflow, Cpu, 
  Terminal, Globe, Rocket, MessageSquare
} from 'lucide-react';
import { Course, Testimonial, BlogPost } from './types';

export const COLORS = {
  teal: {
    primary: '#0D9488',
    secondary: '#14B8A6',
    light: '#F0FDFA',
    accent: '#2DD4BF'
  },
  pink: {
    primary: '#BE185D',
    secondary: '#DB2777',
    light: '#FDF2F8',
    accent: '#F472B6'
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ia-douala-2024',
    title: 'La Révolution IA à Douala : Pourquoi maintenant ?',
    excerpt: 'Comment les entreprises locales transforment leurs workflows grâce aux agents autonomes.',
    category: 'Innovation',
    date: '14 Mars 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cursor-vs-vscode',
    title: 'Cursor vs VS Code : Le match du siècle pour les devs',
    excerpt: 'Pourquoi nous avons migré tout notre cursus développement vers Cursor AI.',
    category: 'Code',
    date: '10 Mars 2024',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'midjourney-v6-pro-tips',
    title: 'Midjourney v6 : Secrets de Prompt Engineering',
    excerpt: 'Maîtrisez la structure sref et p-code pour des visuels photoréalistes époustouflants.',
    category: 'Design',
    date: '05 Mars 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'video-gen-runway',
    title: 'Génération Vidéo : Runway Gen-3 arrive en force',
    excerpt: 'Le futur du cinéma au Cameroun passera par la génération de clips via prompts.',
    category: 'Production',
    date: '28 Fév 2024',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800'
  }
];

export const COURSES: Course[] = [
  {
    id: 'web-ia',
    title: 'Développement Web Assisté par IA',
    description: 'Devenez un Fullstack de nouvelle génération. Apprenez à piloter Cursor et Bolt.new pour construire des applications SaaS en quelques jours au lieu de mois.',
    category: 'Développement',
    duration: '3 Mois',
    icon: 'code',
    price: '250.000 FCFA'
  },
  {
    id: 'creative-ia',
    title: 'Design & Créativité IA',
    description: 'Prompt Engineering artistique. Midjourney v6, Photoshop AI et Figma AI. Créez des identités visuelles qui défient les lois du design traditionnel.',
    category: 'Design',
    duration: '2 Mois',
    icon: 'palette',
    price: '150.000 FCFA'
  },
  {
    id: 'video-ia',
    title: 'Montage Vidéo & VFX avec IA',
    description: 'Cinéma synthétique. Maîtrisez Runway Gen-3 et Luma Dream Machine pour produire des publicités et courts-métrages sans caméra.',
    category: 'Production',
    duration: '2 Mois',
    icon: 'video',
    price: '200.000 FCFA'
  },
  {
    id: 'ia-marketing',
    title: 'Marketing Digital & IA Générative',
    description: 'Automatisation totale. De la stratégie de contenu au SEO piloté par IA. Multipliez votre productivité marketing par 10.',
    category: 'Business',
    duration: '1.5 Mois',
    icon: 'trending',
    price: '125.000 FCFA'
  },
  {
    id: 'automation-business',
    title: 'No-Code & Automatisation IA',
    description: 'Bâtissez des systèmes autonomes avec Make et Zapier. Connectez vos données métier à des LLM personnalisés.',
    category: 'Expert',
    duration: '2 Mois',
    icon: 'workflow',
    price: '180.000 FCFA'
  },
  {
    id: 'data-science',
    title: 'Data Science & IA Appliquée',
    description: 'De la donnée brute aux modèles prédictifs. Python, TensorFlow et déploiement de modèles de Machine Learning.',
    category: 'Expert',
    duration: '6 Mois',
    icon: 'database',
    price: '450.000 FCFA'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Samuel Eto'o",
    role: "Entrepreneur Digital",
    content: "L'académie m'a permis de comprendre que le futur de l'Afrique se joue dans le code et l'IA. Un centre d'excellence indispensable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Marie-Louise NGO",
    role: "Freelance Designer",
    content: "Grâce à la formation Creative IA, je livre mes logos en 48h au lieu de 2 semaines. Mes clients sont bluffés.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Brice Fotso",
    role: "Lead Développeur",
    content: "L'apprentissage avec Cursor AI a transformé ma façon de travailler. Je ne code plus, je pilote des agents.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];
