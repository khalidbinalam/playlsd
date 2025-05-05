
export type Friend = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

export type ChatMessage = {
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

// Add these types to define our Supabase tables
export type Tables = {
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
  };
  friends: {
    id: string;
    user_id: string;
    friend_id: string;
    status: 'pending' | 'accepted' | 'rejected';
    created_at: string;
  };
  chat_messages: {
    id: string;
    user_id: string;
    content: string;
    spotify_url: string | null;
    created_at: string;
    expires_at: string;
  };
};
