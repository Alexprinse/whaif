import React, { useState } from 'react';
import { Home, Mic, Video, Clock, User, Settings, LogOut, ChevronDown } from 'lucide-react';

interface ShadowTwinNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

const ShadowTwinNavigation: React.FC<ShadowTwinNavigationProps> = ({
  activeSection,
  onSectionChange,
  user,
  onLogout
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'voice', label: 'Voice', icon: <Mic size={20} /> },
    { id: 'video', label: 'Video', icon: <Video size={20} /> },
    { id: 'activities', label: 'Past Activities', icon: <Clock size={20} /> }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 z-40">
      {/* Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="text-white" size={20} />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">{user?.name || 'Guest User'}</div>
              <div className="text-gray-400 text-sm">{user?.email || 'guest@example.com'}</div>
            </div>
            <ChevronDown 
              size={16} 
              className={`text-gray-400 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} 
            />
          </button>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
              <div className="p-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 text-gray-300 hover:text-white">
                  <Settings size={16} />
                  Settings
                </button>
                {onLogout && (
                  <button 
                    onClick={onLogout}
                    className="w-full text-left p-3 rounded-lg hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-3 text-red-400 hover:text-red-300"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`${activeSection === item.id ? 'text-violet-400' : ''}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ShadowTwin Branding */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="p-4 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/20 rounded-lg">
          <h3 className="text-white font-bold text-lg mb-1">ShadowTwin</h3>
          <p className="text-gray-400 text-sm">Explore alternate realities</p>
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinNavigation;