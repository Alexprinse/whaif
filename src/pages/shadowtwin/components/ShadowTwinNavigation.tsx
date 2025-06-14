import React, { useState, useEffect } from 'react';
import { Home, Mic, Video, Clock, User, LogOut, ChevronLeft, ChevronRight, Sparkles, X, Zap } from 'lucide-react';

interface ShadowTwinNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
  onNavigateToMain?: () => void;
}

const ShadowTwinNavigation: React.FC<ShadowTwinNavigationProps> = ({
  activeSection,
  onSectionChange,
  user,
  onLogout,
  isMobileMenuOpen,
  onMobileMenuClose,
  onNavigateToMain
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'voice', label: 'Voice', icon: <Mic size={20} /> },
    { id: 'video', label: 'Video', icon: <Video size={20} /> },
    { id: 'activities', label: 'Past Activities', icon: <Clock size={20} /> }
  ];

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    onMobileMenuClose(); // Close mobile menu when navigating
  };

  const handleWhatIfClick = () => {
    if (onNavigateToMain) {
      onNavigateToMain();
    }
    onMobileMenuClose();
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-nav-panel')) {
        onMobileMenuClose();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, onMobileMenuClose]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Navigation Panel */}
      <div className={`
        mobile-nav-panel
        fixed left-0 top-0 h-full bg-black/90 backdrop-blur-xl border-r border-white/10 z-40 
        transition-all duration-300 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64
      `}>
        {/* Header with ShadowTwin Logo */}
        <div className="p-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-white" size={20} />
            </div>
            {(!isCollapsed || isMobileMenuOpen) && (
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-lg truncate">ShadowTwin</h2>
                <p className="text-gray-400 text-xs truncate">Explore alternate realities</p>
              </div>
            )}
            {/* Mobile Close Button */}
            <button
              onClick={onMobileMenuClose}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Desktop Collapse/Expand Button */}
        <div className="absolute -right-4 top-20 z-50 hidden lg:block">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 bg-black/90 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 shadow-lg"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 flex-1 overflow-y-auto">
          <nav className="space-y-2">
            {/* What If Button */}
            <button
              onClick={handleWhatIfClick}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-violet-500/20 hover:border hover:border-blue-400/30"
              title={isCollapsed && !isMobileMenuOpen ? 'What If' : undefined}
            >
              <div className="flex-shrink-0 text-blue-400">
                <Zap size={20} />
              </div>
              {(!isCollapsed || isMobileMenuOpen) && (
                <span className="font-medium truncate">What If</span>
              )}
            </button>

            {/* Divider */}
            <div className="my-4 border-t border-white/10" />

            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={isCollapsed && !isMobileMenuOpen ? item.label : undefined}
              >
                <div className={`flex-shrink-0 ${activeSection === item.id ? 'text-violet-400' : ''}`}>
                  {item.icon}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Section at Bottom */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
              title={isCollapsed && !isMobileMenuOpen ? user?.name : undefined}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="text-white" size={16} />
                )}
              </div>
              {(!isCollapsed || isMobileMenuOpen) && (
                <div className="flex-1 text-left min-w-0">
                  <div className="text-white font-medium text-sm truncate">{user?.name || 'Guest User'}</div>
                  <div className="text-gray-400 text-xs truncate">{user?.email || 'guest@example.com'}</div>
                </div>
              )}
            </button>

            {/* User Dropdown */}
            {showUserDropdown && (!isCollapsed || isMobileMenuOpen) && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
                <div className="p-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 text-gray-300 hover:text-white">
                    <User size={16} />
                    Profile
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

            {/* Collapsed User Dropdown */}
            {showUserDropdown && isCollapsed && !isMobileMenuOpen && (
              <div className="absolute bottom-0 left-full ml-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl">
                <div className="p-3 border-b border-white/10">
                  <div className="text-white font-medium text-sm">{user?.name || 'Guest User'}</div>
                  <div className="text-gray-400 text-xs">{user?.email || 'guest@example.com'}</div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 text-gray-300 hover:text-white">
                    <User size={16} />
                    Profile
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
      </div>
    </>
  );
};

export default ShadowTwinNavigation;