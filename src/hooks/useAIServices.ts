import { useState, useCallback } from 'react';
import { TavusService } from '../services/tavusApi';
import { ElevenLabsService } from '../services/elevenLabsApi';

interface FormData {
  name: string;
  currentBio: string;
  majorDecisions: string;
  dreamsNotPursued: string;
  selfie?: File;
}

interface AIServicesConfig {
  tavusApiKey?: string;
  elevenLabsApiKey?: string;
}

export const useAIServices = (config: AIServicesConfig) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const tavusService = config.tavusApiKey ? new TavusService(config.tavusApiKey) : null;
  const elevenLabsService = config.elevenLabsApiKey ? new ElevenLabsService(config.elevenLabsApiKey) : null;

  const generateShadowTwinContent = useCallback(async (formData: FormData) => {
    if (!tavusService || !elevenLabsService) {
      setError('API keys not configured. Using demo mode.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Step 1: Generate voice messages
      const messages = elevenLabsService.generateShadowTwinMessages(formData);
      const voiceId = elevenLabsService.getRecommendedVoice(formData);
      
      const audioPromises = messages.map(async (message) => {
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

      // Step 2: Generate video (if user uploaded selfie)
      if (formData.selfie) {
        // First create a replica from the selfie
        const replica = await tavusService.createReplica(
          `${formData.name}_shadowtwin`,
          formData.selfie
        );

        // Generate script for video
        const script = tavusService.generateShadowTwinScript(formData);

        // Create video with the replica
        const videoResponse = await tavusService.createVideo({
          replica_id: replica.replica_id,
          script: script,
          background: 'creative_studio', // Changed from 'modern_office' to 'creative_studio'
          properties: {
            voice_settings: {
              stability: 0.6,
              similarity_boost: 0.8,
            },
          },
        });

        // Poll for video completion
        let videoStatus = videoResponse;
        while (videoStatus.status === 'queued' || videoStatus.status === 'generating') {
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
          videoStatus = await tavusService.getVideoStatus(videoResponse.video_id);
        }

        if (videoStatus.status === 'completed' && videoStatus.video_url) {
          setVideoUrl(videoStatus.video_url);
        } else {
          throw new Error('Video generation failed');
        }
      }

    } catch (err) {
      console.error('Error generating AI content:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate AI content');
    } finally {
      setIsGenerating(false);
    }
  }, [tavusService, elevenLabsService]);

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
    error,
    generateShadowTwinContent,
    generateVoiceResponse,
  };
};