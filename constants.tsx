
import React from 'react';
import { 
  Code, 
  Brain, 
  Database, 
  ShieldCheck, 
  Palette, 
  Video, 
  Image as ImageIcon, 
  Layers,
  Zap,
  TrendingUp,
  Workflow
} from 'lucide-react';
import { Course, Testimonial } from './types';

export const COLORS = {
  teal: {
    primary: '#008B8B',
    secondary: '#20B2AA',
    light: '#E0F2F2',
    accent: '#00CED1'
  },
  pink: {
    primary: '#E91E63',
    secondary: '#FF1493',
    light: '#FCE4EC',
    accent: '#FF4081'
  }
};

export const COURSES: Course[] = [
  {
    id: 'web-ia',
    title: 'Développement Web Assisté par IA',
    description: 'Créez des sites ultra-rapides et intelligents en utilisant Cursor, GitHub Copilot et Bolt.new. Apprenez à transformer des prompts en code complexe.',
    category: 'Développement',
    duration: '3 Mois',
    icon: 'code',
    price: '250.000 FCFA'
  },
  {
    id: 'creative-ia',
    title: 'Design & Créativité IA',
    description: 'Maîtrisez Midjourney v6, Canva Magic et Figma AI. Apprenez le prompt engineering appliqué au design de marque et à la publicité.',
    category: 'Design',
    duration: '2 Mois',
    icon: 'palette',
    price: '150.000 FCFA'
  },
  {
    id: 'video-ia',
    title: 'Montage Vidéo & VFX avec IA',
    description: 'Utilisez Runway Gen-3, Pika et Luma. Génération de clips, lip-syncing IA et effets spéciaux sans station de travail coûteuse.',
    category: 'Production',
    duration: '2 Mois',
    icon: 'video',
    price: '200.000 FCFA'
  },
  {
    id: 'ia-marketing',
    title: 'Marketing Digital & IA Générative',
    description: 'Automatisez votre création de contenu, analysez les tendances avec l\'IA et multipliez votre portée organique par 10.',
    category: 'Business',
    duration: '1.5 Mois',
    icon: 'trending',
    price: '125.000 FCFA'
  },
  {
    id: 'automation-business',
    title: 'No-Code & Automatisation IA',
    description: 'Connectez ChatGPT à vos outils métiers via Zapier et Make. Créez des workflows qui travaillent pour vous 24/7.',
    category: 'Expert',
    duration: '2 Mois',
    icon: 'workflow',
    price: '180.000 FCFA'
  },
  {
    id: 'data-science',
    title: 'Data Science & IA Appliquée',
    description: 'Analyse de données massives et création de modèles prédictifs avec Python et TensorFlow. Devenez un expert Data au Cameroun.',
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
    content: "L'académie m'a permis de réduire mes coûts de production de 70% grâce aux outils d'IA générative. Un game changer.",
    image: "https://picsum.photos/seed/sam/200/200"
  },
  {
    id: 2,
    name: "Marie-Louise NGO",
    role: "Freelance Designer",
    content: "Une formation pratique qui change tout. Le robot assistant est juste incroyable pour apprendre à son rythme !",
    image: "https://picsum.photos/seed/marie/200/200"
  },
  {
    id: 3,
    name: "Brice Fotso",
    role: "Développeur Fullstack",
    content: "Apprendre à coder avec l'IA est le meilleur investissement que j'ai fait cette année. Les mentors sont top.",
    image: "https://picsum.photos/seed/brice/200/200"
  }
];
