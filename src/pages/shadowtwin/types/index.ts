export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ShadowTwinFormData {
  name: string;
  currentBio: string;
  majorDecisions: string;
  dreamsNotPursued: string;
  selfie?: File;
}

export interface TimelineEvent {
  age: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  year: string;
}

export interface SocialPost {
  platform: 'instagram' | 'twitter';
  image: string;
  caption: string;
  hashtags: string[];
  likes: number;
  time: string;
}

export interface ComparisonData {
  category: string;
  realYou: string;
  shadowTwin: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'shadowtwin';
  message: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface AIServicesConfig {
  tavusApiKey?: string;
  elevenLabsApiKey?: string;
  geminiApiKey?: string;
}