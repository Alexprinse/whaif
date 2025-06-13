import React, { useState } from 'react';
import { ArrowLeft, Building2, TrendingUp, DollarSign, Target, Users, BarChart3, PieChart, Calendar, Award, Download, Share2, RotateCcw, Briefcase, GraduationCap, Heart, Zap } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface YouIncProps {
  onBack: () => void;
  user: User | null;
}

interface LifeMetric {
  category: string;
  currentValue: number;
  potentialValue: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillAsset {
  name: string;
  level: number;
  marketValue: number;
  growth: number;
  category: string;
}

interface LifeGoal {
  title: string;
  timeframe: string;
  investment: string;
  expectedROI: string;
  priority: 'high' | 'medium' | 'low';
}

const YouInc: React.FC<YouIncProps> = ({ onBack, user }) => {
  const [currentStep, setCurrentStep] = useState('assessment'); // 'assessment', 'analysis', 'results'
  const [assessmentData, setAssessmentData] = useState({
    age: '',
    income: '',
    education: '',
    experience: '',
    skills: '',
    goals: '',
    timeInvestment: '',
    riskTolerance: ''
  });

  const handleAssessmentSubmit = () => {
    setCurrentStep('analysis');
    // Simulate analysis time
    setTimeout(() => {
      setCurrentStep('results');
    }, 3000);
  };

  const lifeMetrics: LifeMetric[] = [
    {
      category: 'Career Capital',
      currentValue: 75,
      potentialValue: 95,
      unit: '%',
      icon: <Briefcase className="text-blue-400" size={20} />,
      color: 'blue'
    },
    {
      category: 'Skill Portfolio',
      currentValue: 68,
      potentialValue: 88,
      unit: '%',
      icon: <GraduationCap className="text-green-400" size={20} />,
      color: 'green'
    },
    {
      category: 'Network Value',
      currentValue: 45,
      potentialValue: 78,
      unit: '%',
      icon: <Users className="text-violet-400" size={20} />,
      color: 'violet'
    },
    {
      category: 'Life Satisfaction',
      currentValue: 72,
      potentialValue: 89,
      unit: '%',
      icon: <Heart className="text-red-400" size={20} />,
      color: 'red'
    }
  ];

  const skillAssets: SkillAsset[] = [
    { name: 'Technical Skills', level: 85, marketValue: 95000, growth: 12, category: 'Core' },
    { name: 'Leadership', level: 65, marketValue: 75000, growth: 18, category: 'Soft' },
    { name: 'Communication', level: 78, marketValue: 65000, growth: 8, category: 'Soft' },
    { name: 'Data Analysis', level: 72, marketValue: 85000, growth: 22, category: 'Technical' },
    { name: 'Project Management', level: 68, marketValue: 70000, growth: 15, category: 'Management' }
  ];

  const lifeGoals: LifeGoal[] = [
    {
      title: 'Senior Leadership Role',
      timeframe: '3-5 years',
      investment: '200 hours/year in leadership training',
      expectedROI: '40% salary increase',
      priority: 'high'
    },
    {
      title: 'Industry Expertise',
      timeframe: '2-3 years',
      investment: '150 hours/year in specialized learning',
      expectedROI: '25% market value increase',
      priority: 'high'
    },
    {
      title: 'Professional Network',
      timeframe: '1-2 years',
      investment: '100 hours/year networking',
      expectedROI: '3x more opportunities',
      priority: 'medium'
    },
    {
      title: 'Work-Life Balance',
      timeframe: '6-12 months',
      investment: '50 hours/year optimization',
      expectedROI: '30% stress reduction',
      priority: 'medium'
    }
  ];

  const renderAssessment = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Analyze Your
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Life Portfolio</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Answer these questions to get a comprehensive analysis of your life as a business entity.
        </p>
      </div>

      <div className="grid gap-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-3">Current Age</label>
            <input
              type="number"
              value={assessmentData.age}
              onChange={(e) => setAssessmentData({ ...assessmentData, age: e.target.value })}
              placeholder="Enter your age"
              className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400/50 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-3">Annual Income</label>
            <input
              type="number"
              value={assessmentData.income}
              onChange={(e) => setAssessmentData({ ...assessmentData, income: e.target.value })}
              placeholder="Enter annual income"
              className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400/50 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-3">Education & Certifications</label>
          <textarea
            value={assessmentData.education}
            onChange={(e) => setAssessmentData({ ...assessmentData, education: e.target.value })}
            placeholder="List your degrees, certifications, and relevant education..."
            rows={3}
            className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400/50 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-3">Professional Experience</label>
          <textarea
            value={assessmentData.experience}
            onChange={(e) => setAssessmentData({ ...assessmentData, experience: e.target.value })}
            placeholder="Describe your work experience, roles, and achievements..."
            rows={3}
            className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-3">Key Skills & Competencies</label>
          <textarea
            value={assessmentData.skills}
            onChange={(e) => setAssessmentData({ ...assessmentData, skills: e.target.value })}
            placeholder="List your technical skills, soft skills, and unique competencies..."
            rows={3}
            className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-3">Career Goals & Aspirations</label>
          <textarea
            value={assessmentData.goals}
            onChange={(e) => setAssessmentData({ ...assessmentData, goals: e.target.value })}
            placeholder="What are your short-term and long-term career objectives?"
            rows={3}
            className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-3">Weekly Learning Investment</label>
            <select
              value={assessmentData.timeInvestment}
              onChange={(e) => setAssessmentData({ ...assessmentData, timeInvestment: e.target.value })}
              className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-cyan-400/50 focus:outline-none"
            >
              <option value="">Select time investment</option>
              <option value="0-2">0-2 hours</option>
              <option value="3-5">3-5 hours</option>
              <option value="6-10">6-10 hours</option>
              <option value="10+">10+ hours</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-3">Risk Tolerance</label>
            <select
              value={assessmentData.riskTolerance}
              onChange={(e) => setAssessmentData({ ...assessmentData, riskTolerance: e.target.value })}
              className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-orange-400/50 focus:outline-none"
            >
              <option value="">Select risk tolerance</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={handleAssessmentSubmit}
            disabled={!assessmentData.age || !assessmentData.income || !assessmentData.skills}
            className="px-12 py-4 bg-gradient-to-r from-green-600 via-blue-600 to-violet-600 rounded-full text-white font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze My Life Portfolio
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="text-center py-20">
      <div className="max-w-2xl mx-auto">
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-500 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute inset-2 rounded-full bg-black" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="text-green-400" size={48} />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-6">
          Analyzing Your
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Life Business</span>
        </h2>
        
        <div className="space-y-4 text-gray-300">
          <p className="flex items-center justify-center gap-2">
            <BarChart3 size={16} className="text-green-400" />
            Calculating your personal ROI...
          </p>
          <p className="flex items-center justify-center gap-2">
            <TrendingUp size={16} className="text-blue-400" />
            Analyzing growth opportunities...
          </p>
          <p className="flex items-center justify-center gap-2">
            <Target size={16} className="text-violet-400" />
            Optimizing your life strategy...
          </p>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-16">
      {/* Life Metrics Dashboard */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Your Life
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Metrics</span>
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifeMetrics.map((metric, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                {metric.icon}
                <h4 className="text-white font-bold text-sm">{metric.category}</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Current</span>
                  <span className="text-white font-bold">{metric.currentValue}{metric.unit}</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${metric.currentValue}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Potential</span>
                  <span className="text-green-400 font-bold">{metric.potentialValue}{metric.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Portfolio */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Your Skill
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Portfolio</span>
        </h3>
        
        <div className="grid gap-4">
          {skillAssets.map((skill, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-bold">{skill.name}</h4>
                  <span className="text-gray-400 text-sm">{skill.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">${skill.marketValue.toLocaleString()}</div>
                  <div className="text-blue-400 text-sm">+{skill.growth}% growth</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm w-16">Level:</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-white font-medium w-12">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Strategy */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Your Growth
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Strategy</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {lifeGoals.map((goal, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-bold">{goal.title}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  goal.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {goal.priority} priority
                </span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-400" />
                  <span className="text-gray-400">Timeline:</span>
                  <span className="text-white">{goal.timeframe}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-violet-400" />
                  <span className="text-gray-400">Investment:</span>
                  <span className="text-white">{goal.investment}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-gray-400">Expected ROI:</span>
                  <span className="text-green-400 font-medium">{goal.expectedROI}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Life Valuation */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-white mb-6">
            Your Life
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Valuation</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$2.4M</div>
              <div className="text-gray-400">Current Life Value</div>
              <div className="text-sm text-gray-500 mt-1">Based on skills & experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">$3.8M</div>
              <div className="text-gray-400">Potential Life Value</div>
              <div className="text-sm text-gray-500 mt-1">With strategic growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-400 mb-2">+58%</div>
              <div className="text-gray-400">Growth Opportunity</div>
              <div className="text-sm text-gray-500 mt-1">Achievable in 3-5 years</div>
            </div>
          </div>
          
          <blockquote className="text-xl text-gray-300 italic mb-8">
            "Your life is your most important business. Invest in it wisely."
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentStep('assessment')}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <RotateCcw size={20} />
              Reassess Portfolio
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Download size={20} />
              Download Report
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Share2 size={20} />
              Share Analysis
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-violet-900/20" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                YouInc
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-4">
                Analyze your life as a business and optimize for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {currentStep === 'assessment' && renderAssessment()}
        {currentStep === 'analysis' && renderAnalysis()}
        {currentStep === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default YouInc;