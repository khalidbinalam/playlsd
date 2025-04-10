
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        // Use the RPC function to get the profile data
        const { data, error } = await supabase.rpc('get_profile', { user_id: userId });
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, isLoading };
}
