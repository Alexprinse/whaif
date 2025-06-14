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

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

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
        {/* Compact Top Bar - Full width on mobile, positioned after nav on desktop */}
        <div className="fixed top-0 left-0 right-0 lg:left-auto z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300"
             style={{ 
               // On large screens, start after the navigation width
               left: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (isNavCollapsed ? '64px' : '256px') : '0'
             }}>
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
            <div className="relative ml-auto profile-dropdown-container">
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

              {/* Beautiful Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fadeInDown">
                  {/* User Info Header */}
                  <div className="p-4 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <User className="text-white" size={20} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate">{user.name}</h3>
                        <p className="text-gray-400 text-sm truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        setShowAPIConfig(true);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-all duration-200 flex items-center gap-3 text-gray-300 hover:text-white group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Settings size={16} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">API Configuration</div>
                        <div className="text-xs text-gray-500">Manage AI service keys</div>
                      </div>
                    </button>
                    
                    <button className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-all duration-200 flex items-center gap-3 text-gray-300 hover:text-white group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <User size={16} className="text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Profile Settings</div>
                        <div className="text-xs text-gray-500">Update your information</div>
                      </div>
                    </button>

                    {/* Divider */}
                    <div className="my-2 border-t border-white/10" />

                    <button className="w-full text-left p-3 rounded-lg hover:bg-red-500/10 transition-all duration-200 flex items-center gap-3 text-gray-300 hover:text-red-300 group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Sign Out</div>
                        <div className="text-xs text-gray-500">End your session</div>
                      </div>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-black/20 border-t border-white/10">
                    <div className="text-xs text-gray-500 text-center">
                      ShadowTwin v1.0 • AI-Powered
                    </div>
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