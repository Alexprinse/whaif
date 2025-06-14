import { useState, useCallback } from 'react';
import { TavusService } from '../services/tavusApi';
import { ElevenLabsService } from '../services/elevenLabsApi';
import { GeminiService } from '../services/geminiApi';
import { FormData } from '../types';

interface AIServicesConfig {
  tavusApiKey?: string;
  elevenLabsApiKey?: string;
  geminiApiKey?: string;
}

export const useAIServices = (config: AIServicesConfig) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [socialPosts, setSocialPosts] = useState<any[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const tavusService = config.tavusApiKey ? new TavusService(config.tavusApiKey) : null;
  const elevenLabsService = config.elevenLabsApiKey ? new ElevenLabsService(config.elevenLabsApiKey) : null;
  const geminiService = config.geminiApiKey ? new GeminiService(config.geminiApiKey) : null;

  const generateShadowTwinContent = useCallback(async (formData: FormData) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Generate content using Gemini AI
      if (geminiService) {
        console.log('Generating AI content with Gemini...');
        
        // Generate timeline events
        try {
          const events = await geminiService.generateTimelineEvents(formData);
          setTimelineEvents(events);
          console.log('Timeline events generated:', events);
        } catch (err) {
          console.error('Error generating timeline:', err);
          setError('Failed to generate timeline events. Using fallback data.');
        }

        // Generate social posts
        try {
          const posts = await geminiService.generateSocialPosts(formData);
          setSocialPosts(posts);
          console.log('Social posts generated:', posts);
        } catch (err) {
          console.error('Error generating social posts:', err);
          setError('Failed to generate social posts. Using fallback data.');
        }

        // Generate comparison data
        try {
          const comparison = await geminiService.generateComparisonData(formData);
          setComparisonData(comparison);
          console.log('Comparison data generated:', comparison);
        } catch (err) {
          console.error('Error generating comparison:', err);
          setError('Failed to generate comparison data. Using fallback data.');
        }
      } else {
        setError('Gemini API key not configured. Please add your API key in settings.');
      }

      // Generate voice messages using ElevenLabs
      if (elevenLabsService) {
        try {
          const messages = elevenLabsService.generateShadowTwinMessages(formData);
          const voiceId = elevenLabsService.getRecommendedVoice(formData);
          
          const audioPromises = messages.slice(0, 3).map(async (message) => {
            const audioBlob = await elevenLabsService.generateSpeech({
              text: message,
              voice_id: voiceId,
              voice_settings: {
                stability: 0.6,
                similarity_boost: 0.8,
                style: 0.2,
                use_speaker_boost: true,
              },
            });
            
            return URL.createObjectURL(audioBlob);
          });

          const generatedAudioUrls = await Promise.all(audioPromises);
          setAudioUrls(generatedAudioUrls);
          console.log('Audio generated successfully');
        } catch (err) {
          console.error('Error generating audio:', err);
          setError('Voice generation failed. Text responses will be available.');
        }
      }

    } catch (err) {
      console.error('Error generating AI content:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate AI content');
    } finally {
      setIsGenerating(false);
    }
  }, [geminiService, elevenLabsService]);

  const generateChatResponse = useCallback(async (
    userMessage: string, 
    formData: FormData, 
    conversationHistory: string[] = []
  ): Promise<{ text: string; audioUrl?: string }> => {
    if (!geminiService) {
      throw new Error('Gemini API not configured');
    }

    try {
      // Generate text response
      const textResponse = await geminiService.generateChatResponse(
        userMessage, 
        formData, 
        conversationHistory
      );

      let audioUrl: string | undefined;

      // Generate voice response if ElevenLabs is available
      if (elevenLabsService) {
        try {
          const voiceId = elevenLabsService.getRecommendedVoice(formData);
          const audioBlob = await elevenLabsService.generateSpeech({
            text: textResponse,
            voice_id: voiceId,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.1,
              use_speaker_boost: true,
            },
          });

          audioUrl = URL.createObjectURL(audioBlob);
        } catch (err) {
          console.error('Error generating voice response:', err);
          // Continue without audio
        }
      }

      return { text: textResponse, audioUrl };
    } catch (err) {
      console.error('Error generating chat response:', err);
      throw err;
    }
  }, [geminiService, elevenLabsService]);

  const generateVoiceResponse = useCallback(async (message: string, formData: FormData) => {
    if (!elevenLabsService) {
      return null;
    }

    try {
      const voiceId = elevenLabsService.getRecommendedVoice(formData);
      const audioBlob = await elevenLabsService.generateSpeech({
        text: message,
        voice_id: voiceId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.1,
          use_speaker_boost: true,
        },
      });

      return URL.createObjectURL(audioBlob);
    } catch (err) {
      console.error('Error generating voice response:', err);
      return null;
    }
  }, [elevenLabsService]);

  return {
    isGenerating,
    videoUrl,
    audioUrls,
    timelineEvents,
    socialPosts,
    comparisonData,
    error,
    generateShadowTwinContent,
    generateChatResponse,
    generateVoiceResponse,
  };
};