import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { User } from '../types';

interface NavigationProps {
  onNavigate: (view: string) => void;
  user: User | null;
  onAuthClick: (mode: 'signin' | 'signup') => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, user, onAuthClick, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container') && !target.closest('.mobile-sidebar')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Close sidebar when clicking backdrop
  const handleBackdropClick = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (view: string) => {
    if (['shadowtwin', 'microdeath', 'youinc'].includes(view)) {
      onNavigate(view);
    } else {
      scrollToSection(view);
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const productDropdownItems = [
    { name: 'ShadowTwin', description: 'Explore alternate life paths', action: () => handleNavigation('shadowtwin') },
    { name: 'MicroDeath', description: 'Mortality simulation experience', action: () => handleNavigation('microdeath') },
    { name: 'YouInc', description: 'Life as a business analysis', action: () => handleNavigation('youinc') }
  ];

  const resourcesDropdownItems = [
    { name: 'Documentation', description: 'Complete guides and tutorials', action: () => {} },
    { name: 'API Reference', description: 'Developer resources', action: () => {} },
    { name: 'Help Center', description: 'Support and FAQs', action: () => {} },
    { name: 'Community', description: 'Join our community', action: () => {} }
  ];

  const userDropdownItems = [
    { name: 'Profile', icon: <UserCircle size={16} />, action: () => {} },
    { name: 'Settings', icon: <Settings size={16} />, action: () => {} },
    { name: 'Sign Out', icon: <LogOut size={16} />, action: onLogout }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              WHATIF
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div 
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 py-2">
                Products
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 animate-fadeInDown">
                  {productDropdownItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <div className="text-white font-medium group-hover:text-blue-400 transition-colors duration-200">
                        {item.name}
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative dropdown-container"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 py-2">
                Resources
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 animate-fadeInDown">
                  {resourcesDropdownItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <div className="text-white font-medium group-hover:text-blue-400 transition-colors duration-200">
                        {item.name}
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              Pricing
            </button>
            
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              About
            </button>
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* User account or auth buttons */}
            {user ? (
              <div 
                className="relative dropdown-container"
                onMouseEnter={() => setActiveDropdown('user')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium">{user.name}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'user' && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 animate-fadeInDown">
                    {userDropdownItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-3 text-gray-300 hover:text-white"
                      >
                        {item.icon}
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onAuthClick('signin')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => onAuthClick('signup')}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors duration-200 z-60 relative"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 z-40 lg:hidden"
            onClick={handleBackdropClick}
          />
          
          {/* Right Sidebar - COMPLETELY SOLID */}
          <div className={`mobile-sidebar fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black border-l-2 border-white/30 shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Sidebar Header - SOLID */}
            <div className="flex items-center justify-between p-6 border-b-2 border-white/30 bg-gradient-to-r from-blue-600/30 to-violet-600/30">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  WHATIF
                </h2>
                <p className="text-gray-200 text-sm font-medium">Explore alternate realities</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/20 text-gray-200 hover:text-white transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Auth Section for Non-logged Users - SOLID */}
            {!user && (
              <div className="p-6 border-b-2 border-white/30 bg-gradient-to-r from-blue-600/20 to-violet-600/20">
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-bold text-lg mb-1">Welcome to WHATIF</h3>
                    <p className="text-gray-200 text-sm">Sign in to explore your alternate realities</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      onAuthClick('signin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-4 bg-white/20 border-2 border-white/40 rounded-xl text-white font-bold hover:bg-white/30 hover:border-white/60 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Sign In
                  </button>
                  
                  <button 
                    onClick={() => {
                      onAuthClick('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            )}

            {/* Scrollable Content - COMPLETELY SOLID */}
            <div className="flex-1 overflow-y-auto bg-black" style={{ height: user ? 'calc(100vh - 140px)' : 'calc(100vh - 280px)' }}>
              {/* User Section */}
              {user && (
                <div className="p-4 border-b-2 border-white/30">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-600/25 to-violet-600/25 rounded-xl border-2 border-blue-400/40">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold truncate">{user.name}</h3>
                      <p className="text-gray-200 text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Sections */}
              <div className="p-4">
                {/* Products Section */}
                <div className="mb-6">
                  <h3 className="text-gray-200 text-xs font-bold uppercase tracking-wider mb-3 px-2">
                    Products
                  </h3>
                  <div className="space-y-2">
                    {productDropdownItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full text-left p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/25 hover:to-violet-600/25 transition-all duration-200 group border-2 border-transparent hover:border-blue-400/40"
                      >
                        <div className="text-white font-bold group-hover:text-blue-300 transition-colors duration-200 mb-1">
                          {item.name}
                        </div>
                        <div className="text-gray-200 text-sm">
                          {item.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other Links */}
                <div className="mb-6">
                  <h3 className="text-gray-200 text-xs font-bold uppercase tracking-wider mb-3 px-2">
                    More
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-4 rounded-xl hover:bg-white/20 transition-all duration-200 text-white font-bold border-2 border-transparent hover:border-white/30">
                      Resources
                    </button>
                    <button className="w-full text-left p-4 rounded-xl hover:bg-white/20 transition-all duration-200 text-white font-bold border-2 border-transparent hover:border-white/30">
                      Pricing
                    </button>
                    <button className="w-full text-left p-4 rounded-xl hover:bg-white/20 transition-all duration-200 text-white font-bold border-2 border-transparent hover:border-white/30">
                      About
                    </button>
                  </div>
                </div>

                {/* User Actions */}
                {user && (
                  <div className="mb-6">
                    <h3 className="text-gray-200 text-xs font-bold uppercase tracking-wider mb-3 px-2">
                      Account
                    </h3>
                    <div className="space-y-2">
                      <button className="w-full text-left p-4 rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center gap-3 text-gray-200 hover:text-white border-2 border-transparent hover:border-white/30">
                        <UserCircle size={18} />
                        <span className="font-bold">Profile</span>
                      </button>
                      <button className="w-full text-left p-4 rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center gap-3 text-gray-200 hover:text-white border-2 border-transparent hover:border-white/30">
                        <Settings size={18} />
                        <span className="font-bold">Settings</span>
                      </button>
                      <button 
                        onClick={onLogout}
                        className="w-full text-left p-4 rounded-xl hover:bg-red-500/25 transition-all duration-200 flex items-center gap-3 text-red-300 hover:text-red-200 border-2 border-transparent hover:border-red-400/40"
                      >
                        <LogOut size={18} />
                        <span className="font-bold">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer - SOLID */}
            <div className="p-4 border-t-2 border-white/30 bg-black">
              <div className="text-xs text-gray-300 text-center font-medium">
                WHATIF v1.0 • Explore Your Alternate Reality
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;