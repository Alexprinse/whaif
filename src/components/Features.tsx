import React from 'react';
import { User, Skull, Building2, ArrowRight, Zap, Shield, Brain } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  sectionId: string;
  onNavigate: (view: string) => void;
  featured?: boolean;
}

const FeatureCard: React.FC<FeatureProps> = ({ 
  icon, 
  title, 
  description, 
  benefits, 
  sectionId, 
  onNavigate, 
  featured = false 
}) => {
  const handleClick = () => {
    if (sectionId === 'shadowtwin') {
      onNavigate('shadowtwin');
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      id={sectionId}
      onClick={handleClick}
      className={`group relative p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 cursor-pointer ${
        featured 
          ? 'bg-gradient-to-br from-blue-50 via-violet-50 to-cyan-50 dark:from-blue-500/10 dark:via-violet-500/10 dark:to-cyan-500/10 border-blue-200 dark:border-blue-400/30 hover:border-blue-300 dark:hover:border-blue-400/50' 
          : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full text-white text-xs font-semibold">
          Most Popular
        </div>
      )}
      
      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
          featured 
            ? 'bg-gradient-to-br from-blue-500 to-violet-500' 
            : 'bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700'
        }`}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          {description}
        </p>

        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {benefit}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all duration-300">
          <span>Explore {title}</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

interface FeaturesProps {
  onNavigate: (view: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <User className="text-white" size={32} />,
      title: "ShadowTwin",
      description: "Create an AI-powered alternate version of yourself that explores the paths not taken and decisions unmade.",
      benefits: [
        "AI video generation with your likeness",
        "Personalized alternate life scenarios",
        "Interactive conversations with your twin",
        "Professional insights and reflections"
      ],
      sectionId: "shadowtwin",
      featured: true
    },
    {
      icon: <Skull className="text-white" size={32} />,
      title: "MicroDeath",
      description: "Experience simulated mortality to gain profound insights about life, purpose, and what truly matters.",
      benefits: [
        "Guided reflection exercises",
        "Life priority assessment",
        "Legacy planning tools",
        "Mindfulness integration"
      ],
      sectionId: "microdeath"
    },
    {
      icon: <Building2 className="text-white" size={32} />,
      title: "YouInc",
      description: "Analyze your life as a business entity with metrics, growth strategies, and optimization opportunities.",
      benefits: [
        "Personal ROI calculations",
        "Skill portfolio analysis",
        "Growth opportunity mapping",
        "Strategic life planning"
      ],
      sectionId: "youinc"
    }
  ];

  return (
    <section className="py-20 relative bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-slate-900/30 dark:to-slate-800/20">
      {/* Seamless connection from hero */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white dark:from-black to-transparent" />
      
      {/* Connecting visual element */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gradient-to-b from-blue-400/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Zap size={16} />
            AI-Powered Simulations
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Three Paths to
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"> Self-Discovery</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Each simulation uses advanced AI to create personalized experiences that reveal new perspectives 
            about your potential, priorities, and possibilities.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} onNavigate={onNavigate} />
          ))}
        </div>

        {/* Additional benefits */}
        <div className="grid md:grid-cols-3 gap-8 pt-16 border-t border-gray-200 dark:border-white/10">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Your data is encrypted and never shared. Complete privacy guaranteed.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Brain size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced machine learning creates realistic, personalized scenarios.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Get immediate insights and begin your simulation in minutes.</p>
          </div>
        </div>
      </div>
      
      {/* Transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-gray-100 dark:to-slate-900/50" />
    </section>
  );
};

export default Features;