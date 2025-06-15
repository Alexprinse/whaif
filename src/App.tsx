import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ShadowTwinPage from './pages/shadowtwin/ShadowTwinPage';
import MicroDeath from './pages/MicroDeath';
import YouInc from './pages/YouInc';
import ProfilePage from './components/ProfilePage';
import AuthModal from './components/AuthModal';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'shadowtwin':
        return <ShadowTwinPage onBack={() => setCurrentView('home')} />;
      case 'microdeath':
        return <MicroDeath onBack={() => setCurrentView('home')} user={user} />;
      case 'youinc':
        return <YouInc onBack={() => setCurrentView('home')} user={user} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <>
            <Navigation 
              onNavigate={setCurrentView} 
              user={user}
              onAuthClick={handleAuthClick}
              onLogout={handleLogout}
            />
            <Hero onNavigate={setCurrentView} />
            <Features onNavigate={setCurrentView} />
            <Testimonials />
            <Footer />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {renderView()}
        
        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onLogin={handleLogin}
          onSwitchMode={setAuthMode}
        />
      </div>
    </AuthProvider>
  );
}

export default App;