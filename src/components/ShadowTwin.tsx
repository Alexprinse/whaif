import React, { useState } from 'react';
import { Upload, Play, Calendar, MessageSquare, Briefcase, Heart, ArrowLeft, Sparkles, Video, Mic, User, Camera, Download, Share2, RotateCcw, Instagram, Twitter, MapPin, Trophy, Clock } from 'lucide-react';

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
}

interface SocialPost {
  platform: 'instagram' | 'twitter';
  image: string;
  caption: string;
  hashtags: string[];
  likes: number;
  time: string;
}

interface ComparisonData {
  category: string;
  realYou: string;
  shadowTwin: string;
  icon: React.ReactNode;
}

const FormSection: React.FC<{
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
}> = ({ formData, setFormData, onSubmit }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, selfie: file });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Tell Us About
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Your Story</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Share your journey, decisions, and dreams. Our AI will create a parallel universe where you made different choices.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Name Input */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2">
            <User size={20} className="text-violet-400" />
            What's your name?
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all duration-300"
          />
        </div>

        {/* Current Bio */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2">
            <MessageSquare size={20} className="text-blue-400" />
            Tell us about your current life
          </label>
          <textarea
            value={formData.currentBio}
            onChange={(e) => setFormData({ ...formData, currentBio: e.target.value })}
            placeholder="Describe your background, education, career, relationships, and current situation..."
            rows={4}
            className="w-full p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
          />
        </div>

        {/* Major Decisions */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2">
            <Briefcase size={20} className="text-teal-400" />
            What major life decisions did you make?
          </label>
          <textarea
            value={formData.majorDecisions}
            onChange={(e) => setFormData({ ...formData, majorDecisions: e.target.value })}
            placeholder="Career choices, where you moved, relationships, education paths, financial decisions..."
            rows={4}
            className="w-full p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 resize-none"
          />
        </div>

        {/* Dreams Not Pursued */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2">
            <Sparkles size={20} className="text-pink-400" />
            What dreams did you not pursue?
          </label>
          <textarea
            value={formData.dreamsNotPursued}
            onChange={(e) => setFormData({ ...formData, dreamsNotPursued: e.target.value })}
            placeholder="Creative pursuits, travel dreams, business ideas, alternative careers, relationships..."
            rows={4}
            className="w-full p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 resize-none"
          />
        </div>

        {/* Selfie Upload */}
        <div className="group">
          <label className="block text-white font-medium mb-3 flex items-center gap-2">
            <Camera size={20} className="text-cyan-400" />
            Upload a photo (optional)
          </label>
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
              className="flex items-center justify-center w-full p-8 bg-black/30 backdrop-blur-md border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <Upload size={32} className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-medium">
                  {formData.selfie ? formData.selfie.name : 'Click to upload your photo'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  This helps create a more personalized simulation
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-8">
          <button
            onClick={onSubmit}
            disabled={!formData.name || !formData.currentBio || !formData.majorDecisions || !formData.dreamsNotPursued}
            className="group relative px-12 py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles size={24} />
              Simulate My ShadowTwin
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TimelineSection: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Your Alternate
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Timeline</span>
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500 rounded-full" />
        
        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {event.icon}
                    </div>
                    <div>
                      <p className="text-violet-400 font-bold">Age {event.age}</p>
                      <p className="text-gray-400 text-sm">{event.year}</p>
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{event.title}</h4>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="relative z-10 w-6 h-6 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full border-4 border-black flex-shrink-0" />
              
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoMessage: React.FC = () => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Message from Your
        <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"> ShadowTwin</span>
      </h3>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-teal-900/20 rounded-2xl border border-white/10 overflow-hidden group">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Play className="text-white ml-1" size={32} />
              </div>
              <h4 className="text-white font-bold text-xl mb-3">AI-Generated Video Message</h4>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Watch yourself in an alternate reality, speaking about the life you could have lived
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Video size={16} className="text-violet-400" />
                  <span>Tavus AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic size={16} className="text-blue-400" />
                  <span>ElevenLabs Voice</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
};

const SocialFeed: React.FC<{ posts: SocialPost[] }> = ({ posts }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Your Shadow
        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"> Social Life</span>
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-violet-400/30 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
              <div className="text-center text-gray-400">
                {post.platform === 'instagram' ? <Instagram size={48} /> : <Twitter size={48} />}
                <p className="mt-2 text-sm">AI-Generated Image</p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                {post.platform === 'instagram' ? 
                  <Instagram size={16} className="text-pink-400" /> : 
                  <Twitter size={16} className="text-blue-400" />
                }
                <span className="text-gray-400 text-sm">{post.time}</span>
              </div>
              
              <p className="text-white mb-3">{post.caption}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {post.hashtags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-violet-400 text-sm">#{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Heart size={14} />
                <span>{post.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComparisonTable: React.FC<{ data: ComparisonData[] }> = ({ data }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Real You vs
        <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"> ShadowTwin</span>
      </h3>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-teal-400/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-lg">{item.category}</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                  <h5 className="text-gray-400 font-medium mb-2">Real You</h5>
                  <p className="text-white">{item.realYou}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg border border-violet-400/20">
                  <h5 className="text-violet-400 font-medium mb-2">ShadowTwin</h5>
                  <p className="text-white">{item.shadowTwin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReflectionSection: React.FC<{ onTryAgain: () => void }> = ({ onTryAgain }) => {
  return (
    <div className="mb-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="p-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl">
          <h3 className="text-3xl font-bold text-white mb-6">
            What Would You Do
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Differently Today?</span>
          </h3>
          
          <blockquote className="text-xl text-gray-300 italic mb-8 max-w-2xl mx-auto">
            "Seeing your ShadowTwin isn't about regret—it's about understanding the infinite possibilities that still exist within you."
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onTryAgain}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <RotateCcw size={20} />
              Try Different Choices
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Download size={20} />
              Download Report
            </button>
            
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 justify-center">
              <Share2 size={20} />
              Share ShadowTwin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShadowTwin: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'generating', 'results'
  const [formData, setFormData] = useState<FormData>({
    name: '',
    currentBio: '',
    majorDecisions: '',
    dreamsNotPursued: ''
  });

  const handleSubmit = () => {
    setCurrentStep('generating');
    setTimeout(() => {
      setCurrentStep('results');
    }, 4000);
  };

  const handleTryAgain = () => {
    setCurrentStep('form');
    setFormData({
      name: '',
      currentBio: '',
      majorDecisions: '',
      dreamsNotPursued: ''
    });
  };

  // Mock data for the simulation results
  const timelineEvents: TimelineEvent[] = [
    {
      age: 22,
      year: '2018',
      title: 'Moved to Barcelona',
      description: 'Left corporate job to pursue photography in Spain',
      icon: <MapPin className="text-white" size={16} />
    },
    {
      age: 24,
      year: '2020',
      title: 'First Gallery Exhibition',
      description: 'Solo photography exhibition "Urban Souls" featured in Barcelona Modern Art Gallery',
      icon: <Camera className="text-white" size={16} />
    },
    {
      age: 26,
      year: '2022',
      title: 'Travel Documentary Series',
      description: 'Created award-winning documentary series about street artists across Europe',
      icon: <Video className="text-white" size={16} />
    },
    {
      age: 28,
      year: '2024',
      title: 'International Recognition',
      description: 'Photography featured in National Geographic, established creative studio',
      icon: <Trophy className="text-white" size={16} />
    }
  ];

  const socialPosts: SocialPost[] = [
    {
      platform: 'instagram',
      image: '',
      caption: 'Golden hour in Barcelona never gets old. Every street tells a story. 📸✨',
      hashtags: ['photography', 'barcelona', 'streetart', 'goldenhour'],
      likes: 2847,
      time: '2h ago'
    },
    {
      platform: 'twitter',
      image: '',
      caption: 'Just wrapped filming for the new documentary series. The stories these artists shared... incredible.',
      hashtags: ['documentary', 'streetart', 'storytelling'],
      likes: 1203,
      time: '1d ago'
    },
    {
      platform: 'instagram',
      image: '',
      caption: 'Studio life. Coffee, creativity, and endless possibilities. What are you creating today?',
      hashtags: ['studio', 'creativity', 'photography', 'inspiration'],
      likes: 3156,
      time: '3d ago'
    }
  ];

  const comparisonData: ComparisonData[] = [
    {
      category: 'Career',
      realYou: 'Software Engineer at tech company',
      shadowTwin: 'Award-winning photographer and documentary filmmaker',
      icon: <Briefcase className="text-white" size={20} />
    },
    {
      category: 'Location',
      realYou: 'Living in hometown',
      shadowTwin: 'Based in Barcelona, travels across Europe',
      icon: <MapPin className="text-white" size={20} />
    },
    {
      category: 'Key Achievements',
      realYou: 'Stable income, good work-life balance',
      shadowTwin: 'National Geographic feature, gallery exhibitions, documentary awards',
      icon: <Trophy className="text-white" size={20} />
    },
    {
      category: 'Lifestyle',
      realYou: 'Routine-focused, security-oriented',
      shadowTwin: 'Adventure-driven, creatively fulfilled, internationally connected',
      icon: <Heart className="text-white" size={20} />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-cyan-900/20" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-violet-400/20 to-cyan-400/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Meet Your ShadowTwin
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mt-4">
                An AI-simulated version of the life you never lived.
              </p>
            </div>
          </div>
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

        {currentStep === 'generating' && (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-spin" style={{ animationDuration: '3s' }}>
                  <div className="absolute inset-2 rounded-full bg-black" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-violet-400" size={48} />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Generating Your
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> ShadowTwin</span>
              </h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="flex items-center justify-center gap-2">
                  <Clock size={16} className="text-violet-400" />
                  Analyzing your life choices...
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Video size={16} className="text-blue-400" />
                  Creating alternate timeline...
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Mic size={16} className="text-cyan-400" />
                  Generating AI persona...
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'results' && (
          <div>
            <TimelineSection events={timelineEvents} />
            <VideoMessage />
            <SocialFeed posts={socialPosts} />
            <ComparisonTable data={comparisonData} />
            <ReflectionSection onTryAgain={handleTryAgain} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTwin;