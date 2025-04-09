
import React from "react";
import { Calendar, Edit, Trash2, Tag, Music, Star, Youtube } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaylistPost as PlaylistPostType } from "@/types/PlaylistPost";

interface PlaylistPostProps {
  post: PlaylistPostType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
}

const PlaylistPost: React.FC<PlaylistPostProps> = ({ 
  post,
  onEdit,
  onDelete,
  onTogglePublish,
  onToggleFeatured
}) => {
  const { id, title, description, tags, genres, artists, date, author, published, featured, embedType } = post;
  
  const getEmbedIcon = () => {
    switch(embedType) {
      case 'spotify':
        return <Music className="h-4 w-4 mr-1 text-green-500" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 mr-1" />;
      default:
        return <Music className="h-4 w-4 mr-1" />;
    }
  };
  
  return (
    <Card className={`glass-morphism ${featured ? 'border-playlsd-purple' : 'border-playlsd-purple/20'}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-lg text-gradient-primary flex items-center">
            {getEmbedIcon()}
            {title}
          </CardTitle>
          <div className="flex flex-wrap items-center text-sm text-gray-400 mt-1 gap-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(date).toLocaleDateString()}
            </div>
            {featured && (
              <Badge variant="default" className="bg-playlsd-purple text-white">Featured</Badge>
            )}
            {!published && (
              <Badge variant="outline" className="border-amber-500 text-amber-500">Draft</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-3">{description}</p>
        
        {artists.length > 0 && (
          <div className="mb-2">
            <p className="text-sm text-gray-400 mb-1">Artists:</p>
            <div className="flex flex-wrap gap-1">
              {artists.map((artist, index) => (
                <Badge key={index} variant="secondary" className="bg-playlsd-purple/20 text-playlsd-purple-light">
                  <Music className="h-3 w-3 mr-1" />
                  {artist}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {genres.length > 0 && (
          <div className="mb-2">
            <p className="text-sm text-gray-400 mb-1">Genres:</p>
            <div className="flex flex-wrap gap-1">
              {genres.map((genre, index) => (
                <Badge key={index} variant="outline" className="border-blue-500 text-blue-400">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {tags.length > 0 && (
          <div>
            <p className="text-sm text-gray-400 mb-1">Tags:</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-playlsd-purple-light text-playlsd-purple-light">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <div className="text-sm text-gray-400">By {author}</div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
            onClick={() => onTogglePublish(id, !published)}
          >
            {published ? "Unpublish" : "Publish"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-amber-500 hover:bg-amber-500/10 text-amber-400"
            onClick={() => onToggleFeatured(id, !featured)}
          >
            <Star className="h-4 w-4 mr-1" />
            {featured ? "Unfeature" : "Feature"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
            onClick={() => onEdit(id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-500 hover:bg-red-500/10 text-red-400"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlaylistPost;
