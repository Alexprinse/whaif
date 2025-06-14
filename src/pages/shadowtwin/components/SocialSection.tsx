import React from 'react';
import { MessageSquare, Heart, Share, Image, MapPin, Palette, Music, Star } from 'lucide-react';
import { ShadowTwinFormData } from '../types';

interface SocialSectionProps {
  formData: ShadowTwinFormData;
}

const SocialSection: React.FC<SocialSectionProps> = ({ formData }) => {
  // Generate posts based on user input
  const generatePosts = () => {
    const dreamKeywords = formData.dreamsNotPursued.toLowerCase();
    const isArtistic = dreamKeywords.includes('art') || dreamKeywords.includes('music') || dreamKeywords.includes('create');
    const isEntrepreneur = dreamKeywords.includes('business') || dreamKeywords.includes('startup');
    const isTraveler = dreamKeywords.includes('travel') || dreamKeywords.includes('explore');

    const posts = [
      {
        id: '1',
        content: isArtistic 
          ? "Just finished my latest creative project! The studio feels like home now. It's amazing how following your passion can transform your entire life. 🎨✨" 
          : isEntrepreneur 
          ? "Another successful quarter for our startup! When I took the leap to start my own business, I never imagined we'd come this far. 🚀" 
          : "Living life on my own terms! Sometimes the road less traveled makes all the difference.",
        location: isArtistic ? "Creative Studio" : isEntrepreneur ? "Innovation Hub" : "Downtown",
        timestamp: "2 hours ago",
        likes: 234,
        comments: 42,
        icon: <Palette className="text-white" size={20} />
      },
      {
        id: '2',
        content: `Reflecting on my journey from ${formData.currentBio.split(' ').slice(0, 3).join(' ')}... to where I am now. Sometimes the biggest risks bring the greatest rewards. 🌟`,
        timestamp: "1 day ago",
        likes: 156,
        comments: 28,
        icon: <Star className="text-white" size={20} />
      },
      {
        id: '3',
        content: formData.dreamsNotPursued.split('.')[0] + ". Looking back, taking that leap of faith was the best decision I ever made. ✨",
        location: isArtistic ? "Art Gallery" : isEntrepreneur ? "Tech Hub" : "City Center",
        timestamp: "3 days ago",
        likes: 312,
        comments: 45,
        icon: <Music className="text-white" size={20} />
      }
    ];

    return posts;
  };

  const posts = generatePosts();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300">
          <p className="text-2xl font-bold text-white">1.2K</p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>
        <div className="p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300">
          <p className="text-2xl font-bold text-white">86</p>
          <p className="text-gray-400 text-sm">Posts</p>
        </div>
        <div className="p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300">
          <p className="text-2xl font-bold text-white">15K</p>
          <p className="text-gray-400 text-sm">Likes</p>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              {post.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">ShadowTwin</h4>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{post.timestamp}</span>
                {post.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {post.location}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-gray-200 mb-4 leading-relaxed">{post.content}</p>
          
          <div className="flex items-center gap-6 text-gray-400">
            <button className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <Heart size={18} />
              {post.likes}
            </button>
            <button className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <MessageSquare size={18} />
              {post.comments}
            </button>
            <button className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <Share size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialSection;
