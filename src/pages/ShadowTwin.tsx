import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Calendar, MessageSquare, Briefcase, Heart, ArrowLeft, Sparkles, Video, Mic, User, Camera, Download, Share2, RotateCcw, Instagram, Twitter, MapPin, Trophy, Clock, Send, Pause, Settings, Star, CheckCircle, Users, Award, Globe, Zap, Shield, Brain } from 'lucide-react';
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
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'shadowtwin';
  message: string;
  timestamp: Date;
  audioUrl?: string;
}

// API Configuration Component
const APIConfigModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: { tavusApiKey: string; elevenLabsApiKey: string }) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [tavusApiKey, setTavusApiKey] = useState('9acf3d70659349aab5cb638470978303');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ tavusApiKey, elevenLabsApiKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 max-w-md w-full mx-4">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Settings className="text-violet-400" size={20} />
          AI Service Configuration
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Tavus API Key
            </label>
            <input
              type="password"
              value={tavusApiKey}
              onChange={(e) => setTavusApiKey(e.target.value)}
              placeholder="Enter your Tavus API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none text-sm"
            />
            <p className="text-gray-400 text-xs mt-1">For AI video generation</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              ElevenLabs API Key
            </label>
            <input
              type="password"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              placeholder="Enter your ElevenLabs API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none text-sm"
            />
            <p className="text-gray-400 text-xs mt-1">For AI voice generation</p>
          </div>

          <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-3">
            <p className="text-green-300 text-xs">
              <strong>✅ API Keys Configured:</strong> Your Tavus and ElevenLabs keys are pre-loaded and ready to use!
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-transform text-sm"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

