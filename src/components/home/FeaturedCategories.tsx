
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
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gradient-primary mb-2">Explore Categories</h2>
          <p className="text-gray-400 max-w-3xl">
            Dive into our curated content categories for the best electronic music experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/playlists?category=${category.id}`}>
              <Card className={`h-full overflow-hidden glass-morphism border-playlsd-purple/20 hover:border-playlsd-purple/50 transition-all duration-300 ${category.bgClass}`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-playlsd-purple/20 text-playlsd-purple-light">
                      {category.count} playlists
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
