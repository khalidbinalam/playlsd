
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { HomeIcon, LogOut } from "lucide-react";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = () => {
      const adminAuth = localStorage.getItem("adminAuth");
      
      if (adminAuth) {
        try {
          const { isAdmin } = JSON.parse(adminAuth);
          setIsAdmin(isAdmin);
        } catch (error) {
          console.error("Error parsing admin auth:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    };
    
    checkAdminStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-morphism max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-gradient-primary">Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Please log in as an admin to access the dashboard. If you believe this is an error,
              please contact the site administrators.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/")} 
              className="w-full bg-playlsd-purple hover:bg-playlsd-purple-mid transition-colors"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-playlsd-dark">
      <header className="glass-morphism sticky top-0 z-50 border-b border-playlsd-purple/20">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient-primary font-display">PlayLSD Admin</h1>
          <Button variant="ghost" onClick={handleLogout} className="hover:bg-playlsd-purple/10">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>Welcome to Admin Dashboard</CardTitle>
              <CardDescription>
                This is a placeholder for the admin dashboard that would typically include
                content management tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                In a full implementation, this dashboard would allow you to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Create and manage embedded content</li>
                <li>Review song and playlist submissions</li>
                <li>Manage categories and tags</li>
                <li>View analytics and user engagement metrics</li>
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
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Overview of recent submissions and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                This section would typically display recent submissions, user activity,
                and content statistics.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
