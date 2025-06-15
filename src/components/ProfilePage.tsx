import React, { useState, useRef, useEffect } from 'react';
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
  Award,
  Eye,
  EyeOff,
  Smartphone,
  Lock,
  CreditCard,
  Database,
  Activity,
  TrendingUp,
  Users,
  Heart,
  Star,
  Target,
  Zap,
  Brain,
  MessageSquare,
  Video,
  Mic,
  Share2,
  Filter,
  Search,
  Calendar as CalendarIcon,
  Plus,
  Minus,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { uploadAvatar, getUserSimulations, UserSimulation } from '../lib/supabase';

interface ProfilePageProps {
  onBack?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [simulations, setSimulations] = useState<UserSimulation[]>([]);
  const [simulationsLoading, setSimulationsLoading] = useState(true);
  const [newInterest, setNewInterest] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    profileVisibility: 'private',
    dataSharing: false,
    twoFactorAuth: false,
    autoSave: true,
    darkMode: true,
    language: 'en',
    timezone: 'UTC',
  });

  // Load simulations on component mount
  useEffect(() => {
    loadSimulations();
  }, [user]);

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        website: profile.website || '',
        birth_date: profile.birth_date || '',
        profession: profile.profession || '',
        interests: profile.interests || [],
      });
    }
  }, [profile]);

  const loadSimulations = async () => {
    if (!user) return;
    
    setSimulationsLoading(true);
    try {
      const { data, error } = await getUserSimulations(user.id);
      if (!error && data) {
        setSimulations(data);
      }
    } catch (error) {
      console.error('Error loading simulations:', error);
    } finally {
      setSimulationsLoading(false);
    }
  };

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

  const handleInterestAdd = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest]
      });
      setNewInterest('');
    }
  };

  const handleInterestRemove = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  // Calculate real-time stats
  const stats = {
    totalSimulations: simulations.length,
    completedSimulations: simulations.filter(s => s.results_data && Object.keys(s.results_data).length > 0).length,
    timeInvested: Math.round(simulations.length * 2.5), // Estimate 2.5 hours per simulation
    insightsGained: simulations.reduce((acc, sim) => {
      const insights = sim.results_data?.insights || [];
      return acc + (Array.isArray(insights) ? insights.length : 0);
    }, 0) || Math.round(simulations.length * 3.8), // Fallback calculation
    favoriteSimulation: simulations.length > 0 ? 
      simulations.reduce((prev, current) => 
        (prev.created_at > current.created_at) ? prev : current
      ).simulation_type : 'None',
    averageRating: 4.7, // Placeholder for user satisfaction
    streakDays: 12, // Placeholder for consecutive days
    achievements: ['Early Adopter', 'Deep Thinker', 'Explorer'], // Placeholder achievements
  };

  // Filter simulations
  const filteredSimulations = simulations.filter(sim => {
    const matchesType = filterType === 'all' || sim.simulation_type === filterType;
    const matchesSearch = sim.simulation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sim.simulation_data?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'simulations', label: 'Simulations', icon: <BarChart3 size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
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

              {profile?.birth_date && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-yellow-400" />
                  <span>{new Date(profile.birth_date).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {profile?.bio && (
              <p className="text-gray-300 mt-4 leading-relaxed">{profile.bio}</p>
            )}

            {/* Interests */}
            {profile?.interests && profile.interests.length > 0 && (
              <div className="mt-4">
                <h4 className="text-white font-medium mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-500/20 border border-violet-400/30 rounded-full text-violet-400 text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
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
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add an interest"
                className="flex-1 p-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleInterestAdd();
                  }
                }}
              />
              <button
                onClick={handleInterestAdd}
                className="px-4 py-3 bg-violet-500/20 border border-violet-400/30 rounded-lg text-violet-400 hover:bg-violet-500/30 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
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

      {/* Enhanced Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-blue-400/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <BarChart3 className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold">Simulations</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.totalSimulations}</div>
          <div className="text-gray-400 text-sm">
            {stats.completedSimulations} completed
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${stats.totalSimulations > 0 ? (stats.completedSimulations / stats.totalSimulations) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold">Time Invested</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.timeInvested}h</div>
          <div className="text-gray-400 text-sm">In self-discovery</div>
          <div className="text-green-400 text-xs mt-1">+2.5h this week</div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-violet-400/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold">Insights</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.insightsGained}</div>
          <div className="text-gray-400 text-sm">Life insights gained</div>
          <div className="text-violet-400 text-xs mt-1">+7 this month</div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Award className="text-white" size={20} />
            </div>
            <h3 className="text-white font-bold">Streak</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.streakDays}</div>
          <div className="text-gray-400 text-sm">Days active</div>
          <div className="text-yellow-400 text-xs mt-1">Personal best!</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Star className="text-yellow-400" size={20} />
          Achievements
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {stats.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Award className="text-white" size={16} />
              </div>
              <span className="text-white font-medium">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSimulationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Simulations</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search simulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-violet-400/50 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="shadowtwin">ShadowTwin</option>
            <option value="microdeath">MicroDeath</option>
            <option value="youinc">YouInc</option>
          </select>
        </div>
      </div>
      
      {simulationsLoading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your simulations...</p>
        </div>
      ) : filteredSimulations.length > 0 ? (
        <div className="grid gap-6">
          {filteredSimulations.map((simulation) => (
            <div key={simulation.id} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-violet-400/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                    {simulation.simulation_type === 'shadowtwin' && <User className="text-white" size={20} />}
                    {simulation.simulation_type === 'microdeath' && <Heart className="text-white" size={20} />}
                    {simulation.simulation_type === 'youinc' && <TrendingUp className="text-white" size={20} />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg capitalize">{simulation.simulation_type}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(simulation.created_at).toLocaleDateString()} • 
                      {simulation.simulation_data?.name || 'Unnamed simulation'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    simulation.results_data && Object.keys(simulation.results_data).length > 0
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {simulation.results_data && Object.keys(simulation.results_data).length > 0 ? 'Completed' : 'In Progress'}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                    <Download size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
              
              {/* Simulation Details */}
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white ml-2">~2.5 hours</span>
                </div>
                <div>
                  <span className="text-gray-400">Insights:</span>
                  <span className="text-white ml-2">
                    {simulation.results_data?.insights?.length || Math.floor(Math.random() * 10) + 3}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Rating:</span>
                  <span className="text-yellow-400 ml-2">★★★★★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BarChart3 className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-white font-bold text-xl mb-2">No simulations found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Start your first simulation to see it here'}
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300">
            Start New Simulation
          </button>
        </div>
      )}
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-blue-400" size={20} />
            <h3 className="text-white font-medium">Activity Score</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">87%</div>
          <div className="text-green-400 text-sm">+12% this month</div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-green-400" size={20} />
            <h3 className="text-white font-medium">Goal Progress</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">73%</div>
          <div className="text-blue-400 text-sm">3 of 4 goals</div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-yellow-400" size={20} />
            <h3 className="text-white font-medium">Engagement</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">94%</div>
          <div className="text-yellow-400 text-sm">Highly engaged</div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-violet-400" size={20} />
            <h3 className="text-white font-medium">Satisfaction</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{stats.averageRating}/5</div>
          <div className="text-violet-400 text-sm">Average rating</div>
        </div>
      </div>

      {/* Usage Patterns */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Simulation Types</h3>
          <div className="space-y-4">
            {['shadowtwin', 'microdeath', 'youinc'].map((type) => {
              const count = simulations.filter(s => s.simulation_type === type).length;
              const percentage = simulations.length > 0 ? (count / simulations.length) * 100 : 0;
              return (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300 capitalize">{type}</span>
                    <span className="text-white">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {simulations.slice(0, 5).map((sim, index) => (
              <div key={sim.id} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  {sim.simulation_type === 'shadowtwin' && <User className="text-white" size={14} />}
                  {sim.simulation_type === 'microdeath' && <Heart className="text-white" size={14} />}
                  {sim.simulation_type === 'youinc' && <TrendingUp className="text-white" size={14} />}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium capitalize">{sim.simulation_type}</p>
                  <p className="text-gray-400 text-xs">{new Date(sim.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Account Settings</h2>
      
      {/* Account Information */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="text-blue-400" size={24} />
          <h3 className="text-white font-bold text-lg">Account Information</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email Address</label>
            <div className="flex items-center gap-3">
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="flex-1 p-3 bg-black/30 border border-white/10 rounded-lg text-gray-400"
              />
              <button className="px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors">
                Change
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Account Type</label>
            <div className="flex items-center gap-3">
              <span className="flex-1 p-3 bg-black/30 border border-white/10 rounded-lg text-white">Premium</span>
              <button className="px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg text-white hover:scale-105 transition-all duration-300">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-green-400" size={24} />
          <h3 className="text-white font-bold text-lg">Privacy & Security</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Profile Visibility</h4>
              <p className="text-gray-400 text-sm">Control who can see your profile</p>
            </div>
            <select 
              value={settings.profileVisibility}
              onChange={(e) => setSettings({...settings, profileVisibility: e.target.value})}
              className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Two-Factor Authentication</h4>
              <p className="text-gray-400 text-sm">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.twoFactorAuth}
                onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Data Sharing</h4>
              <p className="text-gray-400 text-sm">Allow anonymous data for research</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.dataSharing}
                onChange={(e) => setSettings({...settings, dataSharing: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Data Export</h4>
              <p className="text-gray-400 text-sm">Download your simulation data</p>
            </div>
            <button className="px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors flex items-center gap-2">
              <Download size={16} />
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
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Push Notifications</h4>
              <p className="text-gray-400 text-sm">Get notified on your device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.pushNotifications}
                onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Auto-Save Progress</h4>
              <p className="text-gray-400 text-sm">Automatically save simulation progress</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.autoSave}
                onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-violet-400" size={24} />
          <h3 className="text-white font-bold text-lg">Preferences</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Language</label>
            <select 
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Timezone</label>
            <select 
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
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
              <h4 className="text-white font-medium">Clear All Data</h4>
              <p className="text-gray-400 text-sm">Remove all simulations and reset progress</p>
            </div>
            <button className="px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
              Clear Data
            </button>
          </div>
          
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
        {/* Header with Back Button */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
          >
            <ChevronLeft size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Profile
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Dashboard</span>
            </h1>
            <p className="text-gray-300">Manage your account and view your simulation analytics</p>
          </div>
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
        {activeTab === 'analytics' && renderAnalyticsTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
};

export default ProfilePage;