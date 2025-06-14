import React, { useState } from 'react';
import { Mic, Play, Pause, Download, Share2, Volume2, Settings } from 'lucide-react';

const ShadowTwinVoice: React.FC = () => {
  const [] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const voiceMessages = [
    {
      id: '1',
      text: "Hey there! It's incredible to see you. I'm living the creative life we always dreamed about.",
      duration: '0:15',
      createdAt: '2 hours ago',
      audioUrl: null
    },
    {
      id: '2',
      text: "Barcelona has been amazing. Every sunrise brings new inspiration for my photography.",
      duration: '0:12',
      createdAt: '1 day ago',
      audioUrl: null
    },
    {
      id: '3',
      text: "I know you sometimes wonder about the path not taken. I'm here to show you it's beautiful too.",
      duration: '0:18',
      createdAt: '3 days ago',
      audioUrl: null
    }
  ];

  const handleGenerateVoice = () => {
    setIsGenerating(true);
    // Simulate voice generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const togglePlayback = (messageId: string) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(messageId);
      // Simulate playback duration
      setTimeout(() => setPlayingAudio(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pt-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Voice
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Messages</span>
          </h1>
          <p className="text-gray-300">Generate and manage AI voice messages from your ShadowTwin</p>
        </div>
        <button className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300">
          <Settings size={24} />
        </button>
      </div>

      {/* Voice Generation Panel */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Mic className="text-blue-400" size={24} />
          Generate New Voice Message
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">Message Text</label>
            <textarea
              placeholder="Enter the text you want your ShadowTwin to say..."
              rows={4}
              className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-3">Voice Style</label>
              <select className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-blue-400/50 focus:outline-none">
                <option value="conversational">Conversational</option>
                <option value="professional">Professional</option>
                <option value="emotional">Emotional</option>
                <option value="excited">Excited</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-3">Voice Speed</label>
              <select className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-blue-400/50 focus:outline-none">
                <option value="normal">Normal</option>
                <option value="slow">Slow</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateVoice}
            disabled={isGenerating}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Voice...
              </>
            ) : (
              <>
                <Volume2 size={24} />
                Generate Voice Message
              </>
            )}
          </button>
        </div>
      </div>

      {/* Voice Messages List */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Your Voice Messages</h2>
        <div className="space-y-4">
          {voiceMessages.map((message) => (
            <div key={message.id} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => togglePlayback(message.id)}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  {playingAudio === message.id ? (
                    <Pause className="text-white" size={20} />
                  ) : (
                    <Play className="text-white ml-1" size={20} />
                  )}
                </button>
                
                <div className="flex-1">
                  <p className="text-white mb-2">{message.text}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Duration: {message.duration}</span>
                    <span>•</span>
                    <span>{message.createdAt}</span>
                  </div>
                  
                  {playingAudio === message.id && (
                    <div className="flex items-center gap-1 mt-3">
                      <div className="w-1 h-4 bg-blue-400 rounded animate-pulse" />
                      <div className="w-1 h-6 bg-cyan-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1 h-3 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 h-5 bg-cyan-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <span className="text-blue-400 text-xs ml-2">Playing...</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-gray-400 hover:text-white">
                    <Download size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-gray-400 hover:text-white">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinVoice;