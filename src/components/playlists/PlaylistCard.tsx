
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaylistPost } from "@/types/PlaylistPost";
import { Music, Share2, UserCircle, Calendar, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface PlaylistCardProps {
  playlist: PlaylistPost;
  onShare: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onShare }) => {
  const { title, description, embedUrl, embedType, tags, genres, artists, date, slug, featured } = playlist;
  
  // Create embed code based on embedType and embedUrl
  const getEmbedHtml = () => {
    if (embedType === 'spotify') {
      // Convert normal Spotify URLs to embed URLs if needed
      let embedSrc = embedUrl;
      if (embedUrl.includes('spotify.com') && !embedUrl.includes('embed')) {
        embedSrc = embedUrl.replace('spotify.com', 'spotify.com/embed');
      }
      return `<iframe src="${embedSrc}" width="100%" height="152" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    } else if (embedType === 'youtube') {
      // Convert normal YouTube URLs to embed URLs if needed
      let videoId = '';
      if (embedUrl.includes('youtube.com/watch?v=')) {
        videoId = embedUrl.split('v=')[1].split('&')[0];
      } else if (embedUrl.includes('youtu.be/')) {
        videoId = embedUrl.split('youtu.be/')[1];
      } else {
        videoId = embedUrl;
      }
      return `<iframe width="100%" height="225" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (embedType === 'soundcloud') {
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="${embedUrl}"></iframe>`;
    } else {
      return `<div class="p-4 bg-gray-800 rounded text-center">External content: <a href="${embedUrl}" target="_blank" rel="noopener noreferrer" class="text-playlsd-purple underline">Open link</a></div>`;
    }
  };
  
  return (
    <Card className={`glass-morphism border-playlsd-purple/20 card-shine overflow-hidden ${featured ? 'border-playlsd-purple' : ''}`}>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          {featured && (
            <Badge className="bg-playlsd-purple">Featured</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="embed-container" dangerouslySetInnerHTML={{ __html: getEmbedHtml() }} />
        <div className="p-4">
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{description}</p>
          
          {artists.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {artists.map((artist, i) => (
                <Badge key={i} variant="secondary" className="bg-playlsd-purple/20 text-playlsd-purple-light">
                  <Music className="h-3 w-3 mr-1" />
                  {artist}
                </Badge>
              ))}
            </div>
          )}
          
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {genres.map((genre, i) => (
                <Badge key={i} variant="outline" className="border-blue-500 text-blue-400">
                  {genre}
                </Badge>
              ))}
            </div>
          )}
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="border-playlsd-purple-light text-playlsd-purple-light">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t border-playlsd-purple/20">
        <div className="flex items-center text-xs text-gray-400">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onShare} 
            size="sm" 
            variant="ghost" 
            className="hover:bg-playlsd-purple/10"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button 
            asChild
            size="sm" 
            variant="outline" 
            className="border-playlsd-purple text-playlsd-purple hover:bg-playlsd-purple/10"
          >
            <Link to={`/playlist/${slug}`}>
              <ExternalLink className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlaylistCard;
