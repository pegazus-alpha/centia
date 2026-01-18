
export type ThemeColor = 'teal' | 'pink';

export interface BlogComment {
  id: string;
  user: string;
  text: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  curriculum?: string[];
  icon: string;
  category: string;
  duration: string;
  price?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  description?: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  likes?: number;
  comments?: BlogComment[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum RobotState {
  IDLE = 'idle',
  WAVING = 'waving',
  THINKING = 'thinking',
  TEACHING = 'teaching',
  EXCITED = 'excited'
}
