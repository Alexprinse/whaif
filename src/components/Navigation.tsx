import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigateToShadowTwin: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigateToShadowTwin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'shadowtwin') {
      onNavigateToShadowTwin();
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/20 backdrop-blur-md border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
            WHATIF
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('shadowtwin')}
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:glow"
            >
              ShadowTwin
            </button>
            <button 
              onClick={() => scrollToSection('microdeath')}
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:glow"
            >
              MicroDeath
            </button>
            <button 
              onClick={() => scrollToSection('youinc')}
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:glow"
            >
              YouInc
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
            <button 
              onClick={() => scrollToSection('shadowtwin')}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              ShadowTwin
            </button>
            <button 
              onClick={() => scrollToSection('microdeath')}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              MicroDeath
            </button>
            <button 
              onClick={() => scrollToSection('youinc')}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              YouInc
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;