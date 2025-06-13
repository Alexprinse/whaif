import React, { useState } from 'react';
import { ArrowLeft, Skull, Clock, Heart, Brain, Users, Calendar, BookOpen, Target, Award, Download, Share2, RotateCcw } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface MicroDeathProps {
  onBack: () => void;
  user: User | null;
}

interface LifeReflection {
  category: string;
  question: string;
  response: string;
  icon: React.ReactNode;
}

interface LegacyItem {
  type: string;
  description: string;
  impact: string;
  icon: React.ReactNode;
}

const MicroDeath: React.FC<MicroDeathProps> = ({ onBack, user }) => {
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'reflection', 'simulation', 'insights'
  const [reflections, setReflections] = useState<LifeReflection[]>([]);
  const [currentReflectionIndex, setCurrentReflectionIndex] = useState(0);

  const reflectionQuestions = [
    {
      category: 'Relationships',
      question: 'If you had one week left, who would you spend time with and what would you say?',
      icon: <Heart className="text-red-400" size={24} />
    },
    {
      category: 'Achievements',
      question: 'What accomplishment would you be most proud to be remembered for?',
      icon: <Award className="text-yellow-400" size={24} />
    },
    {
      category: 'Regrets',
      question: 'What would you regret not having done or said?',
      icon: <Clock className="text-blue-400" size={24} />
    },
    {
      category: 'Values',
      question: 'What principles or values would you want to pass on to others?',
      icon: <Brain className="text-violet-400" size={24} />
    },
    {
      category: 'Legacy',
      question: 'How would you want to be remembered by those who knew you?',
      icon: <Users className="text-green-400" size={24} />
    }
  ];

  const handleReflectionSubmit = (response: string) => {
    const newReflection: LifeReflection = {
      ...reflectionQuestions[currentReflectionIndex],
      response
    };

    setReflections(prev => [...prev, newReflection]);

    if (currentReflectionIndex < reflectionQuestions.length - 1) {
      setCurrentReflectionIndex(prev => prev + 1);
    } else {
      setCurrentStep('simulation');
      // Simulate processing time
      setTimeout(() => {
        setCurrentStep('insights');
      }, 3000);
    }
  };

  const legacyItems: LegacyItem[] = [
    {
      type: 'Personal Impact',
      description: 'The lives you\'ve touched through kindness and support',
      impact: 'Your empathy and guidance have helped 12+ people through difficult times',
      icon: <Heart className="text-red-400" size={20} />
    },
    {
      type: 'Professional Legacy',
      description: 'The work and innovations you\'ve contributed',
      impact: 'Your projects have improved efficiency for thousands of users',
      icon: <Target className="text-blue-400" size={20} />
    },
    {
      type: 'Knowledge Sharing',
      description: 'The wisdom and skills you\'ve passed on',
      impact: 'You\'ve mentored 5 junior colleagues who now lead their own teams',
      icon: <BookOpen className="text-green-400" size={20} />
    },
    {
      type: 'Family & Friends',
      description: 'The memories and love you\'ve created',
      impact: 'Your relationships are built on trust, laughter, and genuine care',
      icon: <Users className="text-violet-400" size={20} />
    }
  ];

  const renderIntro = () => (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
          <Skull className="text-white" size={48} />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Experience
          <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"> Mortality</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A guided simulation to help you reflect on life's finite nature and discover what truly matters to you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl">
          <Clock className="text-blue-400 mx-auto mb-4" size={32} />
          <h3 className="text-white font-bold mb-2">Time Awareness</h3>
          <p className="text-gray-400 text-sm">Gain perspective on how you spend your precious time</p>
        </div>
        <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl">
          <Heart className="text-red-400 mx-auto mb-4" size={32} />
          <h3 className="text-white font-bold mb-2">Priority Clarity</h3>
          <p className="text-gray-400 text-sm">Discover what relationships and goals matter most</p>
        </div>
        <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl">
          <Brain className="text-violet-400 mx-auto mb-4" size={32} />
          <h3 className="text-white font-bold mb-2">Life Purpose</h3>
          <p className="text-gray-400 text-sm">Understand your values and desired legacy</p>
        </div>
      </div>

      <button
        onClick={() => setCurrentStep('reflection')}
        className="px-12 py-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full text-white font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/25"
      >
        Begin Reflection
      </button>
    </div>
  );

  const renderReflection = () => {
    const currentQuestion = reflectionQuestions[currentReflectionIndex];
    const [response, setResponse] = useState('');

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {currentQuestion.icon}
              <h3 className="text-2xl font-bold text-white">{currentQuestion.category}</h3>
            </div>
            <span className="text-gray-400 text-sm">
              {currentReflectionIndex + 1} of {reflectionQuestions.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentReflectionIndex + 1) / reflectionQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h4 className="text-xl text-white font-medium mb-6 leading-relaxed">
            {currentQuestion.question}
          </h4>
          
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Take your time to reflect deeply on this question..."
            rows={6}
            className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-gray-400/50 focus:outline-none resize-none"
          />
          
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentReflectionIndex(Math.max(0, currentReflectionIndex - 1))}
              disabled={currentReflectionIndex === 0}
              className="px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={() => handleReflectionSubmit(response)}
              disabled={!response.trim()}
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentReflectionIndex === reflectionQuestions.length - 1 ? 'Complete Reflection' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSimulation = () => (
    <div className="text-center py-20">
      <div className="max-w-2xl mx-auto">
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute inset-2 rounded-full bg-black" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Skull className="text-gray-400" size={48} />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-6">
          Processing Your
          <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"> Reflections</span>
        </h2>
        
        <div className="space-y-4 text-gray-300">
          <p className="flex items-center justify-center gap-2">
            <Brain size={16} className="text-violet-400" />
            Analyzing your values and priorities...
          </p>
          <p className="flex items-center justify-center gap-2">
            <Heart size={16} className="text-red-400" />
            Identifying meaningful relationships...
          </p>
          <p className="flex items-center justify-center gap-2">
            <Target size={16} className="text-blue-400" />
            Calculating your potential legacy...
          </p>
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-16">
      {/* Life Priorities */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Your Life
          <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"> Priorities</span>
        </h3>
        
        <div className="grid gap-6">
          {reflections.map((reflection, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                {reflection.icon}
                <h4 className="text-white font-bold text-lg">{reflection.category}</h4>
              </div>
              <p className="text-gray-300 mb-3 italic">"{reflection.question}"</p>
              <p className="text-white leading-relaxed">{reflection.response}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legacy Analysis */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Your Potential
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Legacy</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {legacyItems.map((item, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h4 className="text-white font-bold">{item.type}</h4>
              </div>
              <p className="text-gray-300 mb-3">{item.description}</p>
              <p className="text-white text-sm bg-black/20 p-3 rounded-lg">{item.impact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Time Remaining Visualization */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            If You Had
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"> One Year Left</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">365</div>
              <div className="text-gray-400 text-sm">Days to make a difference</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">8,760</div>
              <div className="text-gray-400 text-sm">Hours to spend wisely</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">525,600</div>
              <div className="text-gray-400 text-sm">Minutes to cherish</div>
            </div>
          </div>
          
          <blockquote className="text-xl text-gray-300 italic mb-8">
            "The goal isn't to live forever, but to create something that will."
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentStep('intro')}
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <RotateCcw size={20} />
              Reflect Again
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Download size={20} />
              Download Insights
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Share2 size={20} />
              Share Reflection
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-slate-900/20 to-black/20" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent">
                MicroDeath
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-4">
                Confront mortality to discover what truly matters in life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {currentStep === 'intro' && renderIntro()}
        {currentStep === 'reflection' && renderReflection()}
        {currentStep === 'simulation' && renderSimulation()}
        {currentStep === 'insights' && renderInsights()}
      </div>
    </div>
  );
};

export default MicroDeath;