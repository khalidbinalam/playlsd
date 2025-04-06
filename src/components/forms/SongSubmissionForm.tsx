
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

const formSchema = z.object({
  artistName: z.string().min(2, {
    message: "Artist name must be at least 2 characters.",
  }),
  songTitle: z.string().min(1, {
    message: "Song title is required.",
  }),
  streamingLink: z.string().url({
    message: "Please enter a valid URL.",
  }),
  genre: z.string({
    required_error: "Please select a genre.",
  }),
  vibe: z.string({
    required_error: "Please select a vibe.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SongSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      songTitle: "",
      streamingLink: "",
      genre: "",
      vibe: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submission data:", data);
      
      toast({
        title: "Song Submitted Successfully!",
        description: "Thank you for your submission. We'll review it soon.",
      });
      
      form.reset();
      setIsSubmitting(false);
    }, 1500);
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

  return (
    <div className="glass-morphism p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gradient-primary">Submit Your Song</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              name="songTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your song title" {...field} className="bg-playlsd-dark/50 border-playlsd-purple/30" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="streamingLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Streaming Link</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Spotify, SoundCloud, or other streaming URL" 
                    {...field} 
                    className="bg-playlsd-dark/50 border-playlsd-purple/30"
                  />
                </FormControl>
                <FormDescription>
                  Link to your song on any streaming platform
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
                  We'll use this to contact you about your submission
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
                    placeholder="Tell us more about your song, upcoming releases, or yourself" 
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
            {isSubmitting ? "Submitting..." : "Submit Song"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SongSubmissionForm;
