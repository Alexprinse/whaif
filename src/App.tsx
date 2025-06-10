import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ShadowTwin from './components/ShadowTwin';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shadowtwin'>('home');

  if (currentView === 'shadowtwin') {
    return <ShadowTwin />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation onNavigateToShadowTwin={() => setCurrentView('shadowtwin')} />
      <Hero onEnterSimulation={() => setCurrentView('shadowtwin')} />
      <Features onNavigateToShadowTwin={() => setCurrentView('shadowtwin')} />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;