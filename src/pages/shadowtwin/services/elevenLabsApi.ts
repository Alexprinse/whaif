// ElevenLabs API Integration for AI Voice Generation
import { FormData } from '../types';

export interface ElevenLabsVoiceRequest {
  text: string;
  voice_id: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  preview_url?: string;
}

export class ElevenLabsService {
  private apiKey: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateSpeech(request: ElevenLabsVoiceRequest): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/text-to-speech/${request.voice_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text: request.text,
          model_id: request.model_id || 'eleven_monolingual_v1',
          voice_settings: request.voice_settings || {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  async getVoices(): Promise<ElevenLabsVoice[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }

  async cloneVoice(name: string, audioFiles: File[]): Promise<{ voice_id: string }> {
    try {
      const formData = new FormData();
      formData.append('name', name);
      
      audioFiles.forEach((file, index) => {
        formData.append('files', file);
      });

      const response = await fetch(`${this.baseUrl}/voices/add`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error cloning voice:', error);
      throw error;
    }
  }

  // Generate contextual messages for ShadowTwin
  generateShadowTwinMessages(formData: FormData): string[] {
    const messages = [
      `Hey ${formData.name}! It's surreal talking to you like this. I'm the version of you that took the leap into ${formData.dreamsNotPursued || 'that creative path'}. Every morning I wake up grateful for the choice to follow our dreams.`,
      
      `You know what's funny? I still think about the path you chose sometimes. The security, the stability - there's real wisdom in that. But I had to know what would happen if I chased those wild dreams we used to have.`,
      
      `The journey hasn't always been easy. There were moments I questioned everything, wondered if I should have chosen your path instead. But then something magical would happen - a breakthrough, a connection, a moment of pure creative flow - and I'd remember why I'm here.`,
      
      `I want you to know that both our choices are valid. You built something solid and meaningful. I built something uncertain but deeply fulfilling. We're both living authentically, just in different ways.`,
      
      `What I've learned is that it's never too late to incorporate elements of this path into your life. You don't have to abandon everything you've built. Maybe there's a way to blend both worlds?`
    ];

    return messages;
  }

  // Get appropriate voice based on user characteristics
  getRecommendedVoice(formData: FormData): string {
    // Default voices for different personas
    const voices = {
      creative: 'EXAVITQu4vr4xnSDxMaL', // Bella - warm, inspiring
      professional: 'ErXwobaYiN019PkySvjV', // Antoni - confident, articulate
      adventurous: 'VR6AewLTigWG4xSOukaG', // Josh - energetic, optimistic
      thoughtful: 'pNInz6obpgDQGcFmaJgB', // Adam - contemplative, wise
    };

    // Simple logic to choose voice based on dreams/decisions
    const dreams = formData.dreamsNotPursued?.toLowerCase() || '';
    const decisions = formData.majorDecisions?.toLowerCase() || '';
    
    if (dreams.includes('art') || dreams.includes('music') || dreams.includes('creative')) {
      return voices.creative;
    } else if (dreams.includes('travel') || dreams.includes('adventure')) {
      return voices.adventurous;
    } else if (decisions.includes('business') || decisions.includes('corporate')) {
      return voices.professional;
    } else {
      return voices.thoughtful;
    }
  }
}