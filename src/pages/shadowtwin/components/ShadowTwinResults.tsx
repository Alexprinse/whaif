import React from 'react';
import { MapPin, Camera, Video, Trophy, Briefcase, Heart, Sparkles } from 'lucide-react';
import TimelineSection from './TimelineSection';
import VideoMessage from './VideoMessage';
import SocialFeed from './SocialFeed';
import ComparisonTable from './ComparisonTable';
import ChatInterface from './ChatInterface';
import ReflectionSection from './ReflectionSection';
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

  return (
    <div>
      <TimelineSection events={timelineEventsWithIcons} />
      <VideoMessage 
        videoUrl={videoUrl} 
        audioUrls={audioUrls}
        isGenerating={isGenerating}
      />
      <SocialFeed posts={socialPostsWithImages} />
      <ComparisonTable data={comparisonDataWithIcons} />
      <ChatInterface 
        formData={formData}
        generateChatResponse={generateChatResponse}
      />
      <ReflectionSection onTryAgain={onTryAgain} />
    </div>
  );
};

export default ShadowTwinResults;