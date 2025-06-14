import React from 'react';
import { Instagram, Twitter, Heart } from 'lucide-react';
import { SocialPost } from '../types';

interface SocialFeedProps {
  posts: SocialPost[];
}

const SocialFeed: React.FC<SocialFeedProps> = ({ posts }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Your Shadow
        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"> Social Life</span>
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full ml-3">AI-Generated</span>
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-violet-400/30 transition-all duration-300 group">
            <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
              <div className="text-center text-gray-400">
                {post.platform === 'instagram' ? <Instagram size={48} /> : <Twitter size={48} />}
                <p className="mt-2 text-sm">AI-Generated Content</p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                {post.platform === 'instagram' ? 
                  <Instagram size={16} className="text-pink-400" /> : 
                  <Twitter size={16} className="text-blue-400" />
                }
                <span className="text-gray-400 text-sm">{post.time}</span>
              </div>
              
              <p className="text-white mb-3">{post.caption}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {post.hashtags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-violet-400 text-sm">#{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Heart size={14} />
                <span>{post.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;