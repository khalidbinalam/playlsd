
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, ListMusic } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient-primary font-display">
              Discover The Pulse of Electronic Music
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              PlayLSD Hub is your gateway to the best curated content from the 
              underground electronic music scene. Explore embedded media, submit your tracks, 
              and connect with our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                asChild
                size="lg" 
                className="bg-playlsd-purple hover:bg-playlsd-purple-mid transition-colors"
              >
                <Link to="/submit-song">
                  <Music className="mr-2 h-5 w-5" />
                  Submit Your Song
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-playlsd-purple text-white hover:bg-playlsd-purple/10"
              >
                <Link to="/submit-playlist">
                  <ListMusic className="mr-2 h-5 w-5" />
                  Submit to Playlists
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] animate-float">
            <div className="absolute inset-0 glass-morphism rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-playlsd-purple/30 to-playlsd-blue/20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-mesh-pattern opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl font-bold text-white/10 font-display">PlayLSD</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-playlsd-dark to-transparent"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-playlsd-purple/20 blur-3xl animate-pulse-soft"></div>
            <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-playlsd-blue/20 blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
