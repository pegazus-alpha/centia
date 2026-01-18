
import { COURSES, BLOG_POSTS } from '../constants';

export const KEYS = {
  COURSES: '100_academy_courses',
  BLOG: '100_academy_blog',
  CONTACTS: '100_academy_contacts',
  WAITLIST: '100_academy_waitlist',
  STATS: '100_academy_stats',
  CATEGORIES: '100_academy_categories',
  TAGS: '100_academy_tags',
  CHAT_HISTORY: '100_academy_chat_history',
  THEME_COLOR: '100_academy_theme_preference',
  SAVED_POSTS: '100_academy_saved_posts'
};

const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Développement' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Production Vidéo' },
  { id: '4', name: 'Business & Marketing' },
  { id: '5', name: 'Intelligence Artificielle' }
];

const DEFAULT_TAGS = [
  { id: '1', name: 'Nouveau' },
  { id: '2', name: 'Populaire' },
  { id: '3', name: 'Certifiant' },
  { id: '4', name: 'Bootcamp' }
];

export const initData = () => {
  if (localStorage.getItem(KEYS.COURSES) === null) {
    localStorage.setItem(KEYS.COURSES, JSON.stringify(COURSES));
  }
  if (localStorage.getItem(KEYS.BLOG) === null) {
    // Initialiser les likes et commentaires pour les posts par défaut
    const initializedBlog = BLOG_POSTS.map(post => ({
      ...post,
      likes: post.likes || Math.floor(Math.random() * 50),
      comments: post.comments || []
    }));
    localStorage.setItem(KEYS.BLOG, JSON.stringify(initializedBlog));
  }
  if (localStorage.getItem(KEYS.CATEGORIES) === null) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (localStorage.getItem(KEYS.TAGS) === null) {
    localStorage.setItem(KEYS.TAGS, JSON.stringify(DEFAULT_TAGS));
  }
  if (localStorage.getItem(KEYS.STATS) === null) {
    localStorage.setItem(KEYS.STATS, JSON.stringify({ views: 1240, applications: 45, students: 128 }));
  }
  if (localStorage.getItem(KEYS.CONTACTS) === null) {
    localStorage.setItem(KEYS.CONTACTS, JSON.stringify([]));
  }
  if (localStorage.getItem(KEYS.SAVED_POSTS) === null) {
    localStorage.setItem(KEYS.SAVED_POSTS, JSON.stringify([]));
  }
};

export const getData = (key: string) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Error parsing data for key ${key}`, e);
    return [];
  }
};

export const saveData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('100_storage_sync', { detail: { key, data } }));
};

export const addItem = (key: string, item: any) => {
  const current = getData(key);
  const newList = [item, ...current];
  saveData(key, newList);
  return newList;
};

export const updateItem = (key: string, id: any, updatedItem: any) => {
  const current = getData(key);
  const newList = current.map((item: any) => item.id === id ? updatedItem : item);
  saveData(key, newList);
  return newList;
};

export const deleteItem = (key: string, id: any) => {
  const current = getData(key);
  const newList = current.filter((item: any) => item.id !== id);
  saveData(key, newList);
  return newList;
};

export const resetDatabase = () => {
  localStorage.clear();
  initData();
  window.location.reload();
};

export const exportFullDatabase = () => {
  const fullData: any = {};
  Object.values(KEYS).forEach(key => {
    fullData[key] = getData(key);
  });
  const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `100_academy_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
};

export const importDatabase = (jsonString: string) => {
  try {
    const importedData = JSON.parse(jsonString);
    Object.entries(importedData).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    window.location.reload();
  } catch (e) {
    throw new Error("Format de fichier invalide.");
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
