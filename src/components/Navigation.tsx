import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User as UserIcon, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
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

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 py-2">
                Products
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4">
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
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200 py-2">
                Resources
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4">
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
            {/* Search */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Search size={20} />
            </button>

            {/* User account or auth buttons */}
            {user ? (
              <div 
                className="relative"
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
                  <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2">
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
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed top-20 left-0 right-0 bottom-0 bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-y-auto">
            <div className="px-6 py-6 space-y-4 h-full">
              {/* Mobile search */}
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none"
                />
              </div>

              {/* Mobile navigation links */}
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigation('shadowtwin')}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  ShadowTwin
                </button>
                <button 
                  onClick={() => handleNavigation('microdeath')}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  MicroDeath
                </button>
                <button 
                  onClick={() => handleNavigation('youinc')}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  YouInc
                </button>
                <button className="block w-full text-left px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors duration-200">
                  Resources
                </button>
                <button className="block w-full text-left px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors duration-200">
                  Pricing
                </button>
                <button className="block w-full text-left px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors duration-200">
                  About
                </button>
              </div>

              {/* Mobile auth */}
              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-white font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                    <button 
                      onClick={onLogout}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button 
                      onClick={() => onAuthClick('signin')}
                      className="w-full px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-all duration-300"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => onAuthClick('signup')}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;