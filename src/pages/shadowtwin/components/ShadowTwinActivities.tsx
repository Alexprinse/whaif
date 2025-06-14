import React, { useState } from 'react';
import { Clock, MessageSquare, Video, Mic, Filter, Search } from 'lucide-react';

const ShadowTwinActivities: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activities = [
    {
      id: '1',
      type: 'chat',
      title: 'Conversation about creative career',
      description: 'Discussed the photography path and life in Barcelona',
      timestamp: '2 hours ago',
      duration: '15 minutes',
      icon: <MessageSquare className="text-blue-400" size={20} />
    },
    {
      id: '2',
      type: 'voice',
      title: 'Generated voice message',
      description: 'Created AI voice about morning inspiration routine',
      timestamp: '5 hours ago',
      duration: '0:45',
      icon: <Mic className="text-green-400" size={20} />
    },
    {
      id: '3',
      type: 'video',
      title: 'AI video generation',
      description: 'Created video message about alternate life choices',
      timestamp: '1 day ago',
      duration: '2:15',
      icon: <Video className="text-violet-400" size={20} />
    },
    {
      id: '4',
      type: 'chat',
      title: 'Life comparison discussion',
      description: 'Explored differences between real and shadow life',
      timestamp: '2 days ago',
      duration: '22 minutes',
      icon: <MessageSquare className="text-blue-400" size={20} />
    },
    {
      id: '5',
      type: 'voice',
      title: 'Emotional reflection',
      description: 'Voice message about following dreams vs security',
      timestamp: '3 days ago',
      duration: '1:20',
      icon: <Mic className="text-green-400" size={20} />
    },
    {
      id: '6',
      type: 'video',
      title: 'Barcelona studio tour',
      description: 'Virtual tour of the creative workspace',
      timestamp: '1 week ago',
      duration: '3:45',
      icon: <Video className="text-violet-400" size={20} />
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'chat': return 'border-blue-400/30 hover:border-blue-400/50';
      case 'voice': return 'border-green-400/30 hover:border-green-400/50';
      case 'video': return 'border-violet-400/30 hover:border-violet-400/50';
      default: return 'border-white/10 hover:border-white/20';
    }
  };

  return (
    <div className="space-y-8 pt-16">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Past
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> Activities</span>
        </h1>
        <p className="text-gray-300">View and manage your ShadowTwin interaction history</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-green-400/50 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Filter className="text-gray-400" size={20} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-green-400/50 focus:outline-none"
          >
            <option value="all">All Activities</option>
            <option value="chat">Conversations</option>
            <option value="voice">Voice Messages</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="text-blue-400" size={16} />
            <span className="text-gray-400 text-sm">Conversations</span>
          </div>
          <div className="text-2xl font-bold text-white">12</div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="text-green-400" size={16} />
            <span className="text-gray-400 text-sm">Voice Messages</span>
          </div>
          <div className="text-2xl font-bold text-white">8</div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Video className="text-violet-400" size={16} />
            <span className="text-gray-400 text-sm">Videos</span>
          </div>
          <div className="text-2xl font-bold text-white">5</div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-yellow-400" size={16} />
            <span className="text-gray-400 text-sm">Total Time</span>
          </div>
          <div className="text-2xl font-bold text-white">4.2h</div>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className={`bg-black/30 backdrop-blur-md border ${getActivityColor(activity.type)} rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                {activity.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-bold text-lg">{activity.title}</h3>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">{activity.timestamp}</div>
                    <div className="text-gray-500 text-xs">{activity.duration}</div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{activity.description}</p>
                
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors duration-200 text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Replay
                  </button>
                  <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <Clock className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-white font-bold text-xl mb-2">No activities found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ShadowTwinActivities;