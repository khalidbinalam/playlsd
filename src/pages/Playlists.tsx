
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Helmet } from "react-helmet";
import { usePlaylistPosts } from "@/hooks/use-playlist-posts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Search, Filter, Music, ExternalLink, Share2 } from "lucide-react";
import PlaylistCard from "@/components/playlists/PlaylistCard";
import ShareDialog from "@/components/playlists/ShareDialog";

const Playlists = () => {
  const { posts, loading } = usePlaylistPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  
  // Get only published posts
  const publishedPosts = posts.filter(post => post.published);
  
  // Extract all unique genres from posts
  const genres = Array.from(
    new Set(publishedPosts.flatMap(post => post.genres))
  );
  
  // Extract all unique tags from posts
  const tags = Array.from(
    new Set(publishedPosts.flatMap(post => post.tags))
  );
  
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.artists.some(artist => artist.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = selectedGenre === "all" || post.genres.includes(selectedGenre);
    
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesGenre && matchesTag;
  });
  
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);
  
  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/playlist/${slug}`;
    setShareUrl(url);
    setShareDialogOpen(true);
  };
  
  return (
    <MainLayout>
      <Helmet>
        <title>PlayLSD - Music Playlists | Electronic Music, Techno, House</title>
        <meta name="description" content="Discover curated music playlists featuring the best electronic music, techno, house, and more. Stream directly from Spotify and YouTube." />
        <meta name="keywords" content="music playlists, electronic music, techno, house, spotify playlists, youtube music" />
        <meta property="og:title" content="PlayLSD - Music Playlists" />
        <meta property="og:description" content="Discover curated music playlists featuring the best electronic music, techno, house, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">Music Playlists</h1>
          <p className="text-gray-400 max-w-3xl">
            Discover curated playlists featuring the best electronic music, techno, house, and more. 
            Stream directly from Spotify and YouTube.
          </p>
        </div>
        
        <div className="glass-morphism rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search playlists by title, description or artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-playlsd-dark/50 border-playlsd-purple/30"
              />
            </div>
            
            <div>
              <Label htmlFor="genre-filter" className="sr-only">Filter by Genre</Label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger id="genre-filter" className="bg-playlsd-dark/50 border-playlsd-purple/30">
                  <div className="flex items-center">
                    <Music className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by genre" />
                  </div>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tag-filter" className="sr-only">Filter by Tag</Label>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger id="tag-filter" className="bg-playlsd-dark/50 border-playlsd-purple/30">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by tag" />
                  </div>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All Tags</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading playlists...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {featuredPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gradient-primary">Featured Playlists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map(post => (
                    <PlaylistCard key={post.id} playlist={post} onShare={() => handleShare(post.slug)} />
                  ))}
                </div>
              </div>
            )}
            
            {regularPosts.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gradient-primary">All Playlists</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map(post => (
                    <PlaylistCard key={post.id} playlist={post} onShare={() => handleShare(post.slug)} />
                  ))}
                </div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-400">No playlists found matching your filters.</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
      
      <ShareDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        url={shareUrl || ""}
        title="Share This Playlist"
      />
    </MainLayout>
  );
};

export default Playlists;
