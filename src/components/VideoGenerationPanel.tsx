import React, { useState, useEffect } from 'react';
import { Video, Upload, Clock, CheckCircle, AlertCircle, Play, Download, Share2, Loader2 } from 'lucide-react';

interface VideoGenerationPanelProps {
  formData: {
    name: string;
    currentBio: string;
    majorDecisions: string;
    dreamsNotPursued: string;
    selfie?: File;
  };
  onVideoGenerated: (videoUrl: string) => void;
  tavusApiKey: string;
}

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
}

const VideoGenerationPanel: React.FC<VideoGenerationPanelProps> = ({ 
  formData, 
  onVideoGenerated, 
  tavusApiKey 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [replicaId, setReplicaId] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  const [steps, setSteps] = useState<GenerationStep[]>([
    {
      id: 'upload',
      title: 'Upload Image',
      description: 'Uploading your photo to create AI replica',
      status: 'pending'
    },
    {
      id: 'replica',
      title: 'Create AI Replica',
      description: 'Training AI model on your appearance',
      status: 'pending'
    },
    {
      id: 'script',
      title: 'Generate Script',
      description: 'Creating personalized ShadowTwin dialogue',
      status: 'pending'
    },
    {
      id: 'video',
      title: 'Generate Video',
      description: 'Rendering your AI ShadowTwin video',
      status: 'pending'
    },
    {
      id: 'complete',
      title: 'Complete',
      description: 'Your ShadowTwin video is ready!',
      status: 'pending'
    }
  ]);

  const updateStepStatus = (stepId: string, status: GenerationStep['status'], progress?: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status, progress }
        : step
    ));
  };

  const uploadImageToTavus = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          // Convert file to base64
          const base64Data = reader.result as string;
          
          // Create a FormData object to simulate a proper file upload
          const formData = new FormData();
          formData.append('file', file);
          
          // In a production environment, you would upload to your backend or cloud storage
          // For now, we'll simulate this with a delay and use a placeholder service
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Use a placeholder image service that accepts the actual image data
          // This is a workaround for development - in production you'd use your own upload endpoint
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            
            // Convert to blob and create object URL
            canvas.toBlob((blob) => {
              if (blob) {
                const objectUrl = URL.createObjectURL(blob);
                resolve(objectUrl);
              } else {
                reject(new Error('Failed to create image blob'));
              }
            }, 'image/jpeg', 0.8);
          };
          
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = base64Data;
          
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const createTavusReplica = async (imageUrl: string): Promise<string> => {
    // For development purposes, we'll simulate the API call since we can't upload to real cloud storage
    // In production, you would use the actual Tavus API with a real uploaded image URL
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Check if we have a valid API key
      if (!tavusApiKey || tavusApiKey.trim() === '') {
        throw new Error('Tavus API key is required');
      }
      
      // For demo purposes, simulate a successful replica creation
      // In production, uncomment and use the actual API call below:
      
      /*
      const response = await fetch('https://tavusapi.com/v2/replicas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': tavusApiKey,
        },
        body: JSON.stringify({
          replica_name: `${formData.name}_shadowtwin_${Date.now()}`,
          video_url: imageUrl, // This needs to be a publicly accessible URL
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to create replica: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.replica_id;
      */
      
      // Simulate successful replica creation for demo
      return `replica_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
    } catch (error) {
      console.error('Replica creation error:', error);
      throw new Error(`Unable to create AI replica. This is a demo limitation - in production, you would need to upload the image to a publicly accessible URL first. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const generateTavusVideo = async (replicaId: string, script: string): Promise<string> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, simulate video generation
      // In production, uncomment and use the actual API call below:
      
      /*
      const response = await fetch('https://tavusapi.com/v2/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': tavusApiKey,
        },
        body: JSON.stringify({
          replica_id: replicaId,
          script: script,
          background: 'modern_office',
          properties: {
            voice_settings: {
              stability: 0.6,
              similarity_boost: 0.8,
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to create video: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.video_id;
      */
      
      // Simulate successful video creation for demo
      return `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
    } catch (error) {
      console.error('Video generation error:', error);
      throw error;
    }
  };

  const pollVideoStatus = async (videoId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Simulate video processing time
      setTimeout(() => {
        // For demo purposes, return a sample video URL
        // In production, this would poll the actual Tavus API
        const demoVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        resolve(demoVideoUrl);
      }, 5000);
      
      /*
      // Production code for polling Tavus API:
      const poll = async () => {
        try {
          const response = await fetch(`https://tavusapi.com/v2/videos/${videoId}`, {
            headers: {
              'x-api-key': tavusApiKey,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to get video status: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.status === 'completed' && data.video_url) {
            resolve(data.video_url);
          } else if (data.status === 'failed') {
            reject(new Error('Video generation failed'));
          } else {
            // Still processing, poll again in 5 seconds
            setTimeout(poll, 5000);
          }
        } catch (error) {
          reject(error);
        }
      };

      poll();
      */
    });
  };

  const generateShadowTwinScript = (formData: any): string => {
    const scripts = [
      `Hey there! It's incredible to see you. I'm ${formData.name}, but the version of you that chose the creative path. ${formData.dreamsNotPursued ? `Remember when you dreamed about ${formData.dreamsNotPursued}? Well, I actually did it.` : ''} Every day here feels like I'm living the life we always imagined.`,
      
      `You know, looking at the choices you made, I can see the wisdom in them. But I want you to know that the path I took - the one where I followed those dreams you set aside - it's been incredible. ${formData.majorDecisions ? `While you chose ${formData.majorDecisions}, I went the other way.` : ''} And honestly? Both paths have their beauty.`,
      
      `The most beautiful thing I've learned is that there's no wrong choice - only different adventures. You built something solid and meaningful. I built something wild and uncertain. We're both versions of the same soul, just exploring different possibilities. What would you like to know about this life?`
    ];

    return scripts[Math.floor(Math.random() * scripts.length)];
  };

  const startVideoGeneration = async () => {
    if (!formData.selfie) {
      setError('Please upload a photo to generate your ShadowTwin video');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCurrentStep(0);

    try {
      // Step 1: Upload image
      updateStepStatus('upload', 'processing');
      setCurrentStep(0);
      const imageUrl = await uploadImageToTavus(formData.selfie);
      updateStepStatus('upload', 'completed');

      // Step 2: Create replica
      updateStepStatus('replica', 'processing');
      setCurrentStep(1);
      const newReplicaId = await createTavusReplica(imageUrl);
      setReplicaId(newReplicaId);
      updateStepStatus('replica', 'completed');

      // Step 3: Generate script
      updateStepStatus('script', 'processing');
      setCurrentStep(2);
      const script = generateShadowTwinScript(formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
      updateStepStatus('script', 'completed');

      // Step 4: Generate video
      updateStepStatus('video', 'processing');
      setCurrentStep(3);
      const newVideoId = await generateTavusVideo(newReplicaId, script);
      setVideoId(newVideoId);

      // Step 5: Poll for completion
      const videoUrl = await pollVideoStatus(newVideoId);
      updateStepStatus('video', 'completed');
      
      // Step 6: Complete
      updateStepStatus('complete', 'completed');
      setCurrentStep(4);
      setGeneratedVideoUrl(videoUrl);
      onVideoGenerated(videoUrl);

    } catch (err) {
      console.error('Video generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate video');
      
      // Mark current step as error
      if (currentStep < steps.length) {
        updateStepStatus(steps[currentStep].id, 'error');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const getStepIcon = (step: GenerationStep, index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className="text-green-400" size={20} />;
    } else if (step.status === 'error') {
      return <AlertCircle className="text-red-400" size={20} />;
    } else if (step.status === 'processing') {
      return <Loader2 className="text-violet-400 animate-spin" size={20} />;
    } else if (index === currentStep && isGenerating) {
      return <Clock className="text-yellow-400" size={20} />;
    } else {
      return <div className="w-5 h-5 rounded-full border-2 border-gray-400" />;
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-16">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Video className="text-violet-400" size={32} />
          Generate Your ShadowTwin Video
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Create a personalized AI video where your ShadowTwin speaks directly to you about the alternate life path.
        </p>
      </div>

      {!generatedVideoUrl && !isGenerating && (
        <div className="text-center mb-8">
          {formData.selfie ? (
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-violet-400/30 mb-4">
                <img 
                  src={URL.createObjectURL(formData.selfie)} 
                  alt="Your photo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-green-400 text-sm">✓ Photo uploaded and ready</p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 flex items-center justify-center border-4 border-gray-600 mb-4">
                <Upload className="text-gray-400" size={32} />
              </div>
              <p className="text-yellow-400 text-sm">⚠ Please upload a photo in the form above</p>
            </div>
          )}

          <button
            onClick={startVideoGeneration}
            disabled={!formData.selfie || !tavusApiKey}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3 mx-auto"
          >
            <Video size={24} />
            Generate AI Video
          </button>

          {!tavusApiKey && (
            <p className="text-red-400 text-sm mt-3">
              Tavus API key required. Click the settings icon to configure.
            </p>
          )}
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg max-w-md mx-auto">
            <p className="text-blue-300 text-xs">
              <strong>Demo Mode:</strong> This is a demonstration version. In production, you would need to set up proper image hosting and use the actual Tavus API endpoints.
            </p>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="mb-8">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg bg-black/20">
                <div className="flex-shrink-0">
                  {getStepIcon(step, index)}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                  {step.status === 'processing' && step.progress && (
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-violet-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {step.status === 'completed' && (
                    <span className="text-green-400 text-sm">✓ Done</span>
                  )}
                  {step.status === 'processing' && (
                    <span className="text-violet-400 text-sm">Processing...</span>
                  )}
                  {step.status === 'error' && (
                    <span className="text-red-400 text-sm">✗ Error</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-300 mb-2">
              Estimated time: 3-5 minutes
            </p>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {generatedVideoUrl && (
        <div className="text-center">
          <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 max-w-2xl mx-auto">
            <video 
              src={generatedVideoUrl} 
              controls 
              className="w-full h-full"
              poster="/api/placeholder/800/450"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Play size={20} />
              Play Video
            </button>
            
            <button className="px-6 py-3 border border-white/20 rounded-full text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
              <Download size={20} />
              Download
            </button>
            
            <button className="px-6 py-3 border border-white/20 rounded-full text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
              <Share2 size={20} />
              Share
            </button>
          </div>

          <div className="mt-6 p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
            <p className="text-green-300 text-sm">
              <strong>✅ Video Generated Successfully!</strong> Your AI ShadowTwin is ready to share their alternate life story.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
          <p className="text-red-300 text-sm">
            <strong>Error:</strong> {error}
          </p>
          <button
            onClick={() => {
              setError(null);
              setIsGenerating(false);
              setSteps(prev => prev.map(step => ({ ...step, status: 'pending' })));
              setCurrentStep(0);
            }}
            className="mt-3 px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300 text-sm hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGenerationPanel;