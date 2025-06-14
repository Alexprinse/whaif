import React, { useState } from 'react';
import { Video, Play, Upload, Download, Share2, Settings, Camera } from 'lucide-react';

const ShadowTwinVideo: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const videos = [
    {
      id: '1',
      title: 'Creative Path Discussion',
      thumbnail: '/api/placeholder/300/200',
      duration: '2:15',
      createdAt: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Life Choices Reflection',
      thumbnail: '/api/placeholder/300/200',
      duration: '1:45',
      createdAt: '1 day ago',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Barcelona Adventures',
      thumbnail: '/api/placeholder/300/200',
      duration: '3:20',
      createdAt: '3 days ago',
      status: 'completed'
    }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleGenerateVideo = () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            AI
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"> Videos</span>
          </h1>
          <p className="text-gray-300">Create AI-generated videos with your ShadowTwin</p>
        </div>
        <button className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300">
          <Settings size={24} />
        </button>
      </div>

      {/* Video Generation Panel */}
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-400/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Video className="text-violet-400" size={24} />
          Generate New Video
        </h2>
        
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-white font-medium mb-3">Upload Your Photo</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="video-image-upload"
              />
              <label
                htmlFor="video-image-upload"
                className="flex flex-col items-center justify-center w-full p-8 bg-black/30 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-violet-400/50 hover:text-violet-400 transition-all duration-300 cursor-pointer group"
              >
                {uploadedImage ? (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-violet-400/30">
                      <img 
                        src={URL.createObjectURL(uploadedImage)} 
                        alt="Uploaded" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-violet-400 font-medium">{uploadedImage.name}</p>
                    <p className="text-gray-500 text-sm mt-1">Click to change photo</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera size={32} className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-medium">Click to upload your photo</p>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Script Input */}
          <div>
            <label className="block text-white font-medium mb-3">Video Script</label>
            <textarea
              placeholder="Enter what you want your ShadowTwin to say in the video..."
              rows={4}
              className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-3">Background</label>
              <select className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-violet-400/50 focus:outline-none">
                <option value="modern_office">Modern Office</option>
                <option value="creative_studio">Creative Studio</option>
                <option value="outdoor_cafe">Outdoor Cafe</option>
                <option value="home_library">Home Library</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-3">Video Quality</label>
              <select className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:border-violet-400/50 focus:outline-none">
                <option value="hd">HD (720p)</option>
                <option value="full_hd">Full HD (1080p)</option>
                <option value="4k">4K (2160p)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateVideo}
            disabled={isGenerating || !uploadedImage}
            className="w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Video size={24} />
                Generate AI Video
              </>
            )}
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Your Videos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-violet-400/30 transition-all duration-300 group">
              <div className="relative aspect-video bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Play className="text-white ml-1" size={24} />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{video.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{video.createdAt}</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                    {video.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex-1 px-3 py-2 bg-violet-500/20 border border-violet-400/30 rounded-lg text-violet-400 hover:bg-violet-500/30 transition-colors duration-200 text-sm font-medium">
                    Watch
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-gray-400 hover:text-white">
                    <Download size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-gray-400 hover:text-white">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinVideo;