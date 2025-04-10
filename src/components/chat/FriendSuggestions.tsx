import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Friend } from '@/integrations/supabase/database.types';

const FriendSuggestions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<Friend[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchSuggestions = async () => {
      try {
        // For now, get a few random profiles as suggestions
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .neq('id', user.id)
          .limit(5);
          
        if (error) {
          console.error('Error fetching suggestions:', error);
          return;
        }
        
        setSuggestions(data || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    const fetchFriends = async () => {
      try {
        // Get accepted friends
        const { data: acceptedFriends, error: friendsError } = await supabase
          .from('friends')
          .select(`
            friend_id,
            profiles:friend_id(id, full_name, avatar_url)
          `)
          .eq('user_id', user.id)
          .eq('status', 'accepted');
          
        if (friendsError) {
          console.error('Error fetching friends:', friendsError);
          return;
        }
        
        // Get pending friend requests
        const { data: pendingFriends, error: pendingError } = await supabase
          .from('friends')
          .select(`
            user_id,
            profiles:user_id(id, full_name, avatar_url)
          `)
          .eq('friend_id', user.id)
          .eq('status', 'pending');
          
        if (pendingError) {
          console.error('Error fetching pending requests:', pendingError);
          return;
        }
        
        setFriends(acceptedFriends?.map(f => f.profiles) || []);
        setPendingRequests(pendingFriends?.map(f => f.profiles) || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSuggestions();
    fetchFriends();
  }, [user]);
  
  const sendFriendRequest = async (friendId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('friends')
        .insert({
          user_id: user.id,
          friend_id: friendId,
          status: 'pending'
        });
        
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Success",
        description: "Friend request sent!"
      });
      
      // Remove from suggestions
      setSuggestions(prev => prev.filter(s => s.id !== friendId));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  const respondToRequest = async (friendId: string, accept: boolean) => {
    if (!user) return;
    
    try {
      if (accept) {
        // Accept the request
        const { error } = await supabase
          .from('friends')
          .update({ status: 'accepted' })
          .eq('user_id', friendId)
          .eq('friend_id', user.id);
          
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        toast({
          title: "Success",
          description: "Friend request accepted!"
        });
      } else {
        // Reject the request
        const { error } = await supabase
          .from('friends')
          .update({ status: 'rejected' })
          .eq('user_id', friendId)
          .eq('friend_id', user.id);
          
        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        toast({
          title: "Success",
          description: "Friend request rejected"
        });
      }
      
      // Remove from pending requests
      setPendingRequests(prev => prev.filter(p => p.id !== friendId));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Pending friend requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2">Friend Requests</h3>
          <div className="space-y-2">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={request.avatar_url || ''} />
                    <AvatarFallback>
                      {request.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{request.full_name}</span>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => respondToRequest(request.id, true)}>
                    <Check size={16} className="text-green-500" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => respondToRequest(request.id, false)}>
                    <X size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Current friends */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Your Friends</h3>
        {friends.length === 0 ? (
          <p className="text-sm text-muted-foreground">No friends yet</p>
        ) : (
          <div className="space-y-2">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={friend.avatar_url || ''} />
                  <AvatarFallback>
                    {friend.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{friend.full_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Friend suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2">Suggested Friends</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={suggestion.avatar_url || ''} />
                    <AvatarFallback>
                      {suggestion.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{suggestion.full_name}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => sendFriendRequest(suggestion.id)}
                >
                  <UserPlus size={14} className="mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendSuggestions;
