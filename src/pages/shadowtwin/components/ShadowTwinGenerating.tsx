import React from 'react';
import { Sparkles, MessageSquare, Mic, Clock } from 'lucide-react';

const ShadowTwinGenerating: React.FC = () => {
  return (
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
  );
};

export default ShadowTwinGenerating;