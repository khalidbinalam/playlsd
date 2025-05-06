
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
    full_name: string | null;
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

// Define our Supabase RPC functions
export type Functions = {
  check_admin_status: {
    Args: { user_id: string };
    Returns: boolean;
  };
  get_profile: {
    Args: { user_id: string };
    Returns: Tables["profiles"][];
  };
  get_friend_suggestions: {
    Args: { user_id: string };
    Returns: Friend[];
  };
  get_accepted_friends: {
    Args: { user_id: string };
    Returns: Friend[];
  };
  get_pending_requests: {
    Args: { user_id: string };
    Returns: Friend[];
  };
  send_friend_request: {
    Args: { user_id: string; friend_id: string };
    Returns: boolean;
  };
  respond_to_friend_request: {
    Args: { user_id: string; friend_id: string; accept: boolean };
    Returns: boolean;
  };
  update_profile: {
    Args: {
      user_id: string;
      full_name: string;
      bio: string | null;
      avatar_url: string | null;
    };
    Returns: boolean;
  };
  get_chat_messages: {
    Args: Record<string, never>;
    Returns: ChatMessage[];
  };
  send_chat_message: {
    Args: {
      user_id: string;
      content: string;
      spotify_url: string | null;
    };
    Returns: boolean;
  };
};
