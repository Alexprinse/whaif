import React, { useRef, useEffect } from 'react';
import { Play, Pause, Mic } from 'lucide-react';

interface VoiceMessageProps {
  message: string;
  audioUrl?: string;
  isPlaying: boolean;
  onToggle: () => void;
  isGenerating?: boolean;
}

const VoiceMessage: React.FC<VoiceMessageProps> = ({ 
  message, 
  audioUrl,
  isPlaying, 
  onToggle,
  isGenerating = false
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl && !audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', onToggle);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', onToggle);
      }
    };
  }, [audioUrl, onToggle]);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      onToggle();
    } else {
      // Fallback for demo mode
      onToggle();
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          disabled={isGenerating}
          className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="text-white" size={20} />
          ) : (
            <Play className="text-white ml-1" size={20} />
          )}
        </button>
        <div className="flex-1">
          <p className="text-white font-medium mb-1">Voice Message from ShadowTwin</p>
          <p className="text-gray-300 text-sm">{message}</p>
          {isPlaying && (
            <div className="flex items-center gap-1 mt-2">
              <div className="w-1 h-4 bg-violet-400 rounded animate-pulse" />
              <div className="w-1 h-6 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
              <div className="w-1 h-3 bg-cyan-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-5 bg-violet-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="text-violet-400 text-xs ml-2">Playing...</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Mic size={12} />
            <span>{audioUrl ? 'ElevenLabs' : 'Demo'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessage;