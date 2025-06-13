import React from 'react';
import { Github, Twitter, Linkedin, Mail, Shield, Award, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Github size={20} />, href: '#', label: 'GitHub' }
  ];

  const footerLinks = {
    product: [
      { name: 'ShadowTwin', href: '#' },
      { name: 'MicroDeath', href: '#' },
      { name: 'YouInc', href: '#' },
      { name: 'API Access', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' }
    ]
  };

  return (
    <footer className="relative py-16 border-t border-gray-200 dark:border-white/10 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-transparent dark:to-slate-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                WHATIF
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                Advanced AI simulation platform helping professionals explore alternate realities 
                and make better life decisions through immersive experiences.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-400/20 rounded-full">
                <Shield size={14} className="text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 text-xs font-medium">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 rounded-full">
                <Award size={14} className="text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">AI Excellence</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="p-3 rounded-lg bg-white/50 dark:bg-black/20 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 hover:bg-gradient-to-r hover:from-blue-100 hover:to-violet-100 dark:hover:from-blue-500/20 dark:hover:to-violet-500/20 transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 via-violet-50 to-cyan-50 dark:from-blue-500/10 dark:via-violet-500/10 dark:to-cyan-500/10 border border-blue-200 dark:border-blue-400/20 rounded-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-gray-900 dark:text-white font-bold text-xl mb-3">Stay Updated</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Get the latest insights on AI simulations and personal development.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/70 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-400/50 focus:outline-none"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg text-white font-medium hover:scale-105 transition-transform duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-300 dark:border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
              <span>© 2024 WHATIF. All rights reserved.</span>
              <div className="flex items-center gap-4">
                {footerLinks.legal.map((link, index) => (
                  <a key={index} href={link.href} className="hover:text-gray-700 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <Globe size={16} />
              <span className="text-sm">Available worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;