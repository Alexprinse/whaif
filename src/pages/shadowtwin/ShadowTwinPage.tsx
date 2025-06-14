import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
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
              onClick={() => setShowAPIConfig(true)}
              className="p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
              title="Configure AI Services"
            >
              <Settings size={20} />
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