// Voice Message Component
const VoiceMessage: React.FC<{ 
  message: string; 
  audioUrl?: string;
  isPlaying: boolean; 
  onToggle: () => void;
  isGenerating?: boolean;
}> = ({ 
  message, 
  audioUrl,
  isPlaying, 
  onToggle,
  isGenerating = false
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl && !audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', onToggle);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', onToggle);
      }
    };
  }, [audioUrl, onToggle]);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      onToggle();
    } else {
      // Fallback for demo mode
      onToggle();
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          disabled={isGenerating}
          className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 disabled:opacity-50 flex-shrink-0"
        >
          {isGenerating ? (
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="text-white" size={16} />
          ) : (
            <Play className="text-white ml-1" size={16} />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium mb-1 text-sm md:text-base">Voice Message from ShadowTwin</p>
          <p className="text-gray-300 text-xs md:text-sm break-words">{message}</p>
          {isPlaying && (
            <div className="flex items-center gap-1 mt-2">
              <div className="w-1 h-3 md:h-4 bg-violet-400 rounded animate-pulse" />
              <div className="w-1 h-4 md:h-6 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
              <div className="w-1 h-2 md:h-3 bg-cyan-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-4 md:h-5 bg-violet-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="text-violet-400 text-xs ml-2">Playing...</span>
            </div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Mic size={10} />
            <span className="hidden sm:inline">{audioUrl ? 'ElevenLabs' : 'Demo'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Interface Component
const ChatInterface: React.FC<{ 
  formData: FormData;
  generateVoiceResponse: (message: string, formData: FormData) => Promise<string | null>;
}> = ({ formData, generateVoiceResponse }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'shadowtwin',
      message: `Hello ${formData.name}! I'm your ShadowTwin - the version of you that chose the creative path. I'm living in Barcelona as a photographer. What would you like to know about this life?`,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [generatingVoice, setGeneratingVoice] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate ShadowTwin response
    setTimeout(async () => {
      const responses = [
        "The creative life has been incredible! Every day I wake up excited about the stories I'll capture through my lens.",
        "Barcelona changed everything for me. The art scene here is so vibrant, and I've connected with amazing artists from around the world.",
        "Sometimes I wonder about the stability I gave up, but the fulfillment I get from my work makes it all worth it.",
        "My latest documentary series has opened doors I never imagined. National Geographic wants to feature my work!",
        "The freedom to travel and document different cultures has been the greatest gift of this path."
      ];

      const responseText = responses[Math.floor(Math.random() * responses.length)];
      const messageId = (Date.now() + 1).toString();

      const shadowResponse: ChatMessage = {
        id: messageId,
        sender: 'shadowtwin',
        message: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, shadowResponse]);
      setIsTyping(false);

      // Generate voice for the response
      setGeneratingVoice(messageId);
      try {
        const audioUrl = await generateVoiceResponse(responseText, formData);
        if (audioUrl) {
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, audioUrl } : msg
          ));
        }
      } catch (error) {
        console.error('Error generating voice:', error);
      } finally {
        setGeneratingVoice(null);
      }
    }, 2000);
  };

  const toggleVoicePlayback = (messageId: string) => {
    if (playingVoice === messageId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(messageId);
      // Simulate voice playback duration
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3">
        <MessageSquare className="text-violet-400" size={20} />
        Chat with Your ShadowTwin
      </h3>

      <div className="h-64 md:h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-violet-500/20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-xs lg:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white' 
                : 'bg-black/40 border border-white/10 text-white'
            }`}>
              <p className="text-xs md:text-sm break-words">{message.message}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.sender === 'shadowtwin' && (
                  <button
                    onClick={() => toggleVoicePlayback(message.id)}
                    disabled={generatingVoice === message.id}
                    className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors duration-200 disabled:opacity-50"
                    title="Play voice message"
                  >
                    {generatingVoice === message.id ? (
                      <div className="w-3 h-3 border border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                    ) : playingVoice === message.id ? (
                      <Pause size={10} className="text-violet-400" />
                    ) : (
                      <Play size={10} className="text-gray-400 hover:text-violet-400" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-black/40 border border-white/10 text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="text-gray-400 text-xs md:text-sm ml-2">ShadowTwin is typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 md:gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask your ShadowTwin anything..."
          className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/20 text-sm md:text-base"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 text-sm md:text-base"
        >
          <Send size={14} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};

const FormSection: React.FC<{
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
}> = ({ formData, setFormData, onSubmit }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, selfie: file });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
          Tell Us About
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Your Story</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Share your journey, decisions, and dreams. Our AI will create a parallel universe where you made different choices.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {/* Name Input */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <User size={18} className="text-violet-400" />
            What's your name?
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full p-3 md:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all duration-300 text-sm md:text-base"
          />
        </div>

        {/* Current Bio */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <MessageSquare size={18} className="text-blue-400" />
            Tell us about your current life
          </label>
          <textarea
            value={formData.currentBio}
            onChange={(e) => setFormData({ ...formData, currentBio: e.target.value })}
            placeholder="Describe your background, education, career, relationships, and current situation..."
            rows={4}
            className="w-full p-3 md:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none text-sm md:text-base"
          />
        </div>

        {/* Major Decisions */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <Briefcase size={18} className="text-teal-400" />
            What major life decisions did you make?
          </label>
          <textarea
            value={formData.majorDecisions}
            onChange={(e) => setFormData({ ...formData, majorDecisions: e.target.value })}
            placeholder="Career choices, where you moved, relationships, education paths, financial decisions..."
            rows={4}
            className="w-full p-3 md:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 resize-none text-sm md:text-base"
          />
        </div>

        {/* Dreams Not Pursued */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <Sparkles size={18} className="text-pink-400" />
            What dreams did you not pursue?
          </label>
          <textarea
            value={formData.dreamsNotPursued}
            onChange={(e) => setFormData({ ...formData, dreamsNotPursued: e.target.value })}
            placeholder="Creative pursuits, travel dreams, business ideas, alternative careers, relationships..."
            rows={4}
            className="w-full p-3 md:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 resize-none text-sm md:text-base"
          />
        </div>

        {/* Selfie Upload */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2 text-sm md:text-base">
            <Camera size={18} className="text-cyan-400" />
            Upload a photo (optional)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="selfie-upload"
            />
            <label
              htmlFor="selfie-upload"
              className="flex items-center justify-center w-full p-6 md:p-8 bg-black/30 backdrop-blur-md border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <Upload size={24} className="md:w-8 md:h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-medium text-sm md:text-base">
                  {formData.selfie ? formData.selfie.name : 'Click to upload your photo'}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  This helps create a more personalized simulation
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6 md:pt-8">
          <button
            onClick={onSubmit}
            disabled={!formData.name || !formData.currentBio || !formData.majorDecisions || !formData.dreamsNotPursued}
            className="group relative px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-full text-white font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-3 justify-center">
              <Sparkles size={20} />
              Simulate My ShadowTwin
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TimelineSection: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="mb-12 md:mb-16 px-4 md:px-6">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Your Alternate
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Timeline</span>
      </h3>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500 rounded-full" />
        
        <div className="space-y-8 md:space-y-12">
          {events.map((event, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-12 md:pl-0`}>
                <div className="p-4 md:p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {event.icon}
                    </div>
                    <div>
                      <p className="text-violet-400 font-bold text-sm md:text-base">Age {event.age}</p>
                      <p className="text-gray-400 text-xs md:text-sm">{event.year}</p>
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-base md:text-lg mb-2">{event.title}</h4>
                  <p className="text-gray-300 text-sm md:text-base">{event.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-2.5 md:relative md:left-0 z-10 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full border-4 border-black flex-shrink-0" />
              
              <div className="hidden md:block w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoMessage: React.FC<{ 
  videoUrl?: string; 
  audioUrls: string[];
  isGenerating: boolean;
}> = ({ videoUrl, audioUrls, isGenerating }) => {
  const [playingVoice, setPlayingVoice] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const voiceMessages = [
    "Hey there! It's incredible to see you. I'm living the creative life we always dreamed about.",
    "Barcelona has been amazing. Every sunrise brings new inspiration for my photography.",
    "I know you sometimes wonder about the path not taken. I'm here to show you it's beautiful too."
  ];

  return (
    <div className="mb-12 md:mb-16 px-4 md:px-6">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Message from Your
        <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"> ShadowTwin</span>
      </h3>
      
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <div className="relative aspect-video bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-teal-900/20 rounded-2xl border border-white/10 overflow-hidden group">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-cover"
              poster="/api/placeholder/800/450"
            />
          ) : (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <div className="text-center">
                {isGenerating ? (
                  <>
                    <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4 md:mb-6 mx-auto" />
                    <h4 className="text-white font-bold text-lg md:text-xl mb-3">Generating AI Video...</h4>
                    <p className="text-gray-300 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
                      Creating your personalized ShadowTwin video using Tavus AI
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Play className="text-white ml-1" size={24} />
                    </div>
                    <h4 className="text-white font-bold text-lg md:text-xl mb-3">AI-Generated Video Message</h4>
                    <p className="text-gray-300 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
                      Watch yourself in an alternate reality, speaking about the life you could have lived
                    </p>
                  </>
                )}
                <div className="flex items-center justify-center gap-4 text-xs md:text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Video size={14} className="text-violet-400" />
                    <span>Tavus AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic size={14} className="text-blue-400" />
                    <span>ElevenLabs Voice</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Voice Messages */}
        <div className="space-y-4">
          {voiceMessages.map((message, index) => (
            <VoiceMessage
              key={index}
              message={message}
              audioUrl={audioUrls[index]}
              isPlaying={playingVoice && currentAudioIndex === index}
              onToggle={() => {
                setPlayingVoice(!playingVoice);
                setCurrentAudioIndex(index);
              }}
              isGenerating={isGenerating && !audioUrls[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SocialFeed: React.FC<{ posts: SocialPost[] }> = ({ posts }) => {
  return (
    <div className="mb-12 md:mb-16 px-4 md:px-6">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Your Shadow
        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"> Social Life</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {posts.map((post, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-violet-400/30 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
              <div className="text-center text-gray-400">
                {post.platform === 'instagram' ? <Instagram size={32} /> : <Twitter size={32} />}
                <p className="mt-2 text-xs md:text-sm">AI-Generated Image</p>
              </div>
            </div>
            
            <div className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-3">
                {post.platform === 'instagram' ? 
                  <Instagram size={14} className="text-pink-400" /> : 
                  <Twitter size={14} className="text-blue-400" />
                }
                <span className="text-gray-400 text-xs md:text-sm">{post.time}</span>
              </div>
              
              <p className="text-white mb-3 text-sm md:text-base">{post.caption}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {post.hashtags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-violet-400 text-xs md:text-sm">#{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                <Heart size={12} />
                <span>{post.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComparisonTable: React.FC<{ data: ComparisonData[] }> = ({ data }) => {
  return (
    <div className="mb-12 md:mb-16 px-4 md:px-6">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Real You vs
        <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"> ShadowTwin</span>
      </h3>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-4 md:gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 hover:border-teal-400/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-base md:text-lg">{item.category}</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-3 md:p-4 bg-black/20 rounded-lg border border-white/5">
                  <h5 className="text-gray-400 font-medium mb-2 text-sm md:text-base">Real You</h5>
                  <p className="text-white text-sm md:text-base">{item.realYou}</p>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg border border-violet-400/20">
                  <h5 className="text-violet-400 font-medium mb-2 text-sm md:text-base">ShadowTwin</h5>
                  <p className="text-white text-sm md:text-base">{item.shadowTwin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReflectionSection: React.FC<{ onTryAgain: () => void }> = ({ onTryAgain }) => {
  return (
    <div className="mb-12 md:mb-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="p-6 md:p-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            What Would You Do
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Differently Today?</span>
          </h3>
          
          <blockquote className="text-lg md:text-xl text-gray-300 italic mb-6 md:mb-8 max-w-2xl mx-auto">
            "Seeing your ShadowTwin isn't about regret—it's about understanding the infinite possibilities that still exist within you."
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button
              onClick={onTryAgain}
              className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center text-sm md:text-base"
            >
              <RotateCcw size={16} />
              Try Different Choices
            </button>
            
            <button className="px-6 md:px-8 py-2 md:py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center text-sm md:text-base">
              <Download size={16} />
              Download Report
            </button>
            
            <button className="px-6 md:px-8 py-2 md:py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center text-sm md:text-base">
              <Share2 size={16} />
              Share ShadowTwin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC<{ onBeginJourney: () => void }> = ({ onBeginJourney }) => {
  const testimonials = [
    {
      text: "ShadowTwin helped me understand the creative path I never took. It gave me the confidence to start my side business while keeping my day job.",
      author: "Sarah Chen",
      role: "Product Manager",
      avatar: <User className="text-blue-400" size={16} />
    },
    {
      text: "The insights were incredibly valuable. I now have a clear understanding of my alternate possibilities and feel more confident about my choices.",
      author: "Marcus Rodriguez",
      role: "Investment Banker", 
      avatar: <Briefcase className="text-green-400" size={16} />
    }
  ];

  const tutorialSteps = [
    {
      icon: <User className="text-violet-400" size={20} />,
      title: "Share Your Story",
      description: "Tell us about your life, decisions, and dreams you didn't pursue"
    },
    {
      icon: <Brain className="text-blue-400" size={20} />,
      title: "AI Analysis",
      description: "Our advanced AI creates an alternate version of your life path"
    },
    {
      icon: <Video className="text-cyan-400" size={20} />,
      title: "Meet Your Twin",
      description: "Interact with your ShadowTwin through video, voice, and chat"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-6 py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-cyan-900/20" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-violet-400/20 to-cyan-400/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* CTA Button at Top */}
        <div className="mb-8 md:mb-12">
          <button
            onClick={onBeginJourney}
            className="group relative px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-full text-white font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 mb-4"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles size={20} />
              Begin Your Journey
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-yellow-400" />
              Free to start
            </span>
            <span className="flex items-center gap-1">
              <Shield size={12} className="text-green-400" />
              Privacy protected
            </span>
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-blue-400" />
              Results in minutes
            </span>
          </p>
        </div>

        {/* Main Title - Compact */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Meet Your
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"> ShadowTwin</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            An AI-simulated version of the life you never lived. Explore alternate realities and discover who you could have become.
          </p>
        </div>

        {/* Tutorial Steps */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {tutorialSteps.map((step, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 hover:border-violet-400/30 transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-white font-bold text-base md:text-lg mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={14} />
                  ))}
                </div>
                <blockquote className="text-gray-300 text-sm md:text-base italic mb-4">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <cite className="text-white font-semibold text-sm not-italic">{testimonial.author}</cite>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">10,000+</div>
            <div className="text-gray-400 text-xs md:text-sm">Simulations Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">4.9/5</div>
            <div className="text-gray-400 text-xs md:text-sm">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">95%</div>
            <div className="text-gray-400 text-xs md:text-sm">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">5 min</div>
            <div className="text-gray-400 text-xs md:text-sm">Average Setup</div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Ready to Meet Your
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-semibold"> ShadowTwin?</span>
          </p>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Embark on a journey of self-discovery and explore the infinite possibilities that exist within you.
          </p>
        </div>
      </div>
    </div>
  );
};

interface ShadowTwinProps {
  onBack: () => void;
  user: User | null;
}

const ShadowTwin: React.FC<ShadowTwinProps> = ({ onBack, user }) => {
  const [currentStep, setCurrentStep] = useState('hero'); // 'hero', 'form', 'generating', 'results'
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    currentBio: '',
    majorDecisions: '',
    dreamsNotPursued: ''
  });
  const [showAPIConfig, setShowAPIConfig] = useState(false);
  const [apiConfig, setApiConfig] = useState<{ tavusApiKey: string; elevenLabsApiKey: string }>({
    tavusApiKey: '9acf3d70659349aab5cb638470978303',
    elevenLabsApiKey: 'sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d'
  });
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const { 
    isGenerating, 
    videoUrl, 
    audioUrls, 
    error, 
    generateShadowTwinContent, 
    generateVoiceResponse 
  } = useAIServices(apiConfig);

  const handleBeginJourney = () => {
    setCurrentStep('form');
  };

  const handleSubmit = async () => {
    setCurrentStep('generating');
    
    try {
      await generateShadowTwinContent(formData);
      setTimeout(() => {
        setCurrentStep('results');
      }, 2000);
    } catch (error) {
      console.error('Error generating ShadowTwin:', error);
      // Still proceed to results for demo
      setTimeout(() => {
        setCurrentStep('results');
      }, 2000);
    }
  };

  const handleTryAgain = () => {
    setCurrentStep('hero');
    setFormData({
      name: user?.name || '',
      currentBio: '',
      majorDecisions: '',
      dreamsNotPursued: ''
    });
    setGeneratedVideoUrl(null);
  };

  const handleAPIConfig = (config: { tavusApiKey: string; elevenLabsApiKey: string }) => {
    setApiConfig(config);
  };

  const handleVideoGenerated = (videoUrl: string) => {
    setGeneratedVideoUrl(videoUrl);
  };

  // Mock data for the simulation results
  const timelineEvents: TimelineEvent[] = [
    {
      age: 22,
      year: '2018',
      title: 'Moved to Barcelona',
      description: 'Left corporate job to pursue photography in Spain',
      icon: <MapPin className="text-white" size={12} />
    },
    {
      age: 24,
      year: '2020',
      title: 'First Gallery Exhibition',
      description: 'Solo photography exhibition "Urban Souls" featured in Barcelona Modern Art Gallery',
      icon: <Camera className="text-white" size={12} />
    },
    {
      age: 26,
      year: '2022',
      title: 'Travel Documentary Series',
      description: 'Created award-winning documentary series about street artists across Europe',
      icon: <Video className="text-white" size={12} />
    },
    {
      age: 28,
      year: '2024',
      title: 'International Recognition',
      description: 'Photography featured in National Geographic, established creative studio',
      icon: <Trophy className="text-white" size={12} />
    }
  ];

  const socialPosts: SocialPost[] = [
    {
      platform: 'instagram',
      image: '',
      caption: 'Golden hour in Barcelona never gets old. Every street tells a story. 📸✨',
      hashtags: ['photography', 'barcelona', 'streetart', 'goldenhour'],
      likes: 2847,
      time: '2h ago'
    },
    {
      platform: 'twitter',
      image: '',
      caption: 'Just wrapped filming for the new documentary series. The stories these artists shared... incredible.',
      hashtags: ['documentary', 'streetart', 'storytelling'],
      likes: 1203,
      time: '1d ago'
    },
    {
      platform: 'instagram',
      image: '',
      caption: 'Studio life. Coffee, creativity, and endless possibilities. What are you creating today?',
      hashtags: ['studio', 'creativity', 'photography', 'inspiration'],
      likes: 3156,
      time: '3d ago'
    }
  ];

  const comparisonData: ComparisonData[] = [
    {
      category: 'Career',
      realYou: 'Software Engineer at tech company',
      shadowTwin: 'Award-winning photographer and documentary filmmaker',
      icon: <Briefcase className="text-white" size={16} />
    },
    {
      category: 'Location',
      realYou: 'Living in hometown',
      shadowTwin: 'Based in Barcelona, travels across Europe',
      icon: <MapPin className="text-white" size={16} />
    },
    {
      category: 'Key Achievements',
      realYou: 'Stable income, good work-life balance',
      shadowTwin: 'National Geographic feature, gallery exhibitions, documentary awards',
      icon: <Trophy className="text-white" size={16} />
    },
    {
      category: 'Lifestyle',
      realYou: 'Routine-focused, security-oriented',
      shadowTwin: 'Adventure-driven, creatively fulfilled, internationally connected',
      icon: <Heart className="text-white" size={16} />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* API Configuration Modal */}
      <APIConfigModal
        isOpen={showAPIConfig}
        onClose={() => setShowAPIConfig(false)}
        onSave={handleAPIConfig}
      />

      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={onBack}
              className="p-2 md:p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </button>
            
            <button
              onClick={() => setShowAPIConfig(true)}
              className="p-2 md:p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
              title="Configure AI Services"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="fixed top-20 left-4 right-4 md:left-6 md:right-6 z-40 p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
          <p className="text-yellow-300 text-sm">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16 md:pt-20">
        {currentStep === 'hero' && (
          <HeroSection onBeginJourney={handleBeginJourney} />
        )}

        {currentStep === 'form' && (
          <div className="py-12 md:py-20">
            <FormSection
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {currentStep === 'generating' && (
          <div className="min-h-screen flex items-center justify-center py-20">
            <div className="text-center py-20 px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-spin" style={{ animationDuration: '3s' }}>
                    <div className="absolute inset-2 rounded-full bg-black" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-violet-400" size={32} />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                  Generating Your
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> ShadowTwin</span>
                </h2>
                
                <div className="space-y-3 md:space-y-4 text-gray-300">
                  <p className="flex items-center justify-center gap-2 text-sm md:text-base">
                    <Clock size={14} className="text-violet-400" />
                    Analyzing your life choices...
                  </p>
                  <p className="flex items-center justify-center gap-2 text-sm md:text-base">
                    <Video size={14} className="text-blue-400" />
                    Creating alternate timeline...
                  </p>
                  <p className="flex items-center justify-center gap-2 text-sm md:text-base">
                    <Mic size={14} className="text-cyan-400" />
                    Generating AI persona...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'results' && (
          <div className="py-12 md:py-20">
            <TimelineSection events={timelineEvents} />
            
            {/* Video Generation Panel */}
            <div className="px-4 md:px-6 mb-12 md:mb-16">
              <VideoGenerationPanel
                formData={formData}
                onVideoGenerated={handleVideoGenerated}
                tavusApiKey={apiConfig.tavusApiKey}
              />
            </div>
            
            <VideoMessage 
              videoUrl={generatedVideoUrl || videoUrl} 
              audioUrls={audioUrls}
              isGenerating={isGenerating}
            />
            <SocialFeed posts={socialPosts} />
            <ComparisonTable data={comparisonData} />
            <div className="px-4 md:px-6 mb-12 md:mb-16">
              <ChatInterface 
                formData={formData}
                generateVoiceResponse={generateVoiceResponse}
              />
            </div>
            <ReflectionSection onTryAgain={handleTryAgain} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTwin;