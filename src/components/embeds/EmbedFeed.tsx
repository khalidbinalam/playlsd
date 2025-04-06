
import React, { useState } from "react";
import EmbedCard, { EmbedData } from "./EmbedCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

interface EmbedFeedProps {
  embeds: EmbedData[];
}

const EmbedFeed = ({ embeds }: EmbedFeedProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Extract all unique categories from embeds
  const categories = Array.from(
    new Set(embeds.flatMap((embed) => embed.categories))
  );

  // Extract all unique types from embeds
  const types = Array.from(new Set(embeds.map((embed) => embed.type)));

  const filteredEmbeds = embeds.filter((embed) => {
    const matchesSearch = embed.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       embed.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       embed.adminName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || embed.categories.includes(selectedCategory);
    
    const matchesType = selectedType === "all" || embed.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Label htmlFor="search" className="sr-only">Search</Label>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-playlsd-dark/50 border-playlsd-purple/30"
            />
          </div>
          
          <div>
            <Label htmlFor="category-filter" className="sr-only">Filter by Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-filter" className="bg-playlsd-dark/50 border-playlsd-purple/30">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="type-filter" className="sr-only">Filter by Platform</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type-filter" className="bg-playlsd-dark/50 border-playlsd-purple/30">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by platform" />
                </div>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Platforms</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "youtube" ? "YouTube Music" : 
                     type === "spotify" ? "Spotify" : 
                     type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredEmbeds.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-gray-400">No playlists found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmbeds.map((embed) => (
            <EmbedCard key={embed.id} embed={embed} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmbedFeed;
