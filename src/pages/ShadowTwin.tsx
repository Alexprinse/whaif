import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Play, Calendar, MessageSquare, Briefcase, Heart, ArrowLeft, 
  Sparkles, Video, Mic, User, Camera, Download, Share2, RotateCcw, 
  Instagram, Twitter, MapPin, Trophy, Clock, Send, Pause, Settings,
  Zap, Eye, Moon, Star, Shield, Flame, Snowflake, Wind, Target,
  BarChart3, Award, BookOpen, Users, TrendingUp, Lock, Unlock
} from 'lucide-react';
import { useAIServices } from '../hooks/useAIServices';
import VideoGenerationPanel from '../components/VideoGenerationPanel';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface FormData {
  name: string;
  currentBio: string;
  majorDecisions: string;
  dreamsNotPursued: string;
  selfie?: File;
}

interface ShadowAbility {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  experience: number;
  maxExperience: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ShadowTwinProps {
  onBack: () => void;
  user: User | null;
}

// Mystical Particle Background Component
const MysticalParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: `linear-gradient(45deg, 
              ${['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981'][Math.floor(Math.random() * 4)]}, 
              ${['#A855F7', '#6366F1', '#0EA5E9', '#059669'][Math.floor(Math.random() * 4)]}
            )`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 4 + 3}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

// Mystical Rune Component
const MysticalRune: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
        <defs>
          <linearGradient id="runeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M50 10 L90 50 L50 90 L10 50 Z M30 30 L70 30 M30 70 L70 70 M50 20 L50 80"
          stroke="url(#runeGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

// Shadow Twin Status Display
const ShadowTwinStatus: React.FC<{ shadowTwin: any }> = ({ shadowTwin }) => {
  return (
    <div className="bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden">
      <MysticalRune className="absolute top-2 right-2 w-8 h-8" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-bold text-lg">Shadow Twin Active</h3>
          <p className="text-purple-300 text-sm">Synchronization: 87%</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Shadow Energy</span>
          <span className="text-purple-400 font-medium">750/1000</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4 relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Manifestation Power</span>
          <span className="text-blue-400 font-medium">Level 12</span>
        </div>
      </div>
    </div>
  );
};

