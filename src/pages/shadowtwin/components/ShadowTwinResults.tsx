import React, { useState } from 'react';
import { Clock, MessageSquare, Video, Mic, ArrowRight, GalleryVertical, Share2, Download, Briefcase, Camera, Heart, MapPin, Sparkles, Trophy } from 'lucide-react';
import TimelineSection from './TimelineSection';
import ChatInterface from './ChatInterface';
import VideoMessage from './VideoMessage';
import SocialFeed from './SocialFeed';
import ComparisonTable from './ComparisonTable';
import ReflectionSection from './ReflectionSection';
import ShadowTwinVoice from './ShadowTwinVoice';
import ShadowTwinVideo from './ShadowTwinVideo';
import CompareSection from './CompareSection';
import SocialSection from './SocialSection';
import { ShadowTwinFormData, TimelineEvent, SocialPost, ComparisonData } from '../types';

interface ShadowTwinResultsProps {
  formData: ShadowTwinFormData;
  videoUrl?: string;
  audioUrls: string[];
  timelineEvents: any[];
  socialPosts: any[];
  comparisonData: any[];
  isGenerating: boolean;
  generateChatResponse: (message: string, formData: ShadowTwinFormData, history: string[]) => Promise<{ text: string; audioUrl?: string }>;
  onTryAgain: () => void;
}

type TabType = 'timeline' | 'chat' | 'voice' | 'video' | 'compare' | 'social';

const ShadowTwinResults: React.FC<ShadowTwinResultsProps> = ({
  formData,
  videoUrl,
  audioUrls,
  timelineEvents,
  socialPosts,
  comparisonData,
  isGenerating,
  generateChatResponse,
  onTryAgain
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('timeline');

  // Add icons to AI-generated data
  const timelineEventsWithIcons: TimelineEvent[] = timelineEvents.map((event, index) => ({
    ...event,
    icon: [
      <MapPin className="text-white" size={16} />,
      <Camera className="text-white" size={16} />,
      <Video className="text-white" size={16} />,
      <Trophy className="text-white" size={16} />
    ][index] || <Sparkles className="text-white" size={16} />
  }));

  const socialPostsWithImages: SocialPost[] = socialPosts.map(post => ({
    ...post,
    image: '' // Placeholder for AI-generated images
  }));

  const comparisonDataWithIcons: ComparisonData[] = comparisonData.map((item, index) => ({
    ...item,
    icon: [
      <Briefcase className="text-white" size={20} />,
      <MapPin className="text-white" size={20} />,
      <Trophy className="text-white" size={20} />,
      <Heart className="text-white" size={20} />
    ][index] || <Sparkles className="text-white" size={20} />
  }));

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: <Clock size={20} /> },
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={20} /> },
    { id: 'voice', label: 'Voice', icon: <Mic size={20} /> },
    { id: 'video', label: 'Video', icon: <Video size={20} /> },
    { id: 'compare', label: 'Compare', icon: <GalleryVertical size={20} /> },
    { id: 'social', label: 'Social', icon: <Share2 size={20} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return <TimelineSection events={timelineEvents} />;
      case 'chat':
        return <ChatInterface formData={formData} generateChatResponse={generateChatResponse} />;
      case 'voice':
        return <ShadowTwinVoice />;
      case 'video':
        return <ShadowTwinVideo />;
      case 'compare':
        return <CompareSection comparisonData={comparisonData} />;
      case 'social':
        return <SocialSection formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 border border-violet-400/20 rounded-2xl p-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Meet Your
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> ShadowTwin</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl">
          Explore your alternate reality through different perspectives. See how your life could have unfolded differently.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={onTryAgain}
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300"
          >
            Generate New Path
          </button>
          <button className="px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
            Save Results <Download size={18} />
          </button>
          <button className="px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
            Share Results <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-violet-400 border-violet-400'
                  : 'text-gray-400 border-transparent hover:text-white hover:border-white/20'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ShadowTwinResults;