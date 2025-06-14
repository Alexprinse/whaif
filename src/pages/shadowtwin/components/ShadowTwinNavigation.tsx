import React, { useState, useEffect } from 'react';
import { Home, Mic, Video, Clock, User, LogOut, ChevronLeft, Sparkles, Zap } from 'lucide-react';

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
  onNavCollapse?: (collapsed: boolean) => void;
}

const ShadowTwinNavigation: React.FC<ShadowTwinNavigationProps> = ({
  activeSection,
  onSectionChange,
  user,
  onLogout,
  isMobileMenuOpen,
  onMobileMenuClose,
  onNavigateToMain,
  onNavCollapse
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Home size={24} /> },
    { id: 'voice', label: 'Voice', icon: <Mic size={24} /> },
    { id: 'video', label: 'Video', icon: <Video size={24} /> },
    { id: 'activities', label: 'Past Activities', icon: <Clock size={24} /> }
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

  const handleCollapseToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onNavCollapse) {
      onNavCollapse(newCollapsed);
    }
  };

  // Close user dropdown when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setShowUserDropdown(false);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && 
          !target.closest('.mobile-nav-panel') && 
          !target.closest('.mobile-menu-button')) {
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
        fixed left-0 top-0 h-screen lg:h-full bg-black/95 lg:bg-black/90 backdrop-blur-xl border-r border-white/10 z-40 lg:z-50
        transition-all duration-300 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64 overflow-hidden
      `}>
        {/* Header with ShadowTwin Logo */}
        <div className="p-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                onClick={isCollapsed ? handleCollapseToggle : undefined}
                className={`w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0 ${
                  isCollapsed ? 'cursor-pointer hover:scale-105 transition-transform' : ''
                }`}
              >
                <Sparkles className="text-white" size={20} />
              </div>
              {(!isCollapsed || isMobileMenuOpen) && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-lg truncate">ShadowTwin</h2>
                  <p className="text-gray-400 text-xs truncate">Explore alternate realities</p>
                </div>
              )}
            </div>
            
            {/* Desktop Collapse Button - Only show when not collapsed */}
            {!isCollapsed && (
              <button
                onClick={handleCollapseToggle}
                className="hidden lg:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 hover:scrollbar-thumb-gray-700">
          <nav className="space-y-2">
            {/* What If Button */}
            <button
              onClick={handleWhatIfClick}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-violet-500/20 hover:border hover:border-blue-400/30 ${
                isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''
              }`}
              title={isCollapsed && !isMobileMenuOpen ? 'What If' : undefined}
            >
              <div className="flex-shrink-0 text-blue-400 flex items-center justify-center w-8 h-8">
                <Zap size={22} />
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
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''}`}
                title={isCollapsed && !isMobileMenuOpen ? item.label : undefined}
              >
                <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 ${
                  activeSection === item.id ? 'text-violet-400' : ''
                }`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 22 })}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Section at Bottom */}
        <div className="p-4 border-t border-white/10 flex-shrink-0 mt-auto">
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
              title={isCollapsed && !isMobileMenuOpen ? user?.name : undefined}
            >
              <div className={`rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0 ${
                isCollapsed ? 'w-8 h-8' : 'w-8 h-8'
              }`}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="text-white" size={isCollapsed ? 18 : 16} />
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