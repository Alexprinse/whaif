import React from 'react';
import { ArrowRight, Play, Users, Award, Globe } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
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

      <div className="text-center z-10 max-w-6xl mx-auto px-6">
        {/* Main headline */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">
              Explore Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Alternate Reality
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced AI simulation platform that reveals the paths not taken. 
            Discover who you could have become through immersive alternate life experiences.
          </p>

          {/* Key benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users size={20} className="text-blue-400" />
              </div>
              <span>AI-Powered Personas</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Award size={20} className="text-violet-400" />
              </div>
              <span>Professional Insights</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Globe size={20} className="text-cyan-400" />
              </div>
              <span>Global Recognition</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => onNavigate('shadowtwin')}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center gap-3"
          >
            <span className="relative z-10">Start Simulation</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
          
          <button className="group px-8 py-4 border-2 border-white/20 rounded-lg text-white font-semibold text-lg transition-all duration-300 hover:border-white/40 hover:bg-white/5 flex items-center gap-3">
            <Play size={20} />
            Watch Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">Trusted by professionals worldwide</p>
          <div className="flex justify-center items-center gap-8 text-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-xs">Simulations Created</div>
            </div>
            <div className="w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-xs">User Satisfaction</div>
            </div>
            <div className="w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-xs">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;