import React from 'react';
import { ArrowRight, Play, Users, Award, Globe } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900/30" />
      
      {/* Subtle geometric patterns - positioned to avoid nav overlap */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-20 w-24 h-24 border border-white/30 rotate-45" />
        <div className="absolute bottom-40 right-32 w-20 h-20 border border-blue-400/40 rotate-12" />
        <div className="absolute top-2/3 left-1/4 w-16 h-16 border border-violet-400/30 -rotate-12" />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 border border-cyan-400/30 rotate-45" />
        <div className="absolute bottom-32 left-1/3 w-14 h-14 border border-blue-300/25 -rotate-45" />
      </div>

      <div className="text-center z-10 max-w-6xl mx-auto px-6 py-8 md:py-0">
        {/* Main headline */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            <span className="text-white">
              Explore Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Alternate Reality
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced AI simulation platform that reveals the paths not taken. 
            Discover who you could have become through immersive alternate life experiences.
          </p>

          {/* Key benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-gray-300 justify-center sm:justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users size={16} className="md:w-5 md:h-5 text-blue-400" />
              </div>
              <span className="text-sm md:text-base">AI-Powered Personas</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 justify-center sm:justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Award size={16} className="md:w-5 md:h-5 text-violet-400" />
              </div>
              <span className="text-sm md:text-base">Professional Insights</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 justify-center sm:justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Globe size={16} className="md:w-5 md:h-5 text-cyan-400" />
              </div>
              <span className="text-sm md:text-base">Global Recognition</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => onNavigate('shadowtwin')}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <span className="relative z-10">Start Simulation</span>
            <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
          
          <button className="group px-6 md:px-8 py-3 md:py-4 border-2 border-white/20 rounded-lg text-white font-semibold text-base md:text-lg transition-all duration-300 hover:border-white/40 hover:bg-white/5 flex items-center gap-3 w-full sm:w-auto justify-center">
            <Play size={18} className="md:w-5 md:h-5" />
            Watch Demo
          </button>
        </div>
      </div>

      {/* Seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      
      {/* Connecting visual elements */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-blue-400/50 to-transparent" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400/30 animate-pulse" />
    </section>
  );
};

export default Hero;