
import React, { useState } from "react";
import { Plus, FileText, Edit, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlaylistPosts } from "@/hooks/use-playlist-posts";
import PlaylistPost from "./PlaylistPost";
import PlaylistPostForm from "./PlaylistPostForm";

const PlaylistManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const {
    posts,
    loading,
    isEditing,
    activePost,
    addPost,
    updatePost,
    deletePost,
    togglePublish,
    toggleFeatured,
    startEditing,
    cancelEditing,
    startCreating
  } = usePlaylistPosts();

  const handleSubmit = (data: any) => {
    if (activePost) {
      // Update existing post
      const updatedPost = { ...activePost, ...data };
      updatePost(updatedPost);
    } else {
      // Create new post
      addPost(data);
    }
    cancelEditing();
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         post.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         post.artists.some(artist => artist.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "published" && post.published) ||
                         (filterStatus === "draft" && !post.published) ||
                         (filterStatus === "featured" && post.featured);
    
    return matchesSearch && matchesStatus;
  });
  
  const publishedPosts = filteredPosts.filter(post => post.published);
  const draftPosts = filteredPosts.filter(post => !post.published);

  if (isEditing) {
    return (
      <PlaylistPostForm 
        initialData={activePost || undefined}
        onSubmit={handleSubmit}
        onCancel={cancelEditing}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gradient-primary">Playlist Manager</h2>
        <Button 
          onClick={startCreating}
          className="bg-playlsd-purple hover:bg-playlsd-purple-mid"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Playlist
        </Button>
      </div>

      <div className="glass-morphism rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <Label htmlFor="search" className="sr-only">Search</Label>
            <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search playlists by title, description, tags, genres, or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-playlsd-dark/50 border-playlsd-purple/30"
            />
          </div>
          
          <div>
            <Label htmlFor="status-filter" className="sr-only">Filter by Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="status-filter" className="bg-playlsd-dark/50 border-playlsd-purple/30">
                <div className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Playlists</SelectItem>
                <SelectItem value="published">Published Only</SelectItem>
                <SelectItem value="draft">Drafts Only</SelectItem>
                <SelectItem value="featured">Featured Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading playlists...</p>
        </div>
      ) : (
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="glass-morphism">
            <TabsTrigger value="published">
              Published ({publishedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({draftPosts.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="published" className="mt-6">
            {publishedPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No published playlists found.</p>
                <Button 
                  onClick={startCreating}
                  variant="outline"
                  className="mt-4 border-playlsd-purple hover:bg-playlsd-purple/10"
                >
                  <Music className="mr-2 h-4 w-4" />
                  Create Your First Playlist
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {publishedPosts.map(post => (
                  <PlaylistPost
                    key={post.id}
                    post={post}
                    onEdit={startEditing}
                    onDelete={deletePost}
                    onTogglePublish={togglePublish}
                    onToggleFeatured={toggleFeatured}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-6">
            {draftPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No draft playlists found.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {draftPosts.map(post => (
                  <PlaylistPost
                    key={post.id}
                    post={post}
                    onEdit={startEditing}
                    onDelete={deletePost}
                    onTogglePublish={togglePublish}
                    onToggleFeatured={toggleFeatured}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PlaylistManager;
