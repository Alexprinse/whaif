import React, { useState } from 'react';
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {renderView()}
    </div>
  );
}

export default App;