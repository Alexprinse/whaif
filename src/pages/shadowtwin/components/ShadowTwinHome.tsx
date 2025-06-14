import React from 'react';
import { Sparkles, MessageSquare, Video, Mic, Clock, TrendingUp } from 'lucide-react';

interface ShadowTwinHomeProps {
  onStartJourney: () => void;
  onNavigateToSection: (section: string) => void;
}

const ShadowTwinHome: React.FC<ShadowTwinHomeProps> = ({ onStartJourney, onNavigateToSection }) => {
  const quickActions = [
    {
      title: 'Generate Voice',
      description: 'Create AI voice messages from your ShadowTwin',
      icon: <Mic className="text-blue-400" size={24} />,
      action: () => onNavigateToSection('voice'),
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30'
    },
    {
      title: 'Create Video',
      description: 'Generate AI video messages with your likeness',
      icon: <Video className="text-violet-400" size={24} />,
      action: () => onNavigateToSection('video'),
      color: 'from-violet-500/20 to-purple-500/20 border-violet-400/30'
    },
    {
      title: 'View Activities',
      description: 'See your past ShadowTwin interactions',
      icon: <Clock className="text-green-400" size={24} />,
      action: () => onNavigateToSection('activities'),
      color: 'from-green-500/20 to-emerald-500/20 border-green-400/30'
    }
  ];

  const stats = [
    { label: 'Simulations Created', value: '3', icon: <Sparkles size={16} /> },
    { label: 'Voice Messages', value: '12', icon: <Mic size={16} /> },
    { label: 'Videos Generated', value: '2', icon: <Video size={16} /> },
    { label: 'Chat Messages', value: '47', icon: <MessageSquare size={16} /> }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 border border-violet-400/20 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Your
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> ShadowTwin</span>
        </h1>
        <p className="text-xl text-gray-300 mb-6 max-w-2xl">
          Explore alternate versions of yourself through AI-powered simulations. 
          Create videos, generate voice messages, and chat with your alternate reality.
        </p>
        <button
          onClick={onStartJourney}
          className="px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/25 flex items-center gap-3"
        >
          <Sparkles size={24} />
          Create New ShadowTwin
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-violet-400/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-violet-400">
                {stat.icon}
              </div>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <TrendingUp className="text-violet-400" size={24} />
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-6 bg-gradient-to-br ${action.color} rounded-xl hover:scale-105 transition-all duration-300 text-left group`}
            >
              <div className="mb-4">
                {action.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                {action.title}
              </h3>
              <p className="text-gray-300 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Clock className="text-blue-400" size={24} />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { type: 'voice', title: 'Generated voice message about creative path', time: '2 hours ago' },
            { type: 'chat', title: 'Chatted with ShadowTwin about life choices', time: '1 day ago' },
            { type: 'video', title: 'Created AI video simulation', time: '3 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg hover:border-white/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                {activity.type === 'voice' && <Mic className="text-white" size={16} />}
                {activity.type === 'chat' && <MessageSquare className="text-white" size={16} />}
                {activity.type === 'video' && <Video className="text-white" size={16} />}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.title}</p>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinHome;