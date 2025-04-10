
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

type MessageProps = {
  message: {
    id: string;
    user_id: string;
    content: string;
    spotify_url: string | null;
    created_at: string;
    expires_at: string;
    profiles: {
      full_name: string;
      avatar_url: string | null;
    };
  };
  currentUser: User | null;
};

const ChatMessage = ({ message, currentUser }: MessageProps) => {
  const isCurrentUser = message.user_id === currentUser?.id;
  const initials = message.profiles.full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
    
  // Calculate time remaining before message expires
  const expiresAt = new Date(message.expires_at);
  const timeLeft = formatDistanceToNow(expiresAt, { addSuffix: true });
  const expiresIn = expiresAt > new Date() ? `Expires ${timeLeft}` : 'Expiring...';

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className="h-10 w-10 mr-2">
          <AvatarImage src={message.profiles.avatar_url || ''} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        
        <Card className={`
          ${isCurrentUser ? 'bg-primary/10 border-primary/20 mr-2' : 'bg-muted ml-2'} 
          w-full
        `}>
          <CardContent className="p-3">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-sm font-semibold">{message.profiles.full_name}</p>
              <span className="text-xs text-muted-foreground">{expiresIn}</span>
            </div>
            
            <p className="mb-2">{message.content}</p>
            
            {message.spotify_url && (
              <iframe
                src={`https://open.spotify.com/embed/track/${message.spotify_url.split('/').pop()}`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="encrypted-media"
                className="rounded-md"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
