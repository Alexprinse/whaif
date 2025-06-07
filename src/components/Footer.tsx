import React from 'react';
import { Github, Twitter, Instagram, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Github size={20} />, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="relative py-16 border-t border-white/10">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              WHATIF
            </h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Explore infinite possibilities. Simulate alternate realities. Discover who you could become.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                aria-label={link.label}
                className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 hover:bg-gradient-to-r hover:from-violet-500/20 hover:to-blue-500/20 transition-all duration-300 hover:scale-110"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Custom Domain Placeholder */}
          <div className="mb-8 p-4 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 max-w-md mx-auto">
            <p className="text-sm text-gray-400 mb-2">Ready to launch your own portal?</p>
            <button className="text-teal-400 hover:text-teal-300 transition-colors duration-200 flex items-center gap-2 mx-auto">
              <span>Connect Custom Domain</span>
              <ExternalLink size={16} />
            </button>
          </div>

          {/* Bolt Badge */}
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <span className="text-sm">Powered by</span>
            <span className="text-violet-400 font-semibold">Bolt</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;