
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, X, Plus, Tag } from "lucide-react";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsPostType } from "./NewsPost";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters." }),
  tags: z.array(z.string()),
  featured: z.boolean(),
  published: z.boolean(),
});

interface NewsPostFormProps {
  initialData?: NewsPostType;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

const NewsPostForm: React.FC<NewsPostFormProps> = ({ 
  initialData, 
  onSubmit,
  onCancel
}) => {
  const [tagInput, setTagInput] = React.useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      content: initialData.content,
      tags: initialData.tags,
      featured: initialData.featured,
      published: initialData.published,
    } : {
      title: "",
      content: "",
      tags: [],
      featured: false,
      published: false,
    },
  });

  const addTag = () => {
    if (tagInput.trim() === "") return;
    
    const currentTags = form.getValues("tags") || [];
    if (!currentTags.includes(tagInput.trim())) {
      form.setValue("tags", [...currentTags, tagInput.trim()]);
    }
    setTagInput("");
  };
  
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };
  
  return (
    <Card className="glass-morphism border-playlsd-purple/30">
      <CardHeader>
        <CardTitle className="text-gradient-primary">
          {initialData ? "Edit News Post" : "Create News Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter post title..." 
                      className="bg-playlsd-dark/50 border-playlsd-purple/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your post content..." 
                      className="min-h-32 bg-playlsd-dark/50 border-playlsd-purple/30"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Markdown is supported for formatting.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex mt-1.5 mb-3">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a tag..."
                  className="bg-playlsd-dark/50 border-playlsd-purple/30"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={addTag}
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
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-8">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0">
                    <FormLabel>Featured Post</FormLabel>
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
                Save
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewsPostForm;
