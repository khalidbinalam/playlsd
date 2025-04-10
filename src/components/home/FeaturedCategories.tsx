import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const categories = [{
  id: "festival-moments",
  name: "Festival Moments",
  description: "Highlights from the best music festivals around the world",
  bgClass: "bg-gradient-to-br from-playlsd-purple/30 to-playlsd-blue/20",
  count: 24
}, {
  id: "vibe-inspo",
  name: "Vibe Inspo",
  description: "Content that sets the mood and inspires your next session",
  bgClass: "bg-gradient-to-br from-playlsd-blue/30 to-playlsd-purple-light/20",
  count: 18
}, {
  id: "releases",
  name: "Releases",
  description: "The latest and greatest tracks from top artists",
  bgClass: "bg-gradient-to-br from-playlsd-purple-mid/30 to-playlsd-purple/20",
  count: 36
}, {
  id: "artist-spotlight",
  name: "Artist Spotlight",
  description: "Deep dives into the artists shaping the scene",
  bgClass: "bg-gradient-to-br from-playlsd-purple-light/30 to-playlsd-blue-light/20",
  count: 12
}];
const FeaturedCategories = () => {
  return <div className="py-12">
      
    </div>;
};
export default FeaturedCategories;