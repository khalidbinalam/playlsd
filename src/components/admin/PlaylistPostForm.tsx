
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, X, Plus, Tag, Music } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaylistPost } from "@/types/PlaylistPost";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  embedUrl: z.string().url({ message: "Please enter a valid URL." }),
  embedType: z.enum(["spotify", "youtube", "soundcloud", "other"]),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  tags: z.array(z.string()),
  genres: z.array(z.string()),
  artists: z.array(z.string()),
  keywords: z.array(z.string()),
  published: z.boolean(),
  featured: z.boolean(),
});

interface PlaylistPostFormProps {
  initialData?: PlaylistPost;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

const PlaylistPostForm: React.FC<PlaylistPostFormProps> = ({ 
  initialData, 
  onSubmit,
  onCancel
}) => {
  const [tagInput, setTagInput] = useState("");
  const [genreInput, setGenreInput] = useState("");
  const [artistInput, setArtistInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      embedUrl: initialData.embedUrl,
      embedType: initialData.embedType,
      imageUrl: initialData.imageUrl || '',
      tags: initialData.tags,
      genres: initialData.genres,
      artists: initialData.artists,
      keywords: initialData.keywords,
      published: initialData.published,
      featured: initialData.featured,
    } : {
      title: "",
      description: "",
      embedUrl: "",
      embedType: "spotify",
      imageUrl: "",
      tags: [],
      genres: [],
      artists: [],
      keywords: [],
      published: false,
      featured: false,
    },
  });

  // Generic function to add items to arrays
  const addItem = (
    item: string, 
    arrayName: 'tags' | 'genres' | 'artists' | 'keywords', 
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (item.trim() === "") return;
    
    const currentItems = form.getValues(arrayName) || [];
    if (!currentItems.includes(item.trim())) {
      form.setValue(arrayName, [...currentItems, item.trim()]);
    }
    setInput("");
  };
  
  // Generic function to remove items from arrays
  const removeItem = (
    itemToRemove: string, 
    arrayName: 'tags' | 'genres' | 'artists' | 'keywords'
  ) => {
    const currentItems = form.getValues(arrayName);
    form.setValue(
      arrayName, 
      currentItems.filter(item => item !== itemToRemove)
    );
  };
  
  // Handle Enter key for adding items
  const handleKeyDown = (
    e: React.KeyboardEvent, 
    item: string, 
    arrayName: 'tags' | 'genres' | 'artists' | 'keywords', 
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(item, arrayName, setInput);
    }
  };
  
  return (
    <Card className="glass-morphism border-playlsd-purple/30">
      <CardHeader>
        <CardTitle className="text-gradient-primary">
          {initialData ? "Edit Playlist Post" : "Create Playlist Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter playlist title..." 
                          className="bg-playlsd-dark/50 border-playlsd-purple/30"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A descriptive title for SEO and sharing.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write a description for this playlist..." 
                          className="min-h-32 bg-playlsd-dark/50 border-playlsd-purple/30"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Detailed description helps with search engine optimization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="embedType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Embed Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-playlsd-dark/50 border-playlsd-purple/30">
                              <SelectValue placeholder="Select embed type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="spotify">Spotify</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="soundcloud">SoundCloud</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="embedUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Embed URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://..." 
                            className="bg-playlsd-dark/50 border-playlsd-purple/30"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://..." 
                          className="bg-playlsd-dark/50 border-playlsd-purple/30"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A cover image for the playlist (shown in previews).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-6">
                {/* Artists Input */}
                <div>
                  <FormLabel>Artists</FormLabel>
                  <div className="flex mt-1.5 mb-3">
                    <Input
                      value={artistInput}
                      onChange={(e) => setArtistInput(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, artistInput, 'artists', setArtistInput)}
                      placeholder="Add an artist..."
                      className="bg-playlsd-dark/50 border-playlsd-purple/30"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => addItem(artistInput, 'artists', setArtistInput)}
                      className="ml-2 border-playlsd-purple hover:bg-playlsd-purple/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("artists")?.map((artist, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-playlsd-purple/20 text-playlsd-purple-light flex items-center"
                      >
                        <Music className="h-3 w-3 mr-1" />
                        {artist}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => removeItem(artist, 'artists')}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormDescription className="mt-1">
                    Add artists featured in this playlist.
                  </FormDescription>
                </div>
                
                {/* Genres Input */}
                <div>
                  <FormLabel>Genres</FormLabel>
                  <div className="flex mt-1.5 mb-3">
                    <Input
                      value={genreInput}
                      onChange={(e) => setGenreInput(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, genreInput, 'genres', setGenreInput)}
                      placeholder="Add a genre..."
                      className="bg-playlsd-dark/50 border-playlsd-purple/30"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => addItem(genreInput, 'genres', setGenreInput)}
                      className="ml-2 border-playlsd-purple hover:bg-playlsd-purple/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("genres")?.map((genre, index) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="border-blue-500 text-blue-400 flex items-center"
                      >
                        {genre}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => removeItem(genre, 'genres')}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormDescription className="mt-1">
                    Add music genres for search optimization.
                  </FormDescription>
                </div>
                
                {/* Tags Input */}
                <div>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex mt-1.5 mb-3">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, tagInput, 'tags', setTagInput)}
                      placeholder="Add a tag..."
                      className="bg-playlsd-dark/50 border-playlsd-purple/30"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => addItem(tagInput, 'tags', setTagInput)}
                      className="ml-2 border-playlsd-purple hover:bg-playlsd-purple/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("tags")?.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="border-playlsd-purple-light text-playlsd-purple-light flex items-center"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => removeItem(tag, 'tags')}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormDescription className="mt-1">
                    Add tags to help with categorization.
                  </FormDescription>
                </div>
                
                {/* Keywords Input */}
                <div>
                  <FormLabel>SEO Keywords</FormLabel>
                  <div className="flex mt-1.5 mb-3">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, keywordInput, 'keywords', setKeywordInput)}
                      placeholder="Add a keyword..."
                      className="bg-playlsd-dark/50 border-playlsd-purple/30"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => addItem(keywordInput, 'keywords', setKeywordInput)}
                      className="ml-2 border-playlsd-purple hover:bg-playlsd-purple/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("keywords")?.map((keyword, index) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="border-gray-500 text-gray-400 flex items-center"
                      >
                        {keyword}
                        <X 
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => removeItem(keyword, 'keywords')}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormDescription className="mt-1">
                    Keywords help with search engine optimization.
                  </FormDescription>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-8">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0">
                    <FormLabel>Featured Playlist</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0">
                    <FormLabel>Published</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <CardFooter className="flex justify-end space-x-2 px-0 pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-playlsd-purple hover:bg-playlsd-purple-mid"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Playlist
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PlaylistPostForm;
