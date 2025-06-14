import React from 'react';
import { Sparkles, MessageSquare, Video } from 'lucide-react';

interface ShadowTwinIntroProps {
  onStartJourney: () => void;
}

const ShadowTwinIntro: React.FC<ShadowTwinIntroProps> = ({ onStartJourney }) => {
  return (
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
        onClick={onStartJourney}
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
};

export default ShadowTwinIntro;