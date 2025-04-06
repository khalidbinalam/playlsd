
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, User } from "lucide-react";

export interface EmbedData {
  id: string;
  type: "instagram" | "twitter" | "youtube" | "spotify" | "soundcloud" | "blog" | "html";
  embedCode: string;
  title: string;
  description?: string;
  adminName: string;
  date: string;
  source: string;
  categories: string[];
}

interface EmbedCardProps {
  embed: EmbedData;
}

const EmbedCard = ({ embed }: EmbedCardProps) => {
  return (
    <Card className="glass-morphism card-shine overflow-hidden border-playlsd-purple/20 hover:border-playlsd-purple/50 transition-all duration-300">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold truncate">{embed.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="embed-container" dangerouslySetInnerHTML={{ __html: embed.embedCode }} />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {embed.categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="bg-playlsd-purple/10 hover:bg-playlsd-purple/20 border-playlsd-purple/30"
            >
              {category}
            </Badge>
          ))}
        </div>
        <Separator className="bg-playlsd-purple/20" />
        <div className="flex flex-wrap justify-between w-full text-xs text-gray-400">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{embed.adminName}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>{formatDistanceToNow(new Date(embed.date), { addSuffix: true })}</span>
          </div>
          <div>
            <span className="opacity-60">Source: {embed.source}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmbedCard;
