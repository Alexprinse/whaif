import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  onNavigate: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (view: string) => {
    if (view === 'shadowtwin') {
      onNavigate('shadowtwin');
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              WHATIF
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 py-2">
                Products
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200/20 dark:border-white/10 rounded-xl shadow-2xl p-4">
                  {productDropdownItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <div className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {item.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
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
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 py-2">
                Resources
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200/20 dark:border-white/10 rounded-xl shadow-2xl p-4">
                  {resourcesDropdownItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <div className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {item.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              Pricing
            </button>
            
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              About
            </button>
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              <Search size={20} />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User account */}
            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
              <User size={20} />
              <span className="text-sm">Sign In</span>
            </button>

            {/* CTA Button */}
            <button 
              onClick={() => handleNavigation('shadowtwin')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10">
            <div className="px-6 py-6 space-y-4">
              {/* Mobile search */}
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-400/50 focus:outline-none"
                />
              </div>

              {/* Mobile navigation links */}
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigation('shadowtwin')}
                  className="block w-full text-left px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  ShadowTwin
                </button>
                <button 
                  onClick={() => handleNavigation('microdeath')}
                  className="block w-full text-left px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  MicroDeath
                </button>
                <button 
                  onClick={() => handleNavigation('youinc')}
                  className="block w-full text-left px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 rounded-lg transition-colors duration-200"
                >
                  YouInc
                </button>
                <button className="block w-full text-left px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 rounded-lg transition-colors duration-200">
                  Resources
                </button>
                <button className="block w-full text-left px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 rounded-lg transition-colors duration-200">
                  Pricing
                </button>
                <button className="block w-full text-left px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/5 rounded-lg transition-colors duration-200">
                  About
                </button>
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200/50 dark:border-white/10">
                <button 
                  onClick={() => handleNavigation('shadowtwin')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;