
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Music, Home, ListMusic, Send, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AdminLoginModal from "../admin/AdminLoginModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };
  
  // Check if user is already logged in as admin
  const isAdmin = () => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth) {
      try {
        const { isAdmin } = JSON.parse(adminAuth);
        return isAdmin;
      } catch (error) {
        return false;
      }
    }
    return false;
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
  
  // Add Admin Dashboard link if user is logged in
  if (isAdmin()) {
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
          {!isAdmin() && (
            <Button 
              variant="ghost" 
              onClick={openAdminModal} 
              className="ml-2 hover:bg-playlsd-purple/10"
            >
              Admin
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
            {!isAdmin() && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsMenuOpen(false);
                  openAdminModal();
                }} 
                className="w-full justify-start hover:bg-playlsd-purple/10"
              >
                Admin
              </Button>
            )}
          </div>
        </div>
      )}

      <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
