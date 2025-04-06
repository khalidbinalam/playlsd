
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SongSubmissionForm from "@/components/forms/SongSubmissionForm";

const SubmitSong = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gradient-primary mb-4 font-display">Submit Your Song</h1>
            <p className="text-gray-300">
              Share your music with the PlayLSD community and get a chance to be featured
              on our platforms and playlists.
            </p>
          </div>
          
          <SongSubmissionForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default SubmitSong;
