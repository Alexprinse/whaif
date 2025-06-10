import React from 'react';
import { User, Skull, Building2 } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  sectionId: string;
  onNavigate: (view: string) => void;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, sectionId, onNavigate }) => {
  const handleClick = () => {
    if (sectionId === 'shadowtwin') {
      onNavigate('shadowtwin');
    } else {
      // For other features, scroll to section (placeholder for now)
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
      className="group relative p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
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
      icon: <User className="text-white\" size={32} />,
      title: "ShadowTwin",
      description: "Become your alternate self. Explore the paths not taken, the choices unmade, and the person you could have been in parallel dimensions.",
      sectionId: "shadowtwin"
    },
    {
      icon: <Skull className="text-white" size={32} />,
      title: "MicroDeath",
      description: "Witness your death, design your rebirth. Face mortality to understand life. Experience endings to appreciate beginnings.",
      sectionId: "microdeath"
    },
    {
      icon: <Building2 className="text-white\" size={32} />,
      title: "YouInc",
      description: "Turn your life into a startup. Analyze your personal metrics, optimize your growth, and scale your potential like a business.",
      sectionId: "youinc"
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Glowing separator line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent"> Simulation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three portals to alternate realities. Each one reveals a different aspect of the infinite possibilities within you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
      
      {/* Bottom glowing separator line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
    </section>
  );
};

export default Features;