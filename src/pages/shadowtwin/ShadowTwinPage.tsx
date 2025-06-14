import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useAIServices } from './hooks/useAIServices';
import { FormData, AIServicesConfig } from './types';
import APIConfigModal from './components/APIConfigModal';
import ShadowTwinInputModal from './components/ShadowTwinInputModal';
import ShadowTwinIntro from './components/ShadowTwinIntro';
import ShadowTwinGenerating from './components/ShadowTwinGenerating';
import ShadowTwinResults from './components/ShadowTwinResults';
import VideoGenerationPanel from '../../components/VideoGenerationPanel';

interface ShadowTwinPageProps {
  onBack: () => void;
}

const ShadowTwinPage: React.FC<ShadowTwinPageProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro', 'generating', 'results'
  const [formData, setFormData] = useState<FormData>({
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
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const { 
    isGenerating, 
    videoUrl, 
    audioUrls, 
    timelineEvents,
    socialPosts,
    comparisonData,
    error, 
    generateShadowTwinContent, 
    generateChatResponse,
    generateVoiceResponse 
  } = useAIServices(apiConfig);

  const handleInputSubmit = async (inputData: FormData) => {
    setFormData(inputData);
    setCurrentStep('generating');
    
    try {
      await generateShadowTwinContent(inputData);
      setTimeout(() => {
        setCurrentStep('results');
      }, 2000);
    } catch (error) {
      console.error('Error generating ShadowTwin:', error);
      // Still proceed to results for demo
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
    setGeneratedVideoUrl(null);
  };

  const handleAPIConfig = (config: AIServicesConfig) => {
    setApiConfig(config);
  };

  const handleVideoGenerated = (videoUrl: string) => {
    setGeneratedVideoUrl(videoUrl);
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  ShadowTwin
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mt-4">
                  Explore the life you never lived.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowAPIConfig(true)}
              className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
              title="Configure AI Services"
            >
              <Settings size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
              <p className="text-yellow-300 text-sm">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {currentStep === 'intro' && (
          <ShadowTwinIntro onStartJourney={() => setShowInputModal(true)} />
        )}

        {currentStep === 'generating' && <ShadowTwinGenerating />}

        {currentStep === 'results' && (
          <div>
            {/* Video Generation Panel */}
            <VideoGenerationPanel
              formData={formData}
              onVideoGenerated={handleVideoGenerated}
              tavusApiKey={apiConfig.tavusApiKey || ''}
            />
            
            <ShadowTwinResults
              formData={formData}
              videoUrl={generatedVideoUrl || videoUrl}
              audioUrls={audioUrls}
              timelineEvents={timelineEvents}
              socialPosts={socialPosts}
              comparisonData={comparisonData}
              isGenerating={isGenerating}
              generateChatResponse={generateChatResponse}
              onTryAgain={handleTryAgain}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShadowTwinPage;