
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Music, Home, ListMusic, Send, Settings, LogIn, LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="mr-2 h-4 w-4" />
    }, 
    {
      name: "Playlists",
      path: "/playlists",
      icon: <ListMusic className="mr-2 h-4 w-4" />
    },
    {
      name: "Submit Song",
      path: "/submit-song",
      icon: <Music className="mr-2 h-4 w-4" />
    }, 
    {
      name: "Submit Playlist",
      path: "/submit-playlist",
      icon: <ListMusic className="mr-2 h-4 w-4" />
    }
  ];
  
  // Add Admin Dashboard link if user is admin
  if (isAdmin) {
    navLinks.push({
      name: "Admin Dashboard",
      path: "/admin",
      icon: <Settings className="mr-2 h-4 w-4" />
    });
  }

  return (
    <nav className="glass-morphism z-50 sticky top-0 py-3">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-display font-bold text-gradient-primary tracking-tight">PlayLSD</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-playlsd-purple/10 transition duration-150 ease-in-out flex items-center"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 hover:bg-playlsd-purple/10 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-playlsd-purple/30">
                      {profile?.full_name ? profile.full_name.charAt(0) : user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{profile?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-morphism border-playlsd-purple/20">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')} 
              className="ml-2 hover:bg-playlsd-purple/10 flex items-center"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-md hover:bg-playlsd-purple/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-playlsd-purple"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-morphism absolute top-full left-0 right-0 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-playlsd-purple/10 transition duration-150 ease-in-out flex items-center" 
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <div className="px-3 py-2 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-playlsd-purple/30">
                      {profile?.full_name ? profile.full_name.charAt(0) : user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{profile?.full_name || user.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full justify-start hover:bg-playlsd-purple/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                onClick={() => {
                  navigate('/auth');
                  setIsMenuOpen(false);
                }} 
                className="w-full justify-start hover:bg-playlsd-purple/10"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
