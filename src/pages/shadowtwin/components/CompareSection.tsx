import React from 'react';
import { Building2, Heart, Brain, Target, User } from 'lucide-react';

interface CompareCategory {
  title: string;
  current: string;
  alternate: string;
  icon: React.ReactNode;
}

interface CompareSectionProps {
  comparisonData: any[];
}

const CompareSection: React.FC<CompareSectionProps> = ({ comparisonData }) => {
  const categories: CompareCategory[] = [
    {
      title: "Career Path",
      current: "Corporate finance professional with steady growth",
      alternate: "Independent creative entrepreneur and artist",
      icon: <Building2 className="text-blue-400" size={20} />
    },
    {
      title: "Life Focus",
      current: "Financial stability and professional achievement",
      alternate: "Creative expression and artistic impact",
      icon: <Target className="text-violet-400" size={20} />
    },
    {
      title: "Personal Growth",
      current: "Structured development within corporate framework",
      alternate: "Free-form exploration of artistic abilities",
      icon: <Brain className="text-green-400" size={20} />
    },
    {
      title: "Relationships",
      current: "Traditional work-life balance focused",
      alternate: "Bohemian lifestyle with artistic community",
      icon: <Heart className="text-red-400" size={20} />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold">Current Reality</h3>
              <p className="text-gray-400 text-sm">Your chosen path</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6">{comparisonData[0]?.currentBio}</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-400/20 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold">Alternate Reality</h3>
              <p className="text-gray-400 text-sm">The path not taken</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6">{comparisonData[1]?.dreamsNotPursued}</p>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h4 className="text-white font-medium">{category.title}</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Current Path</p>
                <p className="text-gray-200">{category.current}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Alternate Path</p>
                <p className="text-gray-200">{category.alternate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareSection;
