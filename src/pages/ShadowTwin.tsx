import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Calendar, MessageSquare, Briefcase, Heart, ArrowLeft, Sparkles, Video, Mic, User, Camera, Download, Share2, RotateCcw, Instagram, Twitter, MapPin, Trophy, Clock, Send, Pause, Settings, Eye, Brain, Zap, Star, Globe, ChevronRight, Plus, Filter, Search, BookOpen, Coffee, Plane, Music } from 'lucide-react';
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

interface TimelineEvent {
  age: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  year: string;
  location: string;
  impact: string;
}

interface SocialPost {
  platform: 'instagram' | 'twitter';
  image: string;
  caption: string;
  hashtags: string[];
  likes: number;
  time: string;
  location?: string;
}

interface ComparisonData {
  category: string;
  realYou: string;
  shadowTwin: string;
  icon: React.ReactNode;
  improvement: number;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'shadowtwin';
  message: string;
  timestamp: Date;
  audioUrl?: string;
  emotion?: 'excited' | 'thoughtful' | 'nostalgic' | 'inspiring';
}

interface LifeMetric {
  label: string;
  realValue: number;
  shadowValue: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

// Enhanced API Configuration Component
const APIConfigModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: { tavusApiKey: string; elevenLabsApiKey: string }) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [tavusApiKey, setTavusApiKey] = useState('9acf3d70659349aab5cb638470978303');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ tavusApiKey, elevenLabsApiKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-violet-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-violet-500/20">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Settings className="text-white" size={20} />
          </div>
          AI Configuration
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3 flex items-center gap-2">
              <Video size={16} className="text-violet-400" />
              Tavus API Key
            </label>
            <input
              type="password"
              value={tavusApiKey}
              onChange={(e) => setTavusApiKey(e.target.value)}
              placeholder="Enter your Tavus API key"
              className="w-full p-4 bg-black/40 border border-violet-500/30 rounded-xl text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all"
            />
            <p className="text-gray-400 text-sm mt-2">For AI video generation with your likeness</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-3 flex items-center gap-2">
              <Mic size={16} className="text-cyan-400" />
              ElevenLabs API Key
            </label>
            <input
              type="password"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              placeholder="Enter your ElevenLabs API key"
              className="w-full p-4 bg-black/40 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
            <p className="text-gray-400 text-sm mt-2">For realistic AI voice synthesis</p>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-xl p-4">
            <p className="text-green-300 text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <strong>Ready to Generate:</strong> Your API keys are configured and ready for ShadowTwin creation!
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/25"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Form Section with better UX
const FormSection: React.FC<{
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
}> = ({ formData, setFormData, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const steps = [
    { title: 'Personal Info', icon: <User size={20} />, fields: ['name'] },
    { title: 'Current Life', icon: <Briefcase size={20} />, fields: ['currentBio'] },
    { title: 'Life Decisions', icon: <MapPin size={20} />, fields: ['majorDecisions'] },
    { title: 'Dreams & Aspirations', icon: <Sparkles size={20} />, fields: ['dreamsNotPursued'] },
    { title: 'Photo Upload', icon: <Camera size={20} />, fields: ['selfie'] }
  ];

  useEffect(() => {
    const requiredFields = ['name', 'currentBio', 'majorDecisions', 'dreamsNotPursued'];
    const isFormValid = requiredFields.every(field => formData[field as keyof FormData]);
    setIsValid(isFormValid);
  }, [formData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, selfie: file });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Let's start with you</h3>
              <p className="text-gray-400">Tell us your name to personalize your ShadowTwin experience</p>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full p-6 bg-black/30 backdrop-blur-md border border-violet-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all duration-300 text-lg"
            />
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <Briefcase className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Your current reality</h3>
              <p className="text-gray-400">Describe your background, career, and current life situation</p>
            </div>
            <textarea
              value={formData.currentBio}
              onChange={(e) => setFormData({ ...formData, currentBio: e.target.value })}
              placeholder="Tell us about your education, career, relationships, where you live, and what your typical day looks like..."
              rows={6}
              className="w-full p-6 bg-black/30 backdrop-blur-md border border-blue-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none text-lg"
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Life-changing decisions</h3>
              <p className="text-gray-400">What major choices shaped your current path?</p>
            </div>
            <textarea
              value={formData.majorDecisions}
              onChange={(e) => setFormData({ ...formData, majorDecisions: e.target.value })}
              placeholder="Career choices, where you moved, relationships, education paths, financial decisions, family choices..."
              rows={6}
              className="w-full p-6 bg-black/30 backdrop-blur-md border border-teal-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 resize-none text-lg"
            />
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Dreams deferred</h3>
              <p className="text-gray-400">What paths did you not take? What dreams remain unexplored?</p>
            </div>
            <textarea
              value={formData.dreamsNotPursued}
              onChange={(e) => setFormData({ ...formData, dreamsNotPursued: e.target.value })}
              placeholder="Creative pursuits, travel dreams, business ideas, alternative careers, artistic endeavors, adventures..."
              rows={6}
              className="w-full p-6 bg-black/30 backdrop-blur-md border border-pink-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 resize-none text-lg"
            />
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Camera className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Your visual identity</h3>
              <p className="text-gray-400">Upload a photo to create your personalized AI twin</p>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="selfie-upload"
              />
              <label
                htmlFor="selfie-upload"
                className="flex flex-col items-center justify-center w-full p-12 bg-black/30 backdrop-blur-md border-2 border-dashed border-cyan-500/30 rounded-2xl text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer group"
              >
                {formData.selfie ? (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-400/50">
                      <img 
                        src={URL.createObjectURL(formData.selfie)} 
                        alt="Your photo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-cyan-400 font-medium">{formData.selfie.name}</p>
                    <p className="text-gray-500 text-sm mt-1">Click to change photo</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={48} className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-medium text-lg mb-2">Click to upload your photo</p>
                    <p className="text-sm text-gray-500">This helps create a more realistic simulation</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                index <= currentStep 
                  ? 'bg-gradient-to-br from-violet-500 to-cyan-500 text-white' 
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {step.icon}
              </div>
              <span className={`text-xs font-medium ${
                index <= currentStep ? 'text-white' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Previous
        </button>
        
        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!formData[steps[currentStep].fields[0] as keyof FormData]}
            className="px-8 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next Step
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!isValid}
            className="px-12 py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-2xl text-white font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            <Sparkles size={24} />
            Create My ShadowTwin
          </button>
        )}
      </div>
    </div>
  );
};

// Enhanced Timeline with more visual appeal
const TimelineSection: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-white mb-4">
          Your Alternate
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Life Journey</span>
        </h3>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore the pivotal moments that shaped your ShadowTwin's extraordinary path
        </p>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Enhanced timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500 rounded-full shadow-lg shadow-violet-500/30" />
        
        <div className="space-y-16">
          {events.map((event, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} group`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                <div className="p-8 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-violet-400/30 transition-all duration-500 group-hover:scale-105 shadow-xl">
                  <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {event.icon}
                    </div>
                    <div className={index % 2 === 0 ? 'text-right' : 'text-left'}>
                      <p className="text-violet-400 font-bold text-lg">Age {event.age}</p>
                      <p className="text-gray-400">{event.year}</p>
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-xl mb-3">{event.title}</h4>
                  <p className="text-gray-300 leading-relaxed mb-4">{event.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <Zap size={14} />
                      <span>{event.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced timeline dot */}
              <div className="relative z-10 w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full border-4 border-black flex-shrink-0 shadow-lg shadow-violet-500/50 group-hover:scale-125 transition-transform duration-300" />
              
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Life Metrics Dashboard
const LifeMetricsSection: React.FC<{ metrics: LifeMetric[] }> = ({ metrics }) => {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold text-white mb-4">
          Life Impact
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Analysis</span>
        </h3>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Compare key life metrics between your current reality and your ShadowTwin's journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-violet-400/30 transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {metric.icon}
              </div>
              <h4 className="text-white font-bold">{metric.label}</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Current You</span>
                  <span className="text-white font-bold">{metric.realValue}{metric.unit}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gray-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${metric.realValue}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">ShadowTwin</span>
                  <span className="text-cyan-400 font-bold">{metric.shadowValue}{metric.unit}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${metric.shadowValue}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ShadowTwinProps {
  onBack: () => void;
  user: User | null;
}

const ShadowTwin: React.FC<ShadowTwinProps> = ({ onBack, user }) => {
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'generating', 'results'
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    currentBio: '',
    majorDecisions: '',
    dreamsNotPursued: ''
  });
  const [showAPIConfig, setShowAPIConfig] = useState(false);
  const [apiConfig, setApiConfig] = useState<{ tavusApiKey: string; elevenLabsApiKey: string }>({
    tavusApiKey: '9acf3d70659349aab5cb638470978303',
    elevenLabsApiKey: 'sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d'
  });

  const { 
    isGenerating, 
    videoUrl, 
    audioUrls, 
    error, 
    generateShadowTwinContent, 
    generateVoiceResponse 
  } = useAIServices(apiConfig);

  const handleSubmit = async () => {
    setCurrentStep('generating');
    
    try {
      await generateShadowTwinContent(formData);
      setTimeout(() => {
        setCurrentStep('results');
      }, 4000);
    } catch (error) {
      console.error('Error generating ShadowTwin:', error);
      setTimeout(() => {
        setCurrentStep('results');
      }, 4000);
    }
  };

  const handleTryAgain = () => {
    setCurrentStep('form');
    setFormData({
      name: user?.name || '',
      currentBio: '',
      majorDecisions: '',
      dreamsNotPursued: ''
    });
  };

  const handleAPIConfig = (config: { tavusApiKey: string; elevenLabsApiKey: string }) => {
    setApiConfig(config);
  };

  // Enhanced mock data
  const timelineEvents: TimelineEvent[] = [
    {
      age: 22,
      year: '2018',
      title: 'The Great Leap',
      description: 'Left the corporate world behind and moved to Barcelona to pursue photography full-time',
      icon: <Plane className="text-white" size={20} />,
      location: 'Barcelona, Spain',
      impact: 'Life-changing'
    },
    {
      age: 24,
      year: '2020',
      title: 'First Gallery Exhibition',
      description: 'Solo photography exhibition "Urban Souls" featured in Barcelona Modern Art Gallery, selling out in 3 days',
      icon: <Camera className="text-white" size={20} />,
      location: 'Barcelona, Spain',
      impact: 'Career breakthrough'
    },
    {
      age: 26,
      year: '2022',
      title: 'Documentary Series Launch',
      description: 'Created award-winning documentary series "Hidden Stories" about street artists across Europe',
      icon: <Video className="text-white" size={20} />,
      location: 'Europe-wide',
      impact: 'International recognition'
    },
    {
      age: 28,
      year: '2024',
      title: 'Global Recognition',
      description: 'Photography featured in National Geographic, established creative studio, and launched mentorship program',
      icon: <Trophy className="text-white" size={20} />,
      location: 'Global',
      impact: 'Legacy building'
    }
  ];

  const lifeMetrics: LifeMetric[] = [
    {
      label: 'Creative Fulfillment',
      realValue: 45,
      shadowValue: 95,
      unit: '%',
      icon: <Sparkles className="text-white" size={20} />,
      color: 'from-pink-500 to-violet-500'
    },
    {
      label: 'Global Impact',
      realValue: 25,
      shadowValue: 85,
      unit: '%',
      icon: <Globe className="text-white" size={20} />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Adventure Level',
      realValue: 30,
      shadowValue: 90,
      unit: '%',
      icon: <Plane className="text-white" size={20} />,
      color: 'from-green-500 to-teal-500'
    },
    {
      label: 'Artistic Recognition',
      realValue: 15,
      shadowValue: 88,
      unit: '%',
      icon: <Star className="text-white" size={20} />,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const renderGenerating = () => (
    <div className="text-center py-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative w-40 h-40 mx-auto mb-12">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-violet-500/30 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-violet-500 rounded-full" />
          </div>
          {/* Inner rotating ring */}
          <div className="absolute inset-4 rounded-full border-4 border-cyan-500/30 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full" />
          </div>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="text-white animate-pulse" size={32} />
            </div>
          </div>
        </div>
        
        <h2 className="text-5xl font-bold text-white mb-8">
          Weaving Your
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Alternate Reality</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-black/20 backdrop-blur-md border border-violet-500/30 rounded-2xl">
            <Brain size={32} className="text-violet-400 mx-auto mb-4" />
            <h4 className="text-white font-bold mb-2">Analyzing Choices</h4>
            <p className="text-gray-400 text-sm">Processing your life decisions and unexplored paths</p>
          </div>
          <div className="p-6 bg-black/20 backdrop-blur-md border border-blue-500/30 rounded-2xl">
            <Zap size={32} className="text-blue-400 mx-auto mb-4" />
            <h4 className="text-white font-bold mb-2">Creating Timeline</h4>
            <p className="text-gray-400 text-sm">Building your alternate life journey and milestones</p>
          </div>
          <div className="p-6 bg-black/20 backdrop-blur-md border border-cyan-500/30 rounded-2xl">
            <Eye size={32} className="text-cyan-400 mx-auto mb-4" />
            <h4 className="text-white font-bold mb-2">Manifesting Twin</h4>
            <p className="text-gray-400 text-sm">Bringing your ShadowTwin to life with AI</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/30 rounded-2xl p-6">
          <p className="text-white text-lg">
            "Every choice creates a universe. We're about to show you the one you didn't choose..."
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* API Configuration Modal */}
      <APIConfigModal
        isOpen={showAPIConfig}
        onClose={() => setShowAPIConfig(false)}
        onSave={handleAPIConfig}
      />

      {/* Enhanced Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-cyan-900/20" />
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-violet-400/20 to-cyan-400/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 6 + 4}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <button
                onClick={onBack}
                className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white hover:border-violet-400/50 transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  ShadowTwin
                </h1>
                <p className="text-xl md:text-2xl text-gray-300">
                  Meet the version of you that chose a different path
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAPIConfig(true)}
              className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white hover:border-cyan-400/50 transition-all duration-300 hover:scale-110"
              title="Configure AI Services"
            >
              <Settings size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl">
              <p className="text-yellow-300">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {currentStep === 'form' && (
          <FormSection
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        )}

        {currentStep === 'generating' && renderGenerating()}

        {currentStep === 'results' && (
          <div className="space-y-20">
            <LifeMetricsSection metrics={lifeMetrics} />
            <TimelineSection events={timelineEvents} />
            
            {/* Video Generation Panel */}
            <VideoGenerationPanel
              formData={formData}
              onVideoGenerated={() => {}}
              tavusApiKey={apiConfig.tavusApiKey}
            />
            
            {/* Action Buttons */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h3 className="text-3xl font-bold text-white mb-6">
                  Ready to Explore
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> More?</span>
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleTryAgain}
                    className="px-8 py-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center shadow-lg shadow-violet-500/25"
                  >
                    <RotateCcw size={20} />
                    Create Another Twin
                  </button>
                  
                  <button className="px-8 py-4 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-3 justify-center">
                    <Download size={20} />
                    Download Journey
                  </button>
                  
                  <button className="px-8 py-4 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-3 justify-center">
                    <Share2 size={20} />
                    Share Discovery
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTwin;