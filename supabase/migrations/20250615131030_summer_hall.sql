/*
  # Fix user signup by creating automatic profile creation

  1. Database Functions
    - `handle_new_user()` - Function to automatically create a profile when a new user signs up
  
  2. Triggers  
    - `on_auth_user_created` - Trigger that calls handle_new_user() after a new user is inserted into auth.users
  
  3. Changes
    - Ensures every new user automatically gets a corresponding profile entry
    - Extracts full_name from user metadata if provided during signup
    - Fixes the "Database error saving new user" issue
*/

-- Create a function to handle new user inserts
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists (to avoid conflicts)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create a trigger to call the function on new user inserts
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();