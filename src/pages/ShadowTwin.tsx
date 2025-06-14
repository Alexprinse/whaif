import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Calendar, MessageSquare, Briefcase, Heart, ArrowLeft, Sparkles, Video, Mic, User, Camera, Download, Share2, RotateCcw, Instagram, Twitter, MapPin, Trophy, Clock, Send, Pause, Settings } from 'lucide-react';
import { useAIServices } from '../hooks/useAIServices';
import VideoGenerationPanel from '../components/VideoGenerationPanel';
import ShadowTwinInputModal from '../components/ShadowTwinInputModal';

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
  onSave: (config: { tavusApiKey: string; elevenLabsApiKey: string; geminiApiKey: string }) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [tavusApiKey, setTavusApiKey] = useState('9acf3d70659349aab5cb638470978303');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d');
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSyA6QBBNKfsbQb2Xq5iQQ57krHfSsxFywxc');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ tavusApiKey, elevenLabsApiKey, geminiApiKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Settings className="text-violet-400" size={24} />
          AI Service Configuration
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-green-400/50 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">For AI content generation and chat</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Tavus API Key
            </label>
            <input
              type="password"
              value={tavusApiKey}
              onChange={(e) => setTavusApiKey(e.target.value)}
              placeholder="Enter your Tavus API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">For AI video generation</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              ElevenLabs API Key
            </label>
            <input
              type="password"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              placeholder="Enter your ElevenLabs API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">For AI voice generation</p>
          </div>

          <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4">
            <p className="text-green-300 text-sm">
              <strong>✅ Gemini API Configured:</strong> Your Google Gemini API key is pre-loaded and ready to generate personalized content!
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-transform"
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
          className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="text-white" size={20} />
          ) : (
            <Play className="text-white ml-1" size={20} />
          )}
        </button>
        <div className="flex-1">
          <p className="text-white font-medium mb-1">Voice Message from ShadowTwin</p>
          <p className="text-gray-300 text-sm">{message}</p>
          {isPlaying && (
            <div className="flex items-center gap-1 mt-2">
              <div className="w-1 h-4 bg-violet-400 rounded animate-pulse" />
              <div className="w-1 h-6 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
              <div className="w-1 h-3 bg-cyan-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-5 bg-violet-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="text-violet-400 text-xs ml-2">Playing...</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Mic size={12} />
            <span>{audioUrl ? 'ElevenLabs' : 'Demo'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Interface Component
const ChatInterface: React.FC<{ 
  formData: FormData;
  generateChatResponse: (message: string, formData: FormData, history: string[]) => Promise<{ text: string; audioUrl?: string }>;
}> = ({ formData, generateChatResponse }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'shadowtwin',
      message: `Hello ${formData.name}! I'm your ShadowTwin - the version of you that chose to pursue ${formData.dreamsNotPursued || 'those dreams you set aside'}. What would you like to know about this alternate life?`,
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
    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    try {
      // Build conversation history
      const history = messages.slice(-6).map(msg => 
        `${msg.sender === 'user' ? 'User' : 'ShadowTwin'}: ${msg.message}`
      );

      // Generate AI response
      const response = await generateChatResponse(currentMessage, formData, history);
      
      const messageId = (Date.now() + 1).toString();
      const shadowResponse: ChatMessage = {
        id: messageId,
        sender: 'shadowtwin',
        message: response.text,
        timestamp: new Date(),
        audioUrl: response.audioUrl
      };

      setMessages(prev => [...prev, shadowResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback response
      const fallbackResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'shadowtwin',
        message: "I'm having trouble connecting right now, but I'd love to continue our conversation. The path I chose has been quite a journey!",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
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
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <MessageSquare className="text-violet-400" size={24} />
        Chat with Your ShadowTwin
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full">AI-Powered</span>
      </h3>

      <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-violet-500/20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white' 
                : 'bg-black/40 border border-white/10 text-white'
            }`}>
              <p className="text-sm">{message.message}</p>
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
                      <Pause size={12} className="text-violet-400" />
                    ) : (
                      <Play size={12} className="text-gray-400 hover:text-violet-400" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-black/40 border border-white/10 text-white px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="text-gray-400 text-sm ml-2">ShadowTwin is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask your ShadowTwin anything..."
          className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isTyping}
          className="px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
};

const TimelineSection: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Your Alternate
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Timeline</span>
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full ml-3">AI-Generated</span>
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500 rounded-full" />
        
        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {event.icon}
                    </div>
                    <div>
                      <p className="text-violet-400 font-bold">Age {event.age}</p>
                      <p className="text-gray-400 text-sm">{event.year}</p>
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{event.title}</h4>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="relative z-10 w-6 h-6 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full border-4 border-black flex-shrink-0" />
              
              <div className="w-5/12" />
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
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Message from Your
        <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"> ShadowTwin</span>
      </h3>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative aspect-video bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-teal-900/20 rounded-2xl border border-white/10 overflow-hidden group">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-cover"
              poster="/api/placeholder/800/450"
            />
          ) : (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                {isGenerating ? (
                  <>
                    <div className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-6 mx-auto" />
                    <h4 className="text-white font-bold text-xl mb-3">Generating AI Video...</h4>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                      Creating your personalized ShadowTwin video using Tavus AI
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Play className="text-white ml-1" size={32} />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-3">AI-Generated Video Message</h4>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                      Watch yourself in an alternate reality, speaking about the life you could have lived
                    </p>
                  </>
                )}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-violet-400" />
                    <span>Tavus AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic size={16} className="text-blue-400" />
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
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Your Shadow
        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"> Social Life</span>
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full ml-3">AI-Generated</span>
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-violet-400/30 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
              <div className="text-center text-gray-400">
                {post.platform === 'instagram' ? <Instagram size={48} /> : <Twitter size={48} />}
                <p className="mt-2 text-sm">AI-Generated Content</p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                {post.platform === 'instagram' ? 
                  <Instagram size={16} className="text-pink-400" /> : 
                  <Twitter size={16} className="text-blue-400" />
                }
                <span className="text-gray-400 text-sm">{post.time}</span>
              </div>
              
              <p className="text-white mb-3">{post.caption}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {post.hashtags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-violet-400 text-sm">#{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Heart size={14} />
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
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Real You vs
        <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"> ShadowTwin</span>
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full ml-3">AI-Generated</span>
      </h3>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-teal-400/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-lg">{item.category}</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                  <h5 className="text-gray-400 font-medium mb-2">Real You</h5>
                  <p className="text-white">{item.realYou}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg border border-violet-400/20">
                  <h5 className="text-violet-400 font-medium mb-2">ShadowTwin</h5>
                  <p className="text-white">{item.shadowTwin}</p>
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
    <div className="mb-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="p-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            What Would You Do
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Differently Today?</span>
          </h3>
          
          <blockquote className="text-xl text-gray-300 italic mb-8 max-w-2xl mx-auto">
            "Seeing your ShadowTwin isn't about regret—it's about understanding the infinite possibilities that still exist within you."
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onTryAgain}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <RotateCcw size={20} />
              Try Different Choices
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Download size={20} />
              Download Report
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Share2 size={20} />
              Share ShadowTwin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShadowTwin: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'generating', 'results'
  const [formData, setFormData] = useState<FormData>({
    name: '',
    currentBio: '',
    majorDecisions: '',
    dreamsNotPursued: ''
  });
  const [showInputModal, setShowInputModal] = useState(false);
  const [showAPIConfig, setShowAPIConfig] = useState(false);
  const [apiConfig, setApiConfig] = useState<{ 
    tavusApiKey: string; 
    elevenLabsApiKey: string; 
    geminiApiKey: string;
  }>({
    tavusApiKey: '9acf3d70659349aab5cb638470978303',
    elevenLabsApiKey: 'sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d',
    geminiApiKey: 'AIzaSyA6QBBNKfsbQb2Xq5iQQ57krHfSsxFywxc'
  });
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const { 
    isGenerating, 
    videoUrl, 
    audioUrls, 
    timelineEvents,
    socialPosts,
    comparisonData,
    error, 
    generateShadowTwinContent, 
    generateChatResponse,
    generateVoiceResponse 
  } = useAIServices(apiConfig);

  const handleInputSubmit = async (inputData: FormData) => {
    setFormData(inputData);
    setCurrentStep('generating');
    
    try {
      await generateShadowTwinContent(inputData);
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
    setCurrentStep('intro');
    setFormData({
      name: '',
      currentBio: '',
      majorDecisions: '',
      dreamsNotPursued: ''
    });
    setGeneratedVideoUrl(null);
  };

  const handleAPIConfig = (config: { tavusApiKey: string; elevenLabsApiKey: string; geminiApiKey: string }) => {
    setApiConfig(config);
  };

  const handleVideoGenerated = (videoUrl: string) => {
    setGeneratedVideoUrl(videoUrl);
  };

  // Add icons to AI-generated data
  const timelineEventsWithIcons: TimelineEvent[] = timelineEvents.map((event, index) => ({
    ...event,
    icon: [
      <MapPin className="text-white" size={16} />,
      <Camera className="text-white" size={16} />,
      <Video className="text-white" size={16} />,
      <Trophy className="text-white" size={16} />
    ][index] || <Sparkles className="text-white" size={16} />
  }));

  const socialPostsWithImages: SocialPost[] = socialPosts.map(post => ({
    ...post,
    image: '' // Placeholder for AI-generated images
  }));

  const comparisonDataWithIcons: ComparisonData[] = comparisonData.map((item, index) => ({
    ...item,
    icon: [
      <Briefcase className="text-white" size={20} />,
      <MapPin className="text-white" size={20} />,
      <Trophy className="text-white" size={20} />,
      <Heart className="text-white" size={20} />
    ][index] || <Sparkles className="text-white" size={20} />
  }));

  const renderIntro = () => (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Meet Your
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> ShadowTwin</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          An AI-powered alternate version of yourself that explores the paths not taken and decisions unmade. 
          Discover who you could have become through immersive alternate life experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300">
          <Sparkles className="text-violet-400 mx-auto mb-4" size={32} />
          <h3 className="text-white font-bold mb-2">AI Content Generation</h3>
          <p className="text-gray-400 text-sm">Personalized timeline, social posts, and insights</p>
        </div>
        <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-blue-400/30 transition-all duration-300">
          <MessageSquare className="text-blue-400 mx-auto mb-4" size={32} />
          <h3 className="text-white font-bold mb-2">Intelligent Conversations</h3>
          <p className="text-gray-400 text-sm">Chat with your AI ShadowTwin about their experiences</p>
        </div>
        <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-cyan-400/30 transition-all duration-300">
          <Video className="text-cyan-400 mx-auto mb-4" size={32} />
          <h3 className="text-white font-bold mb-2">Video & Voice Generation</h3>
          <p className="text-gray-400 text-sm">See and hear yourself in alternate reality</p>
        </div>
      </div>

      <div className="mb-8 p-4 bg-green-500/10 border border-green-400/20 rounded-lg max-w-2xl mx-auto">
        <p className="text-green-300 text-sm">
          <strong>🤖 Powered by AI:</strong> Uses Google Gemini for content generation, ElevenLabs for voice, and Tavus for video.
        </p>
      </div>

      <button
        onClick={() => setShowInputModal(true)}
        className="group relative px-12 py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25"
      >
        <span className="relative z-10 flex items-center gap-3">
          <Sparkles size={24} />
          Begin Your Journey
        </span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Input Modal */}
      <ShadowTwinInputModal
        isOpen={showInputModal}
        onClose={() => setShowInputModal(false)}
        onSubmit={handleInputSubmit}
      />

      {/* API Configuration Modal */}
      <APIConfigModal
        isOpen={showAPIConfig}
        onClose={() => setShowAPIConfig(false)}
        onSave={handleAPIConfig}
      />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  ShadowTwin
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mt-4">
                  Explore the life you never lived.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAPIConfig(true)}
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
              title="Configure AI Services"
            >
              <Settings size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
              <p className="text-yellow-300 text-sm">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {currentStep === 'intro' && renderIntro()}

        {currentStep === 'generating' && (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-spin" style={{ animationDuration: '3s' }}>
                  <div className="absolute inset-2 rounded-full bg-black" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-violet-400" size={48} />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Generating Your
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> ShadowTwin</span>
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="flex items-center justify-center gap-2">
                  <Sparkles size={16} className="text-violet-400" />
                  Analyzing your life choices with AI...
                </p>
                <p className="flex items-center justify-center gap-2">
                  <MessageSquare size={16} className="text-blue-400" />
                  Creating alternate timeline and content...
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Mic size={16} className="text-cyan-400" />
                  Generating AI persona and voice...
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'results' && (
          <div>
            <TimelineSection events={timelineEventsWithIcons} />
            
            {/* Video Generation Panel */}
            <VideoGenerationPanel
              formData={formData}
              onVideoGenerated={handleVideoGenerated}
              tavusApiKey={apiConfig.tavusApiKey}
            />
            
            <VideoMessage 
              videoUrl={generatedVideoUrl || videoUrl} 
              audioUrls={audioUrls}
              isGenerating={isGenerating}
            />
            <SocialFeed posts={socialPostsWithImages} />
            <ComparisonTable data={comparisonDataWithIcons} />
            <ChatInterface 
              formData={formData}
              generateChatResponse={generateChatResponse}
            />
            <ReflectionSection onTryAgain={handleTryAgain} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTwin;