
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAdminStatus(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    const checkAdminStatus = async () => {
      try {
        // Use the RPC function to check admin status
        const { data, error } = await supabase.rpc('check_admin_status', { 
          user_id: userId 
        });
          
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(!!data);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [userId]);

  return { isAdmin, isLoading };
}