// Shadow Abilities Dashboard
const ShadowAbilitiesPanel: React.FC<{ abilities: ShadowAbility[] }> = ({ abilities }) => {
  const [selectedAbility, setSelectedAbility] = useState<ShadowAbility | null>(null);

  return (
    <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Zap className="text-yellow-400" size={24} />
        Shadow Abilities
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {abilities.map((ability) => (
          <button
            key={ability.id}
            onClick={() => setSelectedAbility(ability)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 group ${
              ability.unlocked 
                ? 'border-purple-500/30 hover:border-purple-400/50 bg-purple-900/20' 
                : 'border-gray-600/30 bg-gray-900/20 cursor-not-allowed'
            }`}
          >
            {!ability.unlocked && (
              <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                <Lock className="text-gray-400" size={20} />
              </div>
            )}
            
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto ${ability.color} ${
              ability.unlocked ? 'group-hover:scale-110' : 'grayscale'
            } transition-transform duration-300`}>
              {ability.icon}
            </div>
            
            <h4 className={`font-medium text-sm text-center mb-2 ${
              ability.unlocked ? 'text-white' : 'text-gray-500'
            }`}>
              {ability.name}
            </h4>
            
            {ability.unlocked && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Lv.{ability.level}</span>
                  <span className="text-purple-400">{ability.experience}/{ability.maxExperience}</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${ability.color.replace('bg-', 'bg-gradient-to-r from-').replace('/20', '-500 to-').replace('bg-gradient-to-r from-', 'bg-gradient-to-r from-').split(' ')[0]}-600`}
                    style={{ width: `${(ability.experience / ability.maxExperience) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedAbility && (
        <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedAbility.color}`}>
              {selectedAbility.icon}
            </div>
            <div>
              <h4 className="text-white font-bold">{selectedAbility.name}</h4>
              <p className="text-purple-300 text-sm">Level {selectedAbility.level}/{selectedAbility.maxLevel}</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">{selectedAbility.description}</p>
          
          {selectedAbility.unlocked && (
            <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:scale-105 transition-transform duration-300">
              Train Ability
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Achievement System
const AchievementPanel: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-500 to-orange-500';
      case 'epic': return 'from-purple-500 to-pink-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900/30 via-teal-900/30 to-cyan-900/30 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Award className="text-yellow-400" size={24} />
        Achievements
        <span className="text-sm text-gray-400">({unlockedAchievements.length}/{achievements.length})</span>
      </h3>
      
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {unlockedAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-20 border border-white/10 relative overflow-hidden`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold">{achievement.title}</h4>
                <p className="text-gray-300 text-sm">{achievement.description}</p>
                {achievement.unlockedAt && (
                  <p className="text-gray-400 text-xs mt-1">
                    Unlocked {achievement.unlockedAt.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Star className="text-yellow-400" size={16} />
            </div>
          </div>
        ))}
        
        {lockedAchievements.slice(0, 3).map((achievement) => (
          <div
            key={achievement.id}
            className="p-4 rounded-xl bg-gray-900/30 border border-gray-600/20 relative"
          >
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                <Lock className="text-gray-400" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-400 font-bold">???</h4>
                <p className="text-gray-500 text-sm">Complete more training to unlock</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Training Interface
const TrainingInterface: React.FC = () => {
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  const trainingModules = [
    {
      id: 'shadow-manipulation',
      name: 'Shadow Manipulation',
      description: 'Learn to control and shape shadows to your will',
      duration: '30 min',
      difficulty: 'Beginner',
      icon: <Moon className="text-white" size={20} />,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'astral-projection',
      name: 'Astral Projection',
      description: 'Project your consciousness beyond physical boundaries',
      duration: '45 min',
      difficulty: 'Intermediate',
      icon: <Eye className="text-white" size={20} />,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'energy-channeling',
      name: 'Energy Channeling',
      description: 'Harness and direct mystical energies',
      duration: '60 min',
      difficulty: 'Advanced',
      icon: <Zap className="text-white" size={20} />,
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  const startTraining = (moduleId: string) => {
    setSelectedTraining(moduleId);
    setIsTraining(true);
    
    // Simulate training completion
    setTimeout(() => {
      setIsTraining(false);
      setSelectedTraining(null);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-violet-900/30 via-purple-900/30 to-indigo-900/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Target className="text-red-400" size={24} />
        Shadow Training
      </h3>
      
      {isTraining ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin">
              <div className="absolute inset-2 rounded-full bg-black" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="text-purple-400" size={32} />
            </div>
          </div>
          <h4 className="text-white font-bold text-xl mb-2">Training in Progress</h4>
          <p className="text-gray-300">Channeling shadow energy...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {trainingModules.map((module) => (
            <div
              key={module.id}
              className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {module.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{module.name}</h4>
                    <p className="text-gray-300 text-sm">{module.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-purple-400 text-xs">{module.duration}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => startTraining(module.id)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:scale-105 transition-transform duration-300"
                >
                  Start Training
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Progress Tracking Dashboard
const ProgressDashboard: React.FC = () => {
  const progressData = [
    { label: 'Shadow Mastery', value: 75, color: 'purple' },
    { label: 'Astral Awareness', value: 60, color: 'blue' },
    { label: 'Energy Control', value: 45, color: 'cyan' },
    { label: 'Manifestation', value: 30, color: 'green' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900/30 via-gray-900/30 to-zinc-900/30 backdrop-blur-xl border border-slate-500/20 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <BarChart3 className="text-green-400" size={24} />
        Progress Overview
      </h3>
      
      <div className="space-y-6">
        {progressData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">{item.label}</span>
              <span className={`text-${item.color}-400 font-bold`}>{item.value}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 relative overflow-hidden">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 transition-all duration-1000 relative`}
                style={{ width: `${item.value}%` }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
          <h4 className="text-white font-bold mb-2">Next Milestone</h4>
          <p className="text-gray-300 text-sm mb-3">Reach 80% Shadow Mastery to unlock Advanced Techniques</p>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Shadow Twin Component
const ShadowTwin: React.FC<ShadowTwinProps> = ({ onBack, user }) => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'creation', 'training', 'abilities', 'progress'
  const [showAPIConfig, setShowAPIConfig] = useState(false);

  // Mock data for shadow abilities
  const shadowAbilities: ShadowAbility[] = [
    {
      id: 'shadow-step',
      name: 'Shadow Step',
      description: 'Teleport through shadows instantly',
      level: 5,
      maxLevel: 10,
      icon: <Moon className="text-white" size={20} />,
      color: 'bg-purple-500/20',
      unlocked: true,
      experience: 750,
      maxExperience: 1000
    },
    {
      id: 'dark-vision',
      name: 'Dark Vision',
      description: 'See clearly in complete darkness',
      level: 3,
      maxLevel: 8,
      icon: <Eye className="text-white" size={20} />,
      color: 'bg-blue-500/20',
      unlocked: true,
      experience: 400,
      maxExperience: 600
    },
    {
      id: 'shadow-bind',
      name: 'Shadow Bind',
      description: 'Immobilize targets with shadow tendrils',
      level: 0,
      maxLevel: 12,
      icon: <Shield className="text-white" size={20} />,
      color: 'bg-indigo-500/20',
      unlocked: false,
      experience: 0,
      maxExperience: 500
    },
    {
      id: 'umbral-form',
      name: 'Umbral Form',
      description: 'Become one with the shadows',
      level: 0,
      maxLevel: 15,
      icon: <Sparkles className="text-white" size={20} />,
      color: 'bg-violet-500/20',
      unlocked: false,
      experience: 0,
      maxExperience: 1200
    }
  ];

  // Mock achievements
  const achievements: Achievement[] = [
    {
      id: 'first-step',
      title: 'First Steps',
      description: 'Complete your first shadow training session',
      icon: <Star className="text-white" size={16} />,
      unlocked: true,
      unlockedAt: new Date('2024-01-15'),
      rarity: 'common'
    },
    {
      id: 'shadow-adept',
      title: 'Shadow Adept',
      description: 'Reach level 5 in any shadow ability',
      icon: <Award className="text-white" size={16} />,
      unlocked: true,
      unlockedAt: new Date('2024-01-20'),
      rarity: 'rare'
    },
    {
      id: 'master-manipulator',
      title: 'Master Manipulator',
      description: 'Master the art of shadow manipulation',
      icon: <Trophy className="text-white" size={16} />,
      unlocked: false,
      rarity: 'epic'
    }
  ];

  const renderNavigation = () => (
    <div className="flex flex-wrap gap-2 mb-8">
      {[
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
        { id: 'abilities', label: 'Abilities', icon: <Zap size={16} /> },
        { id: 'training', label: 'Training', icon: <Target size={16} /> },
        { id: 'progress', label: 'Progress', icon: <TrendingUp size={16} /> },
        { id: 'creation', label: 'Creation', icon: <User size={16} /> }
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            currentView === item.id
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'bg-black/30 text-gray-300 hover:bg-black/50 hover:text-white border border-white/10'
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );

  const renderDashboard = () => (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <ShadowTwinStatus shadowTwin={{}} />
        <ShadowAbilitiesPanel abilities={shadowAbilities.slice(0, 4)} />
      </div>
      <div className="space-y-8">
        <AchievementPanel achievements={achievements} />
        <ProgressDashboard />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/20 text-white relative overflow-hidden">
      {/* Mystical Background */}
      <MysticalParticles />
      
      {/* Mystical Runes */}
      <MysticalRune className="absolute top-20 left-10 w-16 h-16 opacity-10" />
      <MysticalRune className="absolute bottom-20 right-10 w-20 h-20 opacity-10" />
      <MysticalRune className="absolute top-1/2 left-1/4 w-12 h-12 opacity-10" />

      {/* Header */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-400/40 transition-all duration-300 group"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Shadow Twin
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mt-4">
                  Master the mystical arts of shadow manipulation
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAPIConfig(true)}
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-400/40 transition-all duration-300"
              title="Configure AI Services"
            >
              <Settings size={24} />
            </button>
          </div>

          {renderNavigation()}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'abilities' && <ShadowAbilitiesPanel abilities={shadowAbilities} />}
        {currentView === 'training' && <TrainingInterface />}
        {currentView === 'progress' && <ProgressDashboard />}
        {currentView === 'creation' && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-white mb-4">Shadow Twin Creation</h2>
            <p className="text-gray-300 mb-8">Create and customize your mystical shadow companion</p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold hover:scale-105 transition-transform duration-300">
              Begin Creation Ritual
            </button>
          </div>
        )}
      </div>

      {/* Mystical Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default ShadowTwin;