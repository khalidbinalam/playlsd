
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import EmbedFeed from "@/components/embeds/EmbedFeed";
import { sampleEmbeds } from "@/data/sampleEmbeds";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  
  // Filter embeds if category is specified in URL
  const filteredEmbeds = categoryParam
    ? sampleEmbeds.filter((embed) => 
        embed.categories.some((cat) => 
          cat.toLowerCase().replace(/\s+/g, "-") === categoryParam.toLowerCase()
        )
      )
    : sampleEmbeds;
  
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
            ? `${getCategoryDisplayName()} Content` 
            : "Latest Embeds"}
        </h2>
        
        <EmbedFeed embeds={filteredEmbeds} />
      </div>
    </MainLayout>
  );
};

export default Index;
