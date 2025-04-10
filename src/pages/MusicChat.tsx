import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Music, RefreshCw, X } from 'lucide-react';
import ChatMessage from '@/components/chat/ChatMessage';
import FriendSuggestions from '@/components/chat/FriendSuggestions';
import ProfileSettings from '@/components/chat/ProfileSettings';
import { ChatMessage as ChatMessageType } from '@/integrations/supabase/database.types';

const MusicChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  // Fetch messages
  const fetchMessages = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          id,
          user_id,
          content,
          spotify_url,
          created_at,
          expires_at,
          profiles:user_id(full_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to new messages
  useEffect(() => {
    if (!user) return;
    
    fetchMessages();
    
    const channel = supabase
      .channel('public:chat_messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages'
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Function to extract Spotify URL
  const extractSpotifyUrl = (text: string) => {
    const spotifyRegex = /(https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+)/;
    const match = text.match(spotifyRegex);
    return match ? match[0] : null;
  };

  // Send a message
  const sendMessage = async () => {
    if (!user || !content.trim()) return;
    
    if (content.length > 50) {
      toast({
        title: "Message too long",
        description: "Messages must be 50 words or less",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const spotify_url = extractSpotifyUrl(content);
      
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          content,
          spotify_url
        });
        
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      setContent('');
      fetchMessages();
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardContent className="p-4 h-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Friends</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    {showProfile ? <X size={18} /> : "Profile"}
                  </Button>
                </div>
                
                {showProfile ? (
                  <ProfileSettings onClose={() => setShowProfile(false)} />
                ) : (
                  <FriendSuggestions />
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Chat area */}
          <div className="md:col-span-3">
            <Card className="h-full">
              <CardContent className="p-4 flex flex-col h-[70vh]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Music Chat</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchMessages}
                    disabled={isLoading}
                  >
                    <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                    <span className="ml-2">Refresh</span>
                  </Button>
                </div>
                
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <Music className="h-12 w-12 mb-2" />
                      <p>No messages yet. Be the first to share a song!</p>
                      <p className="text-sm mt-2">Tip: Share Spotify links to show song previews</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessage 
                        key={message.id} 
                        message={message} 
                        currentUser={user} 
                      />
                    ))
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Share a song or message (50 words max)..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="resize-none"
                    maxLength={250}
                  />
                  <Button onClick={sendMessage} disabled={isLoading || !content.trim()}>
                    <Send size={16} />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Messages auto-delete after 10 minutes. Share a Spotify song link to show an embed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MusicChat;
