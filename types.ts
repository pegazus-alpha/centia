
export type ThemeColor = 'teal' | 'pink';

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  duration: string;
  price?: string;
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
