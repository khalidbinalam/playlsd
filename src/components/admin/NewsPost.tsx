
import React from "react";
import { Calendar, Edit, Trash2, Tag } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface NewsPostType {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  published: boolean;
}

interface NewsPostProps {
  post: NewsPostType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
}

const NewsPost: React.FC<NewsPostProps> = ({ 
  post,
  onEdit,
  onDelete,
  onTogglePublish
}) => {
  const { id, title, content, date, author, tags, featured, published } = post;
  
  return (
    <Card className={`glass-morphism ${featured ? 'border-playlsd-purple' : 'border-playlsd-purple/20'}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-lg text-gradient-primary">{title}</CardTitle>
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(date).toLocaleDateString()}
            {featured && (
              <Badge variant="default" className="ml-2 bg-playlsd-purple text-white">Featured</Badge>
            )}
            {!published && (
              <Badge variant="outline" className="ml-2 border-amber-500 text-amber-500">Draft</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-2">{content}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="border-playlsd-purple-light text-playlsd-purple-light">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-400">By {author}</div>
        <div className="flex space-x-2">
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

export default NewsPost;
