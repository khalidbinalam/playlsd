
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
