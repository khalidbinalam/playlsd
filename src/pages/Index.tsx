
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import EmbedFeed from "@/components/embeds/EmbedFeed";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
import { usePlaylistPosts } from "@/hooks/use-playlist-posts";
import { EmbedData } from "@/components/embeds/EmbedCard";

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  
  // Get playlists from the usePlaylistPosts hook instead of sampleEmbeds
  const { posts } = usePlaylistPosts();
  
  // Convert playlist posts to the format expected by EmbedFeed
  const playlistEmbeds: EmbedData[] = posts
    .filter(post => post.published) // Only show published playlists
    .map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      // Generate embedCode from embedUrl (for iframe embedding)
      embedCode: post.embedType === 'youtube' 
        ? `<iframe width="100%" height="315" src="${post.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : post.embedType === 'spotify'
        ? `<iframe src="${post.embedUrl}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
        : post.embedType === 'soundcloud'
        ? `<iframe width="100%" height="300" scrolling="no" frameborder="no" src="${post.embedUrl}"></iframe>`
        : `<div class="embed-container">${post.embedUrl}</div>`,
      embedUrl: post.embedUrl,
      // Map the embedType from PlaylistPost to the type in EmbedData
      type: post.embedType as EmbedData['type'],
      categories: [...post.genres, ...post.tags],
      adminName: post.author,
      date: post.date,
      // Add the source property by capitalizing the first letter of embedType
      source: post.embedType.charAt(0).toUpperCase() + post.embedType.slice(1)
    }));
  
  // Filter embeds if category is specified in URL
  const filteredEmbeds = categoryParam
    ? playlistEmbeds.filter((embed) => 
        embed.categories.some((cat) => 
          cat.toLowerCase().replace(/\s+/g, "-") === categoryParam.toLowerCase()
        )
      )
    : playlistEmbeds;
  
  // Determine if we're showing a filtered view
  const isFilteredView = !!categoryParam;
  
  // Get the category name for display
  const getCategoryDisplayName = () => {
    if (!categoryParam) return "";
    
    const categoryFormatted = categoryParam.replace(/-/g, " ");
    return categoryFormatted
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <MainLayout>
      {!isFilteredView && (
        <>
          <Hero />
          <FeaturedCategories />
          <Separator className="my-8 bg-playlsd-purple/20" />
        </>
      )}
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl font-bold text-gradient-primary mb-8 font-display text-center">
          {isFilteredView 
            ? `${getCategoryDisplayName()} Playlists` 
            : "Playlists by PlayLSD"}
        </h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Discover our curated music playlists from YouTube and Spotify. Only verified admins can create and share these playlists.
        </p>
        
        {filteredEmbeds.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-400">
              {isFilteredView 
                ? `No playlists found in the ${getCategoryDisplayName()} category.` 
                : "No playlists have been published yet. Check back soon!"}
            </p>
          </div>
        ) : (
          <EmbedFeed embeds={filteredEmbeds} />
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
