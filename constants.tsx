
import React from 'react';
import { 
  Code, 
  Brain, 
  Database, 
  ShieldCheck, 
  Palette, 
  Video, 
  Image as ImageIcon, 
  Layers 
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
    description: 'Créez des sites ultra-rapides et intelligents en utilisant Cursor, GitHub Copilot et Bolt.new.',
    category: 'Développement',
    duration: '3 Mois',
    icon: 'code'
  },
  {
    id: 'creative-ia',
    title: 'Design & Créativité IA',
    description: 'Maîtrisez Midjourney, Canva Magic et Figma AI pour des designs professionnels en un temps record.',
    category: 'Design',
    duration: '2 Mois',
    icon: 'palette'
  },
  {
    id: 'video-ia',
    title: 'Montage Vidéo & VFX avec IA',
    description: 'Utilisez Runway Gen-2, Pika et Luma pour créer des vidéos cinématographiques sans matériel coûteux.',
    category: 'Production',
    duration: '2 Mois',
    icon: 'video'
  },
  {
    id: 'data-science',
    title: 'Data Science & IA',
    description: 'Analyse de données massives et création de modèles prédictifs avec Python et TensorFlow.',
    category: 'Expert',
    duration: '6 Mois',
    icon: 'database'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Samuel Eto'o",
    role: "Entrepreneur Digital",
    content: "L'académie m'a permis de réduire mes coûts de production de 70% grâce aux outils d'IA générative.",
    image: "https://picsum.photos/seed/sam/200/200"
  },
  {
    id: 2,
    name: "Marie-Louise NGO",
    role: "Freelance Designer",
    content: "Une formation pratique qui change tout. Le robot assistant est juste incroyable pour apprendre !",
    image: "https://picsum.photos/seed/marie/200/200"
  },
  {
    id: 3,
    name: "Brice Fotso",
    role: "Développeur Fullstack",
    content: "Apprendre à coder avec l'IA est le meilleur investissement que j'ai fait cette année. 100% validé.",
    image: "https://picsum.photos/seed/brice/200/200"
  }
];
