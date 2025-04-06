
import { useState, useEffect } from 'react';
import { NewsPostType } from '@/components/admin/NewsPost';

// Sample news posts data
const sampleNewsPosts: NewsPostType[] = [
  {
    id: '1',
    title: 'New Deep House Collection',
    content: 'We\'ve just released a new curated playlist featuring the best deep house tracks of the month. Check it out for the perfect atmospheric vibes.',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    author: 'DJ Cosmic',
    tags: ['deep house', 'electronic', 'new release'],
    featured: true,
    published: true
  },
  {
    id: '2',
    title: 'Artist Spotlight: Ambient Dreams',
    content: 'This week\'s spotlight features ambient music that\'s perfect for focus and relaxation. Discover new artists pushing the boundaries of sonic landscapes.',
    date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    author: 'Luna Wave',
    tags: ['ambient', 'focus', 'artist spotlight'],
    featured: false,
    published: true
  },
  {
    id: '3',
    title: 'Upcoming: Summer Beats Collection',
    content: 'We\'re working on a special summer collection featuring upbeat tracks perfect for your seasonal parties. Stay tuned for the release next week!',
    date: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    author: 'Beat Master',
    tags: ['summer', 'upcoming', 'party'],
    featured: false,
    published: false
  }
];

export const useNewsPosts = () => {
  const [posts, setPosts] = useState<NewsPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<NewsPostType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPosts = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Get posts from localStorage or use sample data
        const storedPosts = localStorage.getItem('adminNewsPosts');
        
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        } else {
          setPosts(sampleNewsPosts);
          localStorage.setItem('adminNewsPosts', JSON.stringify(sampleNewsPosts));
        }
        
        setLoading(false);
      }, 600);
    };

    fetchPosts();
  }, []);

  const savePosts = (updatedPosts: NewsPostType[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('adminNewsPosts', JSON.stringify(updatedPosts));
  };

  const addPost = (post: Omit<NewsPostType, 'id' | 'date' | 'author'>) => {
    const newPost: NewsPostType = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      author: 'Admin', // In a real app, get the current user's name
    };
    
    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    return newPost;
  };

  const updatePost = (updatedPost: NewsPostType) => {
    const updatedPosts = posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    );
    
    savePosts(updatedPosts);
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    savePosts(updatedPosts);
  };

  const togglePublish = (id: string, published: boolean) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, published } : post
    );
    
    savePosts(updatedPosts);
  };

  const startEditing = (id: string) => {
    const post = posts.find(p => p.id === id) || null;
    setActivePost(post);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setActivePost(null);
    setIsEditing(false);
  };

  const startCreating = () => {
    setActivePost(null);
    setIsEditing(true);
  };

  return { 
    posts, 
    loading, 
    activePost,
    isEditing,
    addPost, 
    updatePost, 
    deletePost,
    togglePublish,
    startEditing,
    cancelEditing,
    startCreating
  };
};
