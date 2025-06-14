import React, { useState } from 'react';
import { MessageSquare, Send, Play, Pause } from 'lucide-react';
import { ShadowTwinFormData, ChatMessage } from '../types';

interface ChatInterfaceProps {
  formData: ShadowTwinFormData;
  generateChatResponse: (message: string, formData: ShadowTwinFormData, history: string[]) => Promise<{ text: string; audioUrl?: string }>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ formData, generateChatResponse }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'shadowtwin',
      message: `Hello ${formData.name}! I'm your ShadowTwin - the version of you that chose to pursue ${formData.dreamsNotPursued || 'those dreams you set aside'}. What would you like to know about this alternate life?`,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [generatingVoice, setGeneratingVoice] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    try {
      // Build conversation history
      const history = messages.slice(-6).map(msg => 
        `${msg.sender === 'user' ? 'User' : 'ShadowTwin'}: ${msg.message}`
      );

      // Generate AI response
      const response = await generateChatResponse(currentMessage, formData, history);
      
      const messageId = (Date.now() + 1).toString();
      const shadowResponse: ChatMessage = {
        id: messageId,
        sender: 'shadowtwin',
        message: response.text,
        timestamp: new Date(),
        audioUrl: response.audioUrl
      };

      setMessages(prev => [...prev, shadowResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback response
      const fallbackResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'shadowtwin',
        message: "I'm having trouble connecting right now, but I'd love to continue our conversation. The path I chose has been quite a journey!",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoicePlayback = (messageId: string) => {
    if (playingVoice === messageId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(messageId);
      // Simulate voice playback duration
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <MessageSquare className="text-violet-400" size={24} />
        Chat with Your ShadowTwin
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full">AI-Powered</span>
      </h3>

      <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-violet-500/20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white' 
                : 'bg-black/40 border border-white/10 text-white'
            }`}>
              <p className="text-sm">{message.message}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.sender === 'shadowtwin' && (
                  <button
                    onClick={() => toggleVoicePlayback(message.id)}
                    disabled={generatingVoice === message.id}
                    className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors duration-200 disabled:opacity-50"
                    title="Play voice message"
                  >
                    {generatingVoice === message.id ? (
                      <div className="w-3 h-3 border border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                    ) : playingVoice === message.id ? (
                      <Pause size={12} className="text-violet-400" />
                    ) : (
                      <Play size={12} className="text-gray-400 hover:text-violet-400" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-black/40 border border-white/10 text-white px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="text-gray-400 text-sm ml-2">ShadowTwin is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask your ShadowTwin anything..."
          className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isTyping}
          className="px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;