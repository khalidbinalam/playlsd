
import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { usePlaylistPosts } from "@/hooks/use-playlist-posts";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, ArrowLeft, Music, Calendar, User } from "lucide-react";
import ShareDialog from "@/components/playlists/ShareDialog";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";

const PlaylistDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading } = usePlaylistPosts();
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const playlist = useMemo(() => {
    return posts.find(post => post.slug === slug && post.published);
  }, [posts, slug]);
  
  // Create embed code based on embedType and embedUrl
  const getEmbedHtml = () => {
    if (!playlist) return '';
    
    if (playlist.embedType === 'spotify') {
      // Convert normal Spotify URLs to embed URLs if needed
      let embedSrc = playlist.embedUrl;
      if (embedSrc.includes('spotify.com') && !embedSrc.includes('embed')) {
        embedSrc = embedSrc.replace('spotify.com', 'spotify.com/embed');
      }
      return `<iframe src="${embedSrc}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    } else if (playlist.embedType === 'youtube') {
      // Convert normal YouTube URLs to embed URLs if needed
      let videoId = '';
      if (playlist.embedUrl.includes('youtube.com/watch?v=')) {
        videoId = playlist.embedUrl.split('v=')[1].split('&')[0];
      } else if (playlist.embedUrl.includes('youtu.be/')) {
        videoId = playlist.embedUrl.split('youtu.be/')[1];
      } else {
        videoId = playlist.embedUrl;
      }
      return `<iframe width="100%" height="480" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (playlist.embedType === 'soundcloud') {
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="${playlist.embedUrl}"></iframe>`;
    } else {
      return `<div class="p-4 bg-gray-800 rounded text-center">External content: <a href="${playlist.embedUrl}" target="_blank" rel="noopener noreferrer" class="text-playlsd-purple underline">Open link</a></div>`;
    }
  };
  
  const handleShare = () => {
    setShareDialogOpen(true);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading playlist...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!playlist) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto glass-morphism p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-gradient-primary">Playlist Not Found</h1>
            <p className="text-gray-300 mb-6">
              The playlist you're looking for doesn't exist or isn't published yet.
            </p>
            <Button onClick={() => navigate('/playlists')} variant="default">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Playlists
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <Helmet>
        <title>{`${playlist.title} | PlayLSD Music Playlist`}</title>
        <meta name="description" content={playlist.description} />
        <meta name="keywords" content={[...playlist.tags, ...playlist.genres, ...playlist.artists].join(', ')} />
        <meta property="og:title" content={playlist.title} />
        <meta property="og:description" content={playlist.description} />
        <meta property="og:type" content="music.playlist" />
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/playlists')}
            variant="ghost" 
            className="mb-4 hover:bg-playlsd-purple/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Playlists
          </Button>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">{playlist.title}</h1>
              
              <div className="flex items-center text-sm text-gray-400 mb-4 gap-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{playlist.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDistanceToNow(new Date(playlist.date), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleShare} 
              className="bg-playlsd-purple hover:bg-playlsd-purple-mid"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Playlist
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-morphism rounded-lg overflow-hidden mb-6">
              <div className="embed-container w-full" dangerouslySetInnerHTML={{ __html: getEmbedHtml() }} />
            </div>
            
            <div className="glass-morphism rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About This Playlist</h2>
              <p className="text-gray-300 whitespace-pre-line mb-6">{playlist.description}</p>
              
              <Separator className="my-6 bg-playlsd-purple/20" />
              
              {playlist.artists.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Featured Artists</h3>
                  <div className="flex flex-wrap gap-2">
                    {playlist.artists.map((artist, i) => (
                      <Badge key={i} className="bg-playlsd-purple/20 text-playlsd-purple-light py-1.5">
                        <Music className="h-3 w-3 mr-1" />
                        {artist}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="glass-morphism rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {playlist.genres.map((genre, i) => (
                  <Badge key={i} variant="outline" className="border-blue-500 text-blue-400">
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {playlist.tags.map((tag, i) => (
                  <Link to={`/playlists?tag=${tag}`} key={i}>
                    <Badge variant="outline" className="border-playlsd-purple-light text-playlsd-purple-light">
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="glass-morphism rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Related Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {playlist.keywords && playlist.keywords.map((keyword, i) => (
                  <Badge key={i} variant="secondary" className="bg-playlsd-dark text-gray-300">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ShareDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        url={window.location.href}
        title={`Share "${playlist.title}"`}
      />
    </MainLayout>
  );
};

export default PlaylistDetail;
