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
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [apiConfig, setApiConfig] = useState<AIServicesConfig>({
    tavusApiKey: '9acf3d70659349aab5cb638470978303',
    elevenLabsApiKey: 'sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d',
    geminiApiKey: 'AIzaSyA6QBBNKfsbQb2Xq5iQQ57krHfSsxFywxc'
  });

  const { 
    isGenerating, 
    // videoUrl, 
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

  const handleNavCollapse = (collapsed: boolean) => {
    setIsNavCollapsed(collapsed);
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
          // videoUrl={videoUrl}
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

      {/* Left Navigation - Fixed Sidebar for Desktop */}
      <ShadowTwinNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={() => console.log('Logout')}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
        onNavigateToMain={onBack}
        onNavCollapse={handleNavCollapse}
      />

      {/* Main Content Area - Properly positioned relative to navigation */}
      <div className={`relative min-h-screen transition-all duration-300 ${
        isNavCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Compact Top Bar */}
        <div className="fixed top-0 right-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300"
             style={{ left: isNavCollapsed ? '64px' : '256px' }}>
          <div className="flex items-center justify-between h-[73px] px-4">
            {/* Left Section - Mobile Menu Only */}
            <div className="flex items-center">
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
            
            {/* Right Section - Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="text-white" size={16} />
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium">{user.name}</span>
              </button>

              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        setShowAPIConfig(true);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-2 text-gray-300 hover:text-white text-sm"
                    >
                      <Settings size={14} />
                      API Configuration
                    </button>
                    <button className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-2 text-gray-300 hover:text-white text-sm">
                      <User size={14} />
                      Profile Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="px-4 py-2 bg-red-500/10 border-t border-red-400/20">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}
        </div>

        {/* Page Content - Update top padding to match new header height */}
        <div className="pt-[73px] p-4 lg:p-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinPage;