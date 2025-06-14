import React, { useState } from 'react';
import { User, Settings, Menu } from 'lucide-react';
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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close profile dropdown when opening mobile menu
    if (!isMobileMenuOpen) {
      setShowProfileDropdown(false);
    }
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
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
    <div className="min-h-screen bg-black text-white">
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

      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
          {/* Left Section - Menu & Title */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="mobile-menu-button lg:hidden p-2 lg:p-3 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <Menu size={18} className="lg:w-5 lg:h-5" />
            </button>

            {/* Title - Hidden on small mobile */}
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                ShadowTwin
              </h1>
              <p className="text-gray-400 text-xs lg:text-sm hidden md:block">Explore alternate realities</p>
            </div>
          </div>
          
          {/* Right Section - Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                // Close mobile menu when opening profile dropdown
                if (!showProfileDropdown) {
                  setIsMobileMenuOpen(false);
                }
              }}
              className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="text-white" size={14} className="lg:w-4 lg:h-4" />
                )}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-white font-medium text-sm lg:text-base">{user.name}</div>
                <div className="text-gray-400 text-xs lg:text-sm hidden lg:block">{user.email}</div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileDropdown && (
              <div className="absolute top-full right-0 mt-2 w-56 lg:w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
                <div className="p-3 lg:p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                      <User className="text-white" size={16} className="lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm lg:text-base">{user.name}</div>
                      <div className="text-gray-400 text-xs lg:text-sm">{user.email}</div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => {
                      setShowAPIConfig(true);
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left p-2 lg:p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 text-gray-300 hover:text-white text-sm lg:text-base"
                  >
                    <Settings size={14} className="lg:w-4 lg:h-4" />
                    API Configuration
                  </button>
                  <button className="w-full text-left p-2 lg:p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 text-gray-300 hover:text-white text-sm lg:text-base">
                    <User size={14} className="lg:w-4 lg:h-4" />
                    Profile Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 lg:px-6 pb-3 lg:pb-4">
            <div className="p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
              <p className="text-yellow-300 text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Left Navigation */}
      <ShadowTwinNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={() => console.log('Logout')}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        onNavigateToMain={onBack}
      />

      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-300">
        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinPage;