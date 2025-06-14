import React, { useState } from 'react';
import { ArrowLeft, User, Settings, Bell, HelpCircle, Shield } from 'lucide-react';
import { useAIServices } from './hooks/useAIServices';
import { ShadowTwinFormData, AIServicesConfig } from './types';
import APIConfigModal from './components/APIConfigModal';
import ShadowTwinInputModal from './components/ShadowTwinInputModal';
import ShadowTwinNavigation from './components/ShadowTwinNavigation';
import ShadowTwinHome from './components/ShadowTwinHome';
import ShadowTwinVoice from './components/ShadowTwinVoice';
import ShadowTwinVideo from './components/ShadowTwinVideo';
import ShadowTwinActivities from './components/ShadowTwinActivities';
import ShadowTwinGenerating from './components/ShadowTwinGenerating';
import ShadowTwinResults from './components/ShadowTwinResults';

interface ShadowTwinPageProps {
  onBack: () => void;
}

const ShadowTwinPage: React.FC<ShadowTwinPageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'generating', 'results'
  const [formData, setFormData] = useState<ShadowTwinFormData>({
    name: '',
    currentBio: '',
    majorDecisions: '',
    dreamsNotPursued: ''
  });
  const [showInputModal, setShowInputModal] = useState(false);
  const [showAPIConfig, setShowAPIConfig] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [apiConfig, setApiConfig] = useState<AIServicesConfig>({
    tavusApiKey: '9acf3d70659349aab5cb638470978303',
    elevenLabsApiKey: 'sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d',
    geminiApiKey: 'AIzaSyA6QBBNKfsbQb2Xq5iQQ57krHfSsxFywxc'
  });

  const { 
    isGenerating, 
    videoUrl, 
    audioUrls, 
    timelineEvents,
    socialPosts,
    comparisonData,
    error, 
    generateShadowTwinContent, 
    generateChatResponse
  } = useAIServices(apiConfig);

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: undefined
  };

  const profileMenuItems = [
    { 
      icon: <User size={20} className="text-blue-400" />, 
      label: 'Profile Settings', 
      description: 'Manage your account and preferences',
      action: () => console.log('Profile settings')
    },
    { 
      icon: <Settings size={20} className="text-violet-400" />, 
      label: 'API Configuration', 
      description: 'Configure AI service settings',
      action: () => setShowAPIConfig(true)
    },
    { 
      icon: <Bell size={20} className="text-green-400" />, 
      label: 'Notifications', 
      description: 'Manage notification preferences',
      action: () => console.log('Notifications')
    },
    { 
      icon: <Shield size={20} className="text-yellow-400" />, 
      label: 'Privacy & Security', 
      description: 'Control your data and security',
      action: () => console.log('Privacy')
    },
    { 
      icon: <HelpCircle size={20} className="text-cyan-400" />, 
      label: 'Help & Support', 
      description: 'Get help and contact support',
      action: () => console.log('Help')
    }
  ];

  const handleInputSubmit = async (inputData: ShadowTwinFormData) => {
    setFormData(inputData);
    setCurrentStep('generating');
    
    try {
      await generateShadowTwinContent(inputData);
      setTimeout(() => {
        setCurrentStep('results');
      }, 2000);
    } catch (error) {
      console.error('Error generating ShadowTwin:', error);
      setTimeout(() => {
        setCurrentStep('results');
      }, 2000);
    }
  };

  const handleTryAgain = () => {
    setCurrentStep('intro');
    setFormData({
      name: '',
      currentBio: '',
      majorDecisions: '',
      dreamsNotPursued: ''
    });
  };

  const handleAPIConfig = (config: AIServicesConfig) => {
    setApiConfig(config);
  };

  const renderMainContent = () => {
    // If we're in the middle of generating or showing results, show that instead of navigation sections
    if (currentStep === 'generating') {
      return <ShadowTwinGenerating />;
    }

    if (currentStep === 'results') {
      return (
        <ShadowTwinResults
          formData={formData}
          videoUrl={videoUrl}
          audioUrls={audioUrls}
          timelineEvents={timelineEvents}
          socialPosts={socialPosts}
          comparisonData={comparisonData}
          isGenerating={isGenerating}
          generateChatResponse={generateChatResponse}
          onTryAgain={handleTryAgain}
        />
      );
    }

    // Normal navigation sections
    switch (activeSection) {
      case 'home':
        return (
          <ShadowTwinHome 
            onStartJourney={() => setShowInputModal(true)}
            onNavigateToSection={setActiveSection}
          />
        );
      case 'voice':
        return <ShadowTwinVoice />;
      case 'video':
        return <ShadowTwinVideo />;
      case 'activities':
        return <ShadowTwinActivities />;
      default:
        return (
          <ShadowTwinHome 
            onStartJourney={() => setShowInputModal(true)}
            onNavigateToSection={setActiveSection}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Input Modal */}
      <ShadowTwinInputModal
        isOpen={showInputModal}
        onClose={() => setShowInputModal(false)}
        onSubmit={handleInputSubmit}
      />

      {/* API Configuration Modal */}
      <APIConfigModal
        isOpen={showAPIConfig}
        onClose={() => setShowAPIConfig(false)}
        onSave={handleAPIConfig}
      />

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="text-white" size={32} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user?.name || 'Guest User'}</h2>
                  <p className="text-gray-400">{user?.email || 'guest@example.com'}</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-violet-400">12</div>
                  <div className="text-xs text-gray-400">Sessions</div>
                </div>
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">47</div>
                  <div className="text-xs text-gray-400">Messages</div>
                </div>
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-cyan-400">8</div>
                  <div className="text-xs text-gray-400">Videos</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <div className="space-y-2">
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.label}
                      </div>
                      <div className="text-gray-400 text-sm">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    console.log('Logout');
                    setShowProfileModal(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <User size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Navigation */}
      <ShadowTwinNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={() => console.log('Logout')}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  ShadowTwin
                </h1>
                <p className="text-gray-400 text-sm">Explore alternate realities</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowProfileModal(true)}
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
              title="Profile"
            >
              <User size={20} />
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
              <p className="text-yellow-300 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Page Content */}
        <div className="p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinPage;