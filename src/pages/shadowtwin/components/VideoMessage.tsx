import React, { useState } from 'react';
import { Play, Video, Mic, Pause } from 'lucide-react';
import VoiceMessage from './VoiceMessage';

interface VideoMessageProps {
  videoUrl?: string;
  audioUrls: string[];
  isGenerating: boolean;
}

const VideoMessage: React.FC<VideoMessageProps> = ({ videoUrl, audioUrls, isGenerating }) => {
  const [playingVoice, setPlayingVoice] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const voiceMessages = [
    "Hey there! It's incredible to see you. I'm living the creative life we always dreamed about.",
    "Barcelona has been amazing. Every sunrise brings new inspiration for my photography.",
    "I know you sometimes wonder about the path not taken. I'm here to show you it's beautiful too."
  ];

  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Message from Your
        <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"> ShadowTwin</span>
      </h3>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative aspect-video bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-teal-900/20 rounded-2xl border border-white/10 overflow-hidden group">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-cover"
              poster="/api/placeholder/800/450"
            />
          ) : (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                {isGenerating ? (
                  <>
                    <div className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-6 mx-auto" />
                    <h4 className="text-white font-bold text-xl mb-3">Generating AI Video...</h4>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                      Creating your personalized ShadowTwin video using Tavus AI
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Play className="text-white ml-1" size={32} />
                    </div>
                    <h4 className="text-white font-bold text-xl mb-3">AI-Generated Video Message</h4>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                      Watch yourself in an alternate reality, speaking about the life you could have lived
                    </p>
                  </>
                )}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-violet-400" />
                    <span>Tavus AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic size={16} className="text-blue-400" />
                    <span>ElevenLabs Voice</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Voice Messages */}
        <div className="space-y-4">
          {voiceMessages.map((message, index) => (
            <VoiceMessage
              key={index}
              message={message}
              audioUrl={audioUrls[index]}
              isPlaying={playingVoice && currentAudioIndex === index}
              onToggle={() => {
                setPlayingVoice(!playingVoice);
                setCurrentAudioIndex(index);
              }}
              isGenerating={isGenerating && !audioUrls[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoMessage;