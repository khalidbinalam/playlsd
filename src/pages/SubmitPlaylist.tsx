
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PlaylistSubmissionForm from "@/components/forms/PlaylistSubmissionForm";

const SubmitPlaylist = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gradient-primary mb-4 font-display">Submit to PlayLSD Playlists</h1>
            <p className="text-gray-300">
              Want your track to be featured in one of our curated playlists?
              Fill out the form below and our team will review your submission.
            </p>
          </div>
          
          <PlaylistSubmissionForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default SubmitPlaylist;
