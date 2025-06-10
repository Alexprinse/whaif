import React, { useState } from 'react';
import { Upload, Play, Pause, Calendar, Users, Briefcase, Heart, Camera, MessageCircle, Share2, ArrowLeft } from 'lucide-react';

interface LifeEvent {
  id: string;
  date: string;
  type: 'career' | 'relationship' | 'achievement' | 'travel';
  title: string;
  description: string;
  image?: string;
}

interface SocialPost {
  id: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  image?: string;
}

const ShadowTwin: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'generating' | 'viewing'>('upload');
  const [uploadedData, setUploadedData] = useState({
    bio: '',
    decisions: '',
    dreams: ''
  });

  // Mock data for the alternate life simulation
  const alternateTimeline: LifeEvent[] = [
    {
      id: '1',
      date: '2020-03-15',
      type: 'career',
      title: 'Started Art Studio in Paris',
      description: 'Opened "Lumière Creative" - a boutique art studio in Montmartre. First exhibition sold out in 3 days.',
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg'
    },
    {
      id: '2',
      date: '2021-06-22',
      type: 'relationship',
      title: 'Met Life Partner at Gallery Opening',
      description: 'Connected with Alex, a fellow artist, at the Louvre contemporary exhibition. Instant creative chemistry.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'
    },
    {
      id: '3',
      date: '2022-11-08',
      type: 'achievement',
      title: 'Won International Art Prize',
      description: 'Received the Prix de Rome for innovative mixed-media installations. €50,000 grant included.',
      image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg'
    },
    {
      id: '4',
      date: '2023-09-14',
      type: 'travel',
      title: 'Artist Residency in Tokyo',
      description: '6-month residency exploring the intersection of traditional Japanese art and digital media.',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg'
    }
  ];

  const alternateSocialPosts: SocialPost[] = [
    {
      id: '1',
      date: '2024-01-15',
      content: 'Just finished my latest piece - "Digital Sakura". The fusion of traditional ink painting with AR technology feels like magic ✨ #ArtLife #Tokyo',
      likes: 847,
      comments: 23,
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg'
    },
    {
      id: '2',
      date: '2024-01-10',
      content: 'Morning coffee in my studio overlooking the Seine. Some days I can\'t believe this is my life. Grateful for every brushstroke 🎨',
      likes: 1203,
      comments: 45
    },
    {
      id: '3',
      date: '2024-01-05',
      content: 'Alex and I are collaborating on a new installation for the Venice Biennale. Two artists, one vision. Excited to share soon! 🇮🇹',
      likes: 692,
      comments: 18
    }
  ];

  const handleStartSimulation = () => {
    setCurrentStep('generating');
    setIsSimulating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setCurrentStep('viewing');
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setUploadedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'career': return <Briefcase className="text-blue-400\" size={20} />;
      case 'relationship': return <Heart className="text-pink-400" size={20} />;
      case 'achievement': return <Calendar className="text-yellow-400" size={20} />;
      case 'travel': return <Camera className="text-green-400" size={20} />;
      default: return <Calendar className="text-gray-400" size={20} />;
    }
  };

  if (currentStep === 'upload') {
    return (
      <div className="min-h-screen bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                ShadowTwin
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Upload your life story and witness the alternate reality where you made different choices.
            </p>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
              <label className="block text-lg font-semibold text-white mb-4">
                Your Life Story
              </label>
              <textarea
                value={uploadedData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself - your background, personality, values, and current life situation..."
                className="w-full h-32 p-4 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none resize-none"
              />
            </div>

            <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
              <label className="block text-lg font-semibold text-white mb-4">
                Key Life Decisions
              </label>
              <textarea
                value={uploadedData.decisions}
                onChange={(e) => handleInputChange('decisions', e.target.value)}
                placeholder="What were the major crossroads in your life? Career choices, relationships, moves, education..."
                className="w-full h-32 p-4 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none resize-none"
              />
            </div>

            <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
              <label className="block text-lg font-semibold text-white mb-4">
                Dreams You Didn't Pursue
              </label>
              <textarea
                value={uploadedData.dreams}
                onChange={(e) => handleInputChange('dreams', e.target.value)}
                placeholder="What paths did you not take? Dreams you set aside? Alternative careers or lifestyles you considered..."
                className="w-full h-32 p-4 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none resize-none"
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleStartSimulation}
                disabled={!uploadedData.bio || !uploadedData.decisions || !uploadedData.dreams}
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Upload size={20} />
                  Generate My ShadowTwin
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'generating') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 animate-spin">
                  <div className="w-full h-full rounded-full border-4 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Generating Your ShadowTwin...
            </span>
          </h2>
          
          <div className="space-y-2 text-gray-300">
            <p className="animate-pulse">Analyzing your life patterns...</p>
            <p className="animate-pulse animation-delay-200">Creating alternate timeline...</p>
            <p className="animate-pulse animation-delay-400">Generating AI avatar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => setCurrentStep('upload')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Upload
          </button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            Your ShadowTwin Life
          </h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-black/20 border border-white/10 text-gray-300 hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Avatar Video */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-md border border-white/10 mb-8">
              <div className="aspect-video bg-gradient-to-br from-violet-900/20 to-blue-900/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center mb-4">
                    <Users className="text-white" size={32} />
                  </div>
                  <p className="text-gray-300">AI Avatar Video Feed</p>
                  <p className="text-sm text-gray-400 mt-2">Your alternate self living in Paris as an artist</p>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-colors">
                  {isSimulating ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="text-white text-sm bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Live from Paris Studio
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Alternate Life Timeline</h3>
              
              {alternateTimeline.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
                      {getTypeIcon(event.type)}
                    </div>
                    {index < alternateTimeline.length - 1 && (
                      <div className="w-px h-16 bg-gradient-to-b from-violet-400 to-blue-400 mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <div className="p-6 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                        <span className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-300 mb-4">{event.description}</p>
                      {event.image && (
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Feed */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Social Media Feed</h3>
            
            {alternateSocialPosts.map((post) => (
              <div key={post.id} className="p-6 rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                  <div>
                    <p className="font-semibold text-white">Your ShadowTwin</p>
                    <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{post.content}</p>
                
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post content"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                
                <div className="flex items-center gap-6 text-gray-400">
                  <button className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                    <Heart size={16} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <MessageCircle size={16} />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowTwin;