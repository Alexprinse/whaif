import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  birth_date?: string;
  profession?: string;
  interests?: string[];
  created_at: string;
  updated_at: string;
}

export interface UserSimulation {
  id: string;
  user_id: string;
  simulation_type: 'shadowtwin' | 'microdeath' | 'youinc';
  simulation_data: Record<string, any>;
  results_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Profile helpers
export const getProfile = async (userId: string): Promise<{ data: Profile | null; error: any }> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};

// Simulation helpers
export const getUserSimulations = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_simulations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const saveSimulation = async (simulation: Omit<UserSimulation, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_simulations')
    .insert(simulation)
    .select()
    .single();
  
  return { data, error };
};

export const updateSimulation = async (simulationId: string, updates: Partial<UserSimulation>) => {
  const { data, error } = await supabase
    .from('user_simulations')
    .update(updates)
    .eq('id', simulationId)
    .select()
    .single();
  
  return { data, error };
};

// Storage helpers for avatar uploads
export const uploadAvatar = async (userId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (error) {
    return { data: null, error };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return { data: { path: filePath, publicUrl }, error: null };
};