import React, { useState } from 'react';
import { Upload, Play, Calendar, MessageSquare, Briefcase, Heart, ArrowLeft, Sparkles, Video, Mic } from 'lucide-react';

interface UploadStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  placeholder: string;
}

const UploadStep: React.FC<UploadStepProps> = ({ icon, title, description, placeholder }) => {
  return (
    <div className="group p-6 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 hover:border-violet-400/30 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-3">{description}</p>
          <textarea
            placeholder={placeholder}
            className="w-full h-24 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};

const SimulationPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  const tabs = [
    { id: 'timeline', label: 'Life Timeline', icon: <Calendar size={16} /> },
    { id: 'social', label: 'Social Posts', icon: <MessageSquare size={16} /> },
    { id: 'work', label: 'Career Updates', icon: <Briefcase size={16} /> },
    { id: 'video', label: 'Video Feed', icon: <Video size={16} /> }
  ];

  const timelineEvents = [
    { year: '2020', event: 'Started art school in Paris', mood: 'excited' },
    { year: '2021', event: 'First gallery exhibition', mood: 'proud' },
    { year: '2022', event: 'Met fellow artist Sarah', mood: 'love' },
    { year: '2023', event: 'Opened studio in Montmartre', mood: 'accomplished' },
    { year: '2024', event: 'International art residency', mood: 'adventurous' }
  ];

  const socialPosts = [
    { content: "Just sold my first painting to a collector in Tokyo! 🎨✨", likes: 247, time: '2h ago' },
    { content: "Morning coffee in my Montmartre studio. This light never gets old.", likes: 156, time: '1d ago' },
    { content: "Collaboration piece with Sarah is coming together beautifully", likes: 89, time: '3d ago' }
  ];

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
          <Play className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Your Shadow Life Preview</h3>
          <p className="text-gray-300 text-sm">Artist in Paris • Timeline Active</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs">Live Simulation</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-violet-500/20 text-violet-300 border border-violet-400/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-black/20 border border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {event.year}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{event.event}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Heart size={14} className="text-pink-400" />
                    <span className="text-gray-400 text-sm capitalize">{event.mood}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-4">
            {socialPosts.map((post, index) => (
              <div key={index} className="p-4 rounded-lg bg-black/20 border border-white/5">
                <p className="text-white mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {post.likes} likes
                  </span>
                  <span>{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'work' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-black/20 border border-white/5">
              <h4 className="text-white font-medium mb-2">Studio Montmartre - Owner & Lead Artist</h4>
              <p className="text-gray-300 text-sm mb-3">Running my own art studio in the heart of Paris, specializing in contemporary mixed media.</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded">Creative Director</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Entrepreneur</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-black/20 border border-white/5">
              <h4 className="text-white font-medium mb-2">International Art Residency Program</h4>
              <p className="text-gray-300 text-sm">Selected for prestigious 6-month residency in Tokyo, exploring cultural fusion in contemporary art.</p>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-to-br from-violet-900/20 to-blue-900/20 rounded-lg border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <Video className="text-violet-400 mx-auto mb-3" size={48} />
                <p className="text-white font-medium mb-2">AI-Generated Video Feed</p>
                <p className="text-gray-400 text-sm mb-4">Watch yourself living your alternate life</p>
                <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white text-sm font-medium hover:scale-105 transition-transform duration-200">
                  Generate Video
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-video bg-black/20 rounded-lg border border-white/10 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Studio Tour</span>
              </div>
              <div className="aspect-video bg-black/20 rounded-lg border border-white/10 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Gallery Opening</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ShadowTwin: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const uploadSteps = [
    {
      icon: <Upload className="text-white" size={20} />,
      title: "Life Biography",
      description: "Tell us about your background, education, and key life decisions",
      placeholder: "I grew up in a small town, studied computer science, chose stability over my dream of becoming an artist..."
    },
    {
      icon: <Heart className="text-white" size={20} />,
      title: "Paths Not Taken",
      description: "What decisions did you almost make? What dreams did you set aside?",
      placeholder: "I almost moved to Paris to study art, considered starting my own business, thought about traveling the world..."
    },
    {
      icon: <Sparkles className="text-white" size={20} />,
      title: "Dreams & Aspirations",
      description: "What did you want to become? What life did you envision?",
      placeholder: "I wanted to be a successful artist, live in a creative community, have my work displayed in galleries..."
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(4);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              ShadowTwin
            </h1>
            <p className="text-gray-300">AI That Lives the Life You Didn't Choose</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white'
                  : 'bg-black/20 border border-white/10 text-gray-400'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-px transition-all duration-300 ${
                  step < currentStep ? 'bg-gradient-to-r from-violet-500 to-blue-500' : 'bg-white/10'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep <= 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Step {currentStep}: {uploadSteps[currentStep - 1].title}
              </h2>
              <p className="text-gray-300">
                {uploadSteps[currentStep - 1].description}
              </p>
            </div>

            <UploadStep {...uploadSteps[currentStep - 1]} />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep === 3 ? (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating Your Shadow Life...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Shadow Life
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white font-semibold hover:scale-105 transition-all duration-200"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        {/* Simulation Results */}
        {currentStep === 4 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Your Shadow Life is Ready
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Experience the life you could have lived. This AI-generated simulation shows your alternate path as an artist in Paris, complete with timeline, social presence, and career progression.
              </p>
            </div>

            <SimulationPreview />

            {/* AI Technology Info */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="text-violet-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">Tavus AI Video</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Advanced AI creates realistic video content showing you living your alternate life, with natural expressions and movements.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Mic className="text-blue-400" size={24} />
                  <h3 className="text-lg font-semibold text-white">ElevenLabs Voice</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Your voice is cloned and adapted to reflect the confidence and experiences of your alternate self.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/20 transition-all duration-200 mr-4"
              >
                Create Another
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white font-semibold hover:scale-105 transition-all duration-200">
                Share Your Shadow Life
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTwin;