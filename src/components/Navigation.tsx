import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  onNavigate: (view: string) => void;
  user?: any; // Legacy prop for compatibility
  onAuthClick: (mode: 'signin' | 'signup') => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, onAuthClick, onLogout }) => {
  const { user, profile, signOut } = useAuth();
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
    if (['shadowtwin', 'microdeath', 'youinc', 'profile'].includes(view)) {
      onNavigate(view);
    } else {
      scrollToSection(view);
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleSignOut = async () => {
    try {
      setIsMobileMenuOpen(false); // Close mobile menu first
      await signOut(); // Wait for sign out to complete
      onLogout(); // Then notify parent component
    } catch (error) {
      console.error('Sign out failed:', error);
    }
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
    { name: 'Profile', icon: <UserCircle size={16} />, action: () => handleNavigation('profile') },
    { name: 'Settings', icon: <Settings size={16} />, action: () => {} },
    { name: 'Sign Out', icon: <LogOut size={16} />, action: handleSignOut }
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
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile?.full_name || 'User'} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-sm font-medium">
                        {(profile?.full_name || user.email)?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium">{profile?.full_name || user.email}</span>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={handleBackdropClick}
          />
          
          {/* Right Sidebar */}
          <div 
            className={`mobile-sidebar fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 to-black border-l border-white/10 shadow-2xl z-50 lg:hidden transform transition-all duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Sidebar Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-900 to-gray-900/95 backdrop-blur-sm border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    WHATIF
                  </h2>
                  <p className="text-gray-400 text-sm">Explore alternate realities</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content with Improved Styling */}
            <div className="overflow-y-auto h-[calc(100vh-76px)] px-4 py-6 space-y-6">
              {user ? (
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt={profile?.full_name || 'User'} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-white text-lg font-bold">
                          {(profile?.full_name || user.email)?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{profile?.full_name || user.email}</h3>
                      <p className="text-gray-400 text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  className="p-6 border-b-4 border-white/40"
                  style={{
                    backgroundColor: 'rgb(25, 25, 25)', // Solid dark gray
                    backgroundImage: 'linear-gradient(135deg, rgb(35, 35, 35) 0%, rgb(15, 15, 15) 100%)'
                  }}
                >
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-white font-bold text-lg mb-1">Welcome to WHATIF</h3>
                      <p className="text-white text-sm font-medium">Sign in to explore your alternate realities</p>
                    </div>
                    
                    <button 
                      onClick={() => {
                        onAuthClick('signin');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-4 rounded-xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg border-4 border-white/50 hover:border-white/70"
                      style={{
                        backgroundColor: 'rgb(60, 60, 60)',
                        backgroundImage: 'linear-gradient(135deg, rgb(80, 80, 80) 0%, rgb(40, 40, 40) 100%)'
                      }}
                    >
                      Sign In
                    </button>
                    
                    <button 
                      onClick={() => {
                        onAuthClick('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border-2 border-blue-400/50"
                    >
                      Get Started Free
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Items with Improved Styling */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                    Products
                  </h3>
                  <div className="space-y-1">
                    {productDropdownItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                      >
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-gray-400 text-sm">{item.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {user && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                      Account
                    </h3>
                    <div className="space-y-1">
                      {userDropdownItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                            item.name === 'Sign Out'
                              ? 'text-red-400 hover:bg-red-500/10'
                              : 'text-gray-300 hover:bg-white/5'
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;