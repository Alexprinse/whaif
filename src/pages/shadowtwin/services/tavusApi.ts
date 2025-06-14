// Tavus API Integration for AI Video Generation
import { ShadowTwinFormData } from '../types';

export interface TavusVideoRequest {
  replica_id: string;
  script: string;
  background?: string;
  properties?: {
    voice_settings?: {
      stability: number;
      similarity_boost: number;
    };
  };
}

export interface TavusVideoResponse {
  video_id: string;
  status: 'queued' | 'generating' | 'completed' | 'failed';
  video_url?: string;
  thumbnail_url?: string;
  created_at: string;
}

export class TavusService {
  private apiKey: string;
  private baseUrl = 'https://tavusapi.com/v2';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createVideo(request: TavusVideoRequest): Promise<TavusVideoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating Tavus video:', error);
      throw error;
    }
  }

  async getVideoStatus(videoId: string): Promise<TavusVideoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/videos/${videoId}`, {
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting Tavus video status:', error);
      throw error;
    }
  }

  async createReplica(name: string, videoUrl: string, audioUrl?: string): Promise<{ replica_id: string }> {
    try {
      const payload: any = {
        replica_name: name,
        video_url: videoUrl,
      };

      // Add audio_url if provided
      if (audioUrl) {
        payload.audio_url = audioUrl;
      }

      const response = await fetch(`${this.baseUrl}/replicas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating Tavus replica:', error);
      throw error;
    }
  }

  // Generate script for ShadowTwin based on user data
  generateShadowTwinScript(formData: ShadowTwinFormData): string {
    const scripts = [
      `Hey there! It's incredible to see you. I'm ${formData.name}, but the version of you that chose the creative path. ${formData.dreamsNotPursued ? `Remember when you dreamed about ${formData.dreamsNotPursued}? Well, I actually did it.` : ''} Every day here feels like I'm living the life we always imagined.`,
      
      `You know, looking at the choices you made, I can see the wisdom in them. But I want you to know that the path I took - the one where I followed those dreams you set aside - it's been incredible. ${formData.majorDecisions ? `While you chose ${formData.majorDecisions}, I went the other way.` : ''} And honestly? Both paths have their beauty.`,
      
      `I often wonder about you, about the stability and security you chose. Sometimes I miss that certainty. But then I wake up each morning excited about the unknown, about the creative challenges ahead. ${formData.dreamsNotPursued ? `That dream about ${formData.dreamsNotPursued}? It became my reality.` : ''} What matters is that we're both living authentically.`,
      
      `The most beautiful thing I've learned is that there's no wrong choice - only different adventures. You built something solid and meaningful. I built something wild and uncertain. We're both versions of the same soul, just exploring different possibilities. What would you like to know about this life?`
    ];

    return scripts[Math.floor(Math.random() * scripts.length)];
  }
}