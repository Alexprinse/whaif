import React from 'react';
import { RotateCcw, Download, Share2 } from 'lucide-react';

interface ReflectionSectionProps {
  onTryAgain: () => void;
}

const ReflectionSection: React.FC<ReflectionSectionProps> = ({ onTryAgain }) => {
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

export default ReflectionSection;