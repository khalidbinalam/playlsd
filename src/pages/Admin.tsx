import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { HomeIcon, LogOut, Bell, FileText, ListMusic, InboxIcon, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationCenter from "@/components/admin/NotificationCenter";
import NewsManager from "@/components/admin/NewsManager";
import SubmissionReview from "@/components/admin/SubmissionReview";
import PlaylistManager from "@/components/admin/PlaylistManager";
import { useNewsPosts } from "@/hooks/use-news-posts";
import { useSubmissions } from "@/hooks/use-submissions";
import { usePlaylistPosts } from "@/hooks/use-playlist-posts";
import { useAuth } from "@/context/AuthContext";
import RequireAuth from "@/components/auth/RequireAuth";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  
  const { posts: playlistPosts } = usePlaylistPosts();
  const { posts: newsPosts } = useNewsPosts();
  const { submissions } = useSubmissions();
  
  const publishedPlaylists = playlistPosts.filter(p => p.published).length;
  const draftPlaylists = playlistPosts.filter(p => !p.published).length;
  const publishedNews = newsPosts.filter(p => p.published).length;
  const draftNews = newsPosts.filter(p => !p.published).length;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
  const featuredPlaylists = playlistPosts.filter(p => p.featured).length;
  const featuredNews = newsPosts.filter(p => p.featured).length;

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple"></div>
      </div>
    );
  }

  return (
    <RequireAuth requireAdmin={true}>
      <div className="min-h-screen bg-playlsd-dark">
        <header className="glass-morphism sticky top-0 z-50 border-b border-playlsd-purple/20">
          <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gradient-primary font-display">PlayLSD Admin</h1>
            <div className="flex items-center space-x-2">
              <NotificationCenter />
              <Button variant="ghost" onClick={handleLogout} className="hover:bg-playlsd-purple/10">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 md:px-6 py-8">
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="glass-morphism mb-6">
              <TabsTrigger value="playlists" className="flex items-center">
                <Music className="mr-2 h-4 w-4" />
                Playlists
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex items-center">
                <InboxIcon className="mr-2 h-4 w-4" />
                Submissions
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                News Posts
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center">
                <ListMusic className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="playlists" className="space-y-6">
              <PlaylistManager />
            </TabsContent>
            
            <TabsContent value="submissions" className="space-y-6">
              <SubmissionReview />
            </TabsContent>
            
            <TabsContent value="news" className="space-y-6">
              <NewsManager />
            </TabsContent>
            
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle>Admin Dashboard</CardTitle>
                    <CardDescription>
                      Content management overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      You can manage the following content:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Create and manage playlists with SEO optimization</li>
                      <li>Review song and playlist submissions</li>
                      <li>Publish news articles and updates</li>
                      <li>Manage user notifications</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => navigate("/")} className="w-full bg-playlsd-purple hover:bg-playlsd-purple-mid transition-colors">
                      Return to Site
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="glass-morphism">
                  <CardHeader>
                    <CardTitle>Content Overview</CardTitle>
                    <CardDescription>
                      Published content and submissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li><strong>Playlists:</strong> {publishedPlaylists} published, {draftPlaylists} drafts</li>
                      <li><strong>News Posts:</strong> {publishedNews} published, {draftNews} drafts</li>
                      <li><strong>Pending Submissions:</strong> {pendingSubmissions}</li>
                      <li><strong>Featured Content:</strong> {featuredPlaylists} playlists, {featuredNews} news posts</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription>
                    Manage your system notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NotificationCenter expanded={true} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RequireAuth>
  );
};

export default Admin;
