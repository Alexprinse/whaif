import React, { useState } from 'react';
import { Home, Mic, Video, Clock, User, LogOut, Settings, Bell, HelpCircle, Shield } from 'lucide-react';

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
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'voice', label: 'Voice', icon: <Mic size={20} /> },
    { id: 'video', label: 'Video', icon: <Video size={20} /> },
    { id: 'activities', label: 'Past Activities', icon: <Clock size={20} /> }
  ];

  const profileMenuItems = [
    { 
      icon: <User size={20} className="text-blue-400" />, 
      label: 'Profile Settings', 
      description: 'Manage your account and preferences',
      action: () => console.log('Profile settings')
    },
    { 
      icon: <Settings size={20} className="text-violet-400" />, 
      label: 'API Configuration', 
      description: 'Configure AI service settings',
      action: () => console.log('API config')
    },
    { 
      icon: <Bell size={20} className="text-green-400" />, 
      label: 'Notifications', 
      description: 'Manage notification preferences',
      action: () => console.log('Notifications')
    },
    { 
      icon: <Shield size={20} className="text-yellow-400" />, 
      label: 'Privacy & Security', 
      description: 'Control your data and security',
      action: () => console.log('Privacy')
    },
    { 
      icon: <HelpCircle size={20} className="text-cyan-400" />, 
      label: 'Help & Support', 
      description: 'Get help and contact support',
      action: () => console.log('Help')
    }
  ];

  return (
    <>
      <div className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-white/10 z-40">
        {/* Profile Section */}
        <div className="p-6 border-b border-white/10">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="text-white" size={24} />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">{user?.name || 'Guest User'}</div>
              <div className="text-gray-400 text-sm">{user?.email || 'guest@example.com'}</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
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

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="text-white" size={32} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user?.name || 'Guest User'}</h2>
                  <p className="text-gray-400">{user?.email || 'guest@example.com'}</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-violet-400">12</div>
                  <div className="text-xs text-gray-400">Sessions</div>
                </div>
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">47</div>
                  <div className="text-xs text-gray-400">Messages</div>
                </div>
                <div className="text-center p-3 bg-black/30 rounded-lg">
                  <div className="text-lg font-bold text-cyan-400">8</div>
                  <div className="text-xs text-gray-400">Videos</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <div className="space-y-2">
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.label}
                      </div>
                      <div className="text-gray-400 text-sm">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors duration-200"
                >
                  Close
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileModal(false);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShadowTwinNavigation;