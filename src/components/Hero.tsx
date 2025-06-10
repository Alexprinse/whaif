import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onEnterSimulation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnterSimulation }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-teal-900/20" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-violet-400/30 to-blue-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              What if you could see
            </span>
            <br />
            <span className="text-white animate-pulse">
              the life you didn't live?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fadeInUp animation-delay-200">
            Simulate. Explore. Reflect.
          </p>
        </div>

        <button 
          onClick={onEnterSimulation}
          className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 animate-fadeInUp animation-delay-400"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={20} />
            Enter the Simulation
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </button>
      </div>
    </section>
  );
};

export default Hero;