
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/database.types';

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Tables['profiles'] | null>(null);
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
        const { data, error } = await supabase.rpc('get_profile', { 
          user_id: userId 
        });
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        // The RPC function returns an array, but we only need the first item
        if (Array.isArray(data) && data.length > 0) {
          setProfile(data[0] as Tables['profiles']);
        } else {
          setProfile(null);
        }
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
