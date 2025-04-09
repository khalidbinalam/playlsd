
import { useState, useEffect } from 'react';
import { PlaylistPost } from '@/types/PlaylistPost';
import { useToast } from "@/components/ui/use-toast";

export const usePlaylistPosts = () => {
  const [posts, setPosts] = useState<PlaylistPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<PlaylistPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      
      // Get posts from localStorage if exists
      const storedPosts = localStorage.getItem('adminPlaylistPosts');
      
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      }
      
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const savePosts = (updatedPosts: PlaylistPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('adminPlaylistPosts', JSON.stringify(updatedPosts));
  };

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const addPost = (post: Omit<PlaylistPost, 'id' | 'date' | 'author' | 'slug'>) => {
    const slug = createSlug(post.title);
    
    // Check if slug already exists, append number if needed
    let finalSlug = slug;
    let counter = 1;
    while (posts.some(p => p.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
    
    const newPost: PlaylistPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      author: 'Admin', // In a real app, get the current user's name
      slug: finalSlug
    };
    
    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    
    toast({
      title: "Playlist Created",
      description: "Your playlist post has been created successfully.",
    });
    
    return newPost;
  };

  const updatePost = (updatedPost: PlaylistPost) => {
    // If title changed, update slug
    let postToUpdate = { ...updatedPost };
    if (activePost && activePost.title !== updatedPost.title) {
      const newSlug = createSlug(updatedPost.title);
      
      // Check if slug already exists, append number if needed
      let finalSlug = newSlug;
      let counter = 1;
      while (posts.some(p => p.id !== updatedPost.id && p.slug === finalSlug)) {
        finalSlug = `${newSlug}-${counter}`;
        counter++;
      }
      
      postToUpdate.slug = finalSlug;
    }
    
    const updatedPosts = posts.map(post => 
      post.id === postToUpdate.id ? postToUpdate : post
    );
    
    savePosts(updatedPosts);
    
    toast({
      title: "Playlist Updated",
      description: "Your playlist post has been updated successfully.",
    });
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    savePosts(updatedPosts);
    
    toast({
      title: "Playlist Deleted",
      description: "The playlist post has been deleted.",
    });
  };

  const togglePublish = (id: string, published: boolean) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, published } : post
    );
    
    savePosts(updatedPosts);
    
    toast({
      title: published ? "Playlist Published" : "Playlist Unpublished",
      description: published 
        ? "The playlist post is now live." 
        : "The playlist post has been moved to drafts.",
    });
  };

  const toggleFeatured = (id: string, featured: boolean) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, featured } : post
    );
    
    savePosts(updatedPosts);
    
    toast({
      title: featured ? "Playlist Featured" : "Playlist Unfeatured",
      description: featured 
        ? "The playlist post is now featured." 
        : "The playlist post is no longer featured.",
    });
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
    toggleFeatured,
    startEditing,
    cancelEditing,
    startCreating
  };
};
