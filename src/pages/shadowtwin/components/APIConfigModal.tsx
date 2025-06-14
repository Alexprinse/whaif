import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';

interface APIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: { tavusApiKey: string; elevenLabsApiKey: string; geminiApiKey: string }) => void;
}

const APIConfigModal: React.FC<APIConfigModalProps> = ({ isOpen, onClose, onSave }) => {
  const [tavusApiKey, setTavusApiKey] = useState('9acf3d70659349aab5cb638470978303');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('sk_eb8dd9b50e9d3335512544c90ef9beca3921352697964b9d');
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSyA6QBBNKfsbQb2Xq5iQQ57krHfSsxFywxc');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ tavusApiKey, elevenLabsApiKey, geminiApiKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Settings className="text-violet-400" size={24} />
          AI Service Configuration
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-green-400/50 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">For AI content generation and chat</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Tavus API Key
            </label>
            <input
              type="password"
              value={tavusApiKey}
              onChange={(e) => setTavusApiKey(e.target.value)}
              placeholder="Enter your Tavus API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">For AI video generation</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              ElevenLabs API Key
            </label>
            <input
              type="password"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              placeholder="Enter your ElevenLabs API key"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">For AI voice generation</p>
          </div>

          <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4">
            <p className="text-green-300 text-sm">
              <strong>✅ Gemini API Configured:</strong> Your Google Gemini API key is pre-loaded and ready to generate personalized content!
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-transform"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default APIConfigModal;