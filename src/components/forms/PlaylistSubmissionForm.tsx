
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSubmissions } from "@/hooks/use-submissions";

const formSchema = z.object({
  artistName: z.string().min(2, {
    message: "Artist name must be at least 2 characters.",
  }),
  trackLink: z.string().url({
    message: "Please enter a valid URL.",
  }),
  genre: z.string({
    required_error: "Please select a genre.",
  }),
  vibe: z.string({
    required_error: "Please select a vibe.",
  }),
  targetPlaylist: z.string({
    required_error: "Please select a playlist.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PlaylistSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addSubmission } = useSubmissions();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      trackLink: "",
      genre: "",
      vibe: "",
      targetPlaylist: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Add the submission to the system
      addSubmission({
        type: 'playlist',
        artistName: data.artistName,
        trackLink: data.trackLink,
        targetPlaylist: data.targetPlaylist,
        email: data.email,
        genre: data.genre,
        vibe: data.vibe,
        message: data.message
      });
      
      toast({
        title: "Playlist Submission Received!",
        description: "Thank you for your submission. We'll review it for potential inclusion.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error with your submission. Please try again.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const genres = [
    "House",
    "Techno",
    "Chill",
    "Bass",
    "Ambient",
    "Downtempo",
    "Melodic Techno",
    "Progressive",
    "Deep House",
    "Other",
  ];

  const vibes = [
    "Energetic",
    "Dreamy",
    "Spiritual",
    "Dark",
    "Uplifting",
    "Hypnotic",
    "Emotional",
    "Groovy",
    "Euphoric",
    "Experimental",
  ];

  const playlists = [
    "PlayLSD: Underground Gems",
    "PlayLSD: Festival Favorites",
    "PlayLSD: Chill Sessions",
    "PlayLSD: Midnight Drive",
    "PlayLSD: Sunrise Rituals",
    "PlayLSD: Deep Meditation",
  ];

  return (
    <div className="glass-morphism p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gradient-primary">Submit to PlayLSD Playlists</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="artistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artist Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your artist name" {...field} className="bg-playlsd-dark/50 border-playlsd-purple/30" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="trackLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Link</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Spotify, SoundCloud, or other streaming URL" 
                    {...field} 
                    className="bg-playlsd-dark/50 border-playlsd-purple/30"
                  />
                </FormControl>
                <FormDescription>
                  Link to your track on any streaming platform
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-playlsd-dark/50 border-playlsd-purple/30">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vibe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vibe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-playlsd-dark/50 border-playlsd-purple/30">
                        <SelectValue placeholder="Select a vibe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vibes.map((vibe) => (
                        <SelectItem key={vibe} value={vibe}>{vibe}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="targetPlaylist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Playlist</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-playlsd-dark/50 border-playlsd-purple/30">
                      <SelectValue placeholder="Select a playlist" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {playlists.map((playlist) => (
                      <SelectItem key={playlist} value={playlist}>{playlist}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose which PlayLSD playlist your track would fit best
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    {...field} 
                    className="bg-playlsd-dark/50 border-playlsd-purple/30"
                  />
                </FormControl>
                <FormDescription>
                  We'll use this to contact you if your track is selected
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us why your track would be a good fit for the selected playlist" 
                    {...field}
                    className="bg-playlsd-dark/50 border-playlsd-purple/30 min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full md:w-auto bg-playlsd-purple hover:bg-playlsd-purple-mid transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit for Playlist"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PlaylistSubmissionForm;
