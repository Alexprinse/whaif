import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Globe, 
  Calendar, 
  Briefcase, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Upload,
  Settings,
  Shield,
  Bell,
  Trash2,
  Download,
  BarChart3,
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { uploadAvatar } from '../lib/supabase';

const ProfilePage: React.FC = () => {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    birth_date: profile?.birth_date || '',
    profession: profile?.profession || '',
    interests: profile?.interests || [],
  });

  const handleSave = async () => {
    const { error } = await updateProfile(formData);
    if (!error) {
      setIsEditing(false);
      await refreshProfile();
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      website: profile?.website || '',
      birth_date: profile?.birth_date || '',
      profession: profile?.profession || '',
      interests: profile?.interests || [],
    });
    setIsEditing(false);
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      const { data, error } = await uploadAvatar(user.id, file);
      if (error) {
        console.error('Error uploading avatar:', error);
      } else if (data) {
        await updateProfile({ avatar_url: data.publicUrl });
        await refreshProfile();
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInterestAdd = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const handleInterestRemove = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'simulations', label: 'Simulations', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 border border-violet-400/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || 'Profile'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="text-white" size={48} />
              )}
            </div>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 disabled:opacity-50"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Camera className="text-white" size={16} />
              )}
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">
                {profile?.full_name || 'Your Name'}
              </h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Edit3 size={16} />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <span>{user?.email}</span>
              </div>
              
              {profile?.profession && (
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-green-400" />
                  <span>{profile.profession}</span>
                </div>
              )}
              
              {profile?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              
              {profile?.website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-violet-400" />
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300">
                    {profile.website}
                  </a>
                </div>
              )}
            </div>

            {profile?.bio && (
              <p className="text-gray-300 mt-4 leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Profession</label>
              <input
                type="text"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none"
                placeholder="Your profession or job title"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-green-400/50 focus:outline-none"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Birth Date</label>
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white focus:border-yellow-400/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-white font-medium mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="mt-6">
            <label className="block text-white font-medium mb-2">Interests</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-violet-500/20 border border-violet-400/30 rounded-full text-violet-400 text-sm flex items-center gap-2"
                >
                  {interest}
                  <button
                    onClick={() => handleInterestRemove(interest)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add an interest and press Enter"
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleInterestAdd(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <BarChart3 className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold">Simulations</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">12</div>
          <div className="text-gray-400 text-sm">Total completed</div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold">Time Invested</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">24h</div>
          <div className="text-gray-400 text-sm">In self-discovery</div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Award className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold">Insights</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">47</div>
          <div className="text-gray-400 text-sm">Life insights gained</div>
        </div>
      </div>
    </div>
  );

  const renderSimulationsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Your Simulations</h2>
      
      <div className="grid gap-6">
        {/* Placeholder simulation cards */}
        {[
          { type: 'ShadowTwin', date: '2 days ago', status: 'Completed' },
          { type: 'MicroDeath', date: '1 week ago', status: 'Completed' },
          { type: 'YouInc', date: '2 weeks ago', status: 'In Progress' },
        ].map((sim, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">{sim.type}</h3>
                <p className="text-gray-400">{sim.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sim.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {sim.status}
                </span>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Account Settings</h2>
      
      {/* Privacy Settings */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-blue-400" size={24} />
          <h3 className="text-white font-bold text-lg">Privacy & Security</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Profile Visibility</h4>
              <p className="text-gray-400 text-sm">Control who can see your profile</p>
            </div>
            <select className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white">
              <option>Private</option>
              <option>Public</option>
              <option>Friends Only</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Data Export</h4>
              <p className="text-gray-400 text-sm">Download your simulation data</p>
            </div>
            <button className="px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-yellow-400" size={24} />
          <h3 className="text-white font-bold text-lg">Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Email Notifications</h4>
              <p className="text-gray-400 text-sm">Receive updates about your simulations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trash2 className="text-red-400" size={24} />
          <h3 className="text-red-400 font-bold text-lg">Danger Zone</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Delete Account</h4>
              <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Profile
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Dashboard</span>
          </h1>
          <p className="text-gray-300">Manage your account and view your simulation history</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-violet-400 border-violet-400'
                    : 'text-gray-400 border-transparent hover:text-white hover:border-white/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'simulations' && renderSimulationsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
};

export default ProfilePage;