import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Calendar, MessageSquare, Briefcase, Heart, ArrowLeft, Sparkles, Video, Mic, User, Camera, Download, Share2, RotateCcw, Instagram, Twitter, MapPin, Trophy, Clock, Send, Pause, Settings, Eye, Brain, Zap, Star, Globe, TrendingUp, Users, Award } from 'lucide-react';
import { useAIServices } from '../hooks/useAIServices';
import VideoGenerationPanel from '../components/VideoGenerationPanel';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface FormData {
  name: string;
  currentBio: string;
  majorDecisions: string;
  dreamsNotPursued: string;
  selfie?: File;
}

interface TimelineEvent {
  age: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  year: string;
  impact: string;
}

interface SocialPost {
  platform: 'instagram' | 'twitter';
  image: string;
  caption: string;
  hashtags: string[];
  likes: number;
  time: string;
}

interface ComparisonData {
  category: string;
  realYou: string;
  shadowTwin: string;
  icon: React.ReactNode;
  impact: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'shadowtwin';
  message: string;
  timestamp: Date;
  audioUrl?: string;
}

interface LifeInsight {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// ... rest of the code remains exactly the same ...

export default ShadowTwin;