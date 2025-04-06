
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: "festival-moments",
    name: "Festival Moments",
    description: "Highlights from the best music festivals around the world",
    bgClass: "bg-gradient-to-br from-playlsd-purple/30 to-playlsd-blue/20",
    count: 24,
  },
  {
    id: "vibe-inspo",
    name: "Vibe Inspo",
    description: "Content that sets the mood and inspires your next session",
    bgClass: "bg-gradient-to-br from-playlsd-blue/30 to-playlsd-purple-light/20",
    count: 18,
  },
  {
    id: "releases",
    name: "Releases",
    description: "The latest and greatest tracks from top artists",
    bgClass: "bg-gradient-to-br from-playlsd-purple-mid/30 to-playlsd-purple/20",
    count: 36,
  },
  {
    id: "artist-spotlight",
    name: "Artist Spotlight",
    description: "Deep dives into the artists shaping the scene",
    bgClass: "bg-gradient-to-br from-playlsd-purple-light/30 to-playlsd-blue-light/20",
    count: 12,
  },
];

const FeaturedCategories = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gradient-primary mb-4 font-display">Explore Categories</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Dive into our curated collections of content organized by theme and vibe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/?category=${category.id}`} key={category.id}>
              <Card className={`h-full glass-morphism hover:scale-105 transition-all duration-300 card-shine overflow-hidden group ${category.bgClass}`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-playlsd-purple transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 mb-4 flex-grow">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-playlsd-purple/10 border-playlsd-purple/30">
                      {category.count} posts
                    </Badge>
                    <span className="text-xs text-gray-400 font-semibold">View All</span>
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
