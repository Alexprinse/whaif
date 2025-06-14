// Google Gemini API Integration for AI Content Generation
export interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
}

export interface TimelineEvent {
  age: number;
  title: string;
  description: string;
  year: string;
}

export interface SocialPost {
  platform: 'instagram' | 'twitter';
  caption: string;
  hashtags: string[];
  likes: number;
  time: string;
}

export interface ComparisonData {
  category: string;
  realYou: string;
  shadowTwin: string;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string, config?: GeminiRequest['generationConfig']): Promise<string> {
    try {
      const request: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
          ...config
        }
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Gemini API error: ${response.status}`;
        
        if (response.status === 404) {
          errorMessage = 'Gemini API not found (404). Please ensure the Generative Language API is enabled in your Google Cloud Project and your API key is valid.';
        } else if (response.status === 403) {
          errorMessage = 'Gemini API access forbidden (403). Please check your API key permissions and billing settings.';
        } else if (response.status === 400) {
          errorMessage = 'Invalid request to Gemini API (400). Please check the request format.';
        }
        
        console.error('Gemini API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        
        throw new Error(errorMessage);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('No content generated');
      }
    } catch (error) {
      console.error('Error generating content with Gemini:', error);
      throw error;
    }
  }

  async generateTimelineEvents(formData: any): Promise<TimelineEvent[]> {
    const currentYear = new Date().getFullYear();
    const currentAge = parseInt(formData.age) || 25; // Default age if not provided
    
    const prompt = `
Based on this person's information:
- Name: ${formData.name}
- Current life: ${formData.currentBio}
- Major decisions made: ${formData.majorDecisions}
- Dreams not pursued: ${formData.dreamsNotPursued}

Create a realistic alternate timeline where they pursued their dreams instead. Generate exactly 4 timeline events in JSON format.

Each event should have:
- age: number (starting from age ${currentAge - 6} to ${currentAge})
- title: string (major milestone)
- description: string (detailed description)
- year: string (calculated year)

Focus on the dreams they mentioned: ${formData.dreamsNotPursued}

Return ONLY a valid JSON array, no other text:
`;

    try {
      const response = await this.generateContent(prompt, { temperature: 0.8 });
      
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const events = JSON.parse(jsonMatch[0]);
        return events.map((event: any) => ({
          age: event.age,
          title: event.title,
          description: event.description,
          year: event.year || (currentYear - (currentAge - event.age)).toString()
        }));
      } else {
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      console.error('Error generating timeline events:', error);
      // Return fallback data
      return this.getFallbackTimelineEvents(formData);
    }
  }

  async generateSocialPosts(formData: any): Promise<SocialPost[]> {
    const prompt = `
Based on this person's alternate life where they pursued their dreams:
- Name: ${formData.name}
- Dreams pursued: ${formData.dreamsNotPursued}
- Current life context: ${formData.currentBio}

Generate 3 social media posts that this alternate version would make. Mix Instagram and Twitter posts.

Each post should have:
- platform: "instagram" or "twitter"
- caption: string (authentic, personal post about their alternate life)
- hashtags: array of relevant hashtags (3-5 each)
- likes: number (realistic engagement)
- time: string (like "2h ago", "1d ago", "3d ago")

Focus on their creative/dream life. Make it feel authentic and personal.

Return ONLY a valid JSON array, no other text:
`;

    try {
      const response = await this.generateContent(prompt, { temperature: 0.9 });
      
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      console.error('Error generating social posts:', error);
      return this.getFallbackSocialPosts(formData);
    }
  }

  async generateComparisonData(formData: any): Promise<ComparisonData[]> {
    const prompt = `
Compare the real person vs their alternate ShadowTwin version:

Real person:
- Current life: ${formData.currentBio}
- Major decisions: ${formData.majorDecisions}

ShadowTwin (alternate version):
- Pursued dreams: ${formData.dreamsNotPursued}

Generate 4 comparison categories in JSON format:
- Career
- Location
- Key Achievements  
- Lifestyle

Each should have:
- category: string
- realYou: string (description of real person's situation)
- shadowTwin: string (description of alternate version's situation)

Make the comparisons realistic and nuanced - both paths should have value.

Return ONLY a valid JSON array, no other text:
`;

    try {
      const response = await this.generateContent(prompt, { temperature: 0.7 });
      
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      console.error('Error generating comparison data:', error);
      return this.getFallbackComparisonData(formData);
    }
  }

  async generateChatResponse(userMessage: string, formData: any, conversationHistory: string[] = []): Promise<string> {
    const context = conversationHistory.slice(-6).join('\n'); // Last 3 exchanges
    
    const prompt = `
You are ${formData.name}'s ShadowTwin - the alternate version who pursued their dreams: ${formData.dreamsNotPursued}

Your background:
- You chose the path they didn't take
- You pursued: ${formData.dreamsNotPursued}
- While they chose: ${formData.majorDecisions}
- Their current life: ${formData.currentBio}

Recent conversation:
${context}

User just said: "${userMessage}"

Respond as their ShadowTwin. Be:
- Warm and understanding
- Reflective about both life paths
- Specific about your alternate experiences
- Encouraging but not preachy
- Authentic and personal

Keep response under 150 words. Speak directly to them as "you":
`;

    try {
      const response = await this.generateContent(prompt, { 
        temperature: 0.8,
        maxOutputTokens: 200 
      });
      
      return response.trim();
    } catch (error) {
      console.error('Error generating chat response:', error);
      return this.getFallbackChatResponse(userMessage, formData);
    }
  }

  // Fallback methods for when API fails
  private getFallbackTimelineEvents(formData: any): TimelineEvent[] {
    const currentYear = new Date().getFullYear();
    const dreams = formData.dreamsNotPursued?.toLowerCase() || 'creative pursuits';
    
    if (dreams.includes('art') || dreams.includes('creative') || dreams.includes('photography')) {
      return [
        {
          age: 22,
          year: (currentYear - 6).toString(),
          title: 'Moved to Barcelona',
          description: 'Left corporate job to pursue photography in Spain'
        },
        {
          age: 24,
          year: (currentYear - 4).toString(),
          title: 'First Gallery Exhibition',
          description: 'Solo photography exhibition featured in local gallery'
        },
        {
          age: 26,
          year: (currentYear - 2).toString(),
          title: 'Travel Documentary Series',
          description: 'Created documentary series about street artists'
        },
        {
          age: 28,
          year: currentYear.toString(),
          title: 'International Recognition',
          description: 'Work featured in major publications'
        }
      ];
    }
    
    return [
      {
        age: 22,
        year: (currentYear - 6).toString(),
        title: 'Pursued Dream Career',
        description: `Started journey in ${dreams}`
      },
      {
        age: 24,
        year: (currentYear - 4).toString(),
        title: 'First Major Success',
        description: 'Achieved first significant milestone'
      },
      {
        age: 26,
        year: (currentYear - 2).toString(),
        title: 'Expanded Horizons',
        description: 'Took on bigger challenges and projects'
      },
      {
        age: 28,
        year: currentYear.toString(),
        title: 'Recognition & Growth',
        description: 'Gained recognition in chosen field'
      }
    ];
  }

  private getFallbackSocialPosts(formData: any): SocialPost[] {
    return [
      {
        platform: 'instagram',
        caption: `Living the dream isn't always easy, but it's always worth it. Every day brings new creative challenges! ✨`,
        hashtags: ['creativity', 'dreams', 'inspiration', 'journey'],
        likes: 2847,
        time: '2h ago'
      },
      {
        platform: 'twitter',
        caption: 'Sometimes I wonder about the path not taken, but then I remember why I chose this adventure.',
        hashtags: ['reflection', 'choices', 'life'],
        likes: 1203,
        time: '1d ago'
      },
      {
        platform: 'instagram',
        caption: 'Coffee, creativity, and endless possibilities. What are you creating today?',
        hashtags: ['creativity', 'inspiration', 'possibilities'],
        likes: 3156,
        time: '3d ago'
      }
    ];
  }

  private getFallbackComparisonData(formData: any): ComparisonData[] {
    return [
      {
        category: 'Career',
        realYou: formData.currentBio || 'Current professional path',
        shadowTwin: `Pursuing ${formData.dreamsNotPursued || 'creative dreams'} professionally`
      },
      {
        category: 'Location',
        realYou: 'Living in familiar surroundings',
        shadowTwin: 'Exploring new places and cultures'
      },
      {
        category: 'Key Achievements',
        realYou: 'Stable career progression and security',
        shadowTwin: 'Creative recognition and artistic fulfillment'
      },
      {
        category: 'Lifestyle',
        realYou: 'Routine-focused, security-oriented',
        shadowTwin: 'Adventure-driven, creatively fulfilled'
      }
    ];
  }

  private getFallbackChatResponse(userMessage: string, formData: any): string {
    const responses = [
      `You know, ${formData.name}, that's such an interesting question. Living this alternate path has taught me so much about following your instincts.`,
      `I think about you often, wondering how different our perspectives are. The path I chose has been wild and uncertain, but deeply fulfilling.`,
      `That reminds me of something I experienced recently. The creative life has its challenges, but the freedom to explore ideas is incredible.`,
      `Both our choices have value, you know. You built something solid while I built something experimental. We're both living authentically.`,
      `Sometimes I miss the security you chose, but then something magical happens in my work and I remember why I'm here.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}