
export interface PlaylistPost {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  embedType: 'spotify' | 'youtube' | 'soundcloud' | 'other';
  imageUrl?: string;
  tags: string[];
  genres: string[];
  artists: string[];
  keywords: string[];
  author: string;
  date: string;
  slug: string;
  published: boolean;
  featured: boolean;
}
