import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ShadowTwin from './components/ShadowTwin';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'shadowtwin':
        return <ShadowTwin onBack={() => setCurrentView('home')} />;
      default:
        return (
          <>
            <Navigation onNavigate={setCurrentView} />
            <Hero onNavigate={setCurrentView} />
            <Features onNavigate={setCurrentView} />
            <Testimonials />
            <Footer />
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme-primary text-theme-primary overflow-x-hidden transition-colors duration-300">
        {renderView()}
      </div>
    </ThemeProvider>
  );
}

export default App;