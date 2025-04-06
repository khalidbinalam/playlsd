
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// These would typically be stored in a backend or auth system
const ADMIN_EMAILS = ["admin1@playlsd.com", "admin2@playlsd.com", "admin3@playlsd.com"];

const AdminLoginModal = ({ isOpen, onClose }: AdminLoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple admin check - in a real app, this would be a server-side auth check
    if (ADMIN_EMAILS.includes(email.toLowerCase()) && password.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard!",
        });
        
        // Store admin session in localStorage for demo
        localStorage.setItem("adminAuth", JSON.stringify({ email, isAdmin: true }));
        
        onClose();
        // In a real app, redirect to admin dashboard or change app state
        window.location.href = "/admin";
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }, 1000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-morphism">
        <DialogHeader>
          <DialogTitle className="text-gradient-primary">Admin Login</DialogTitle>
          <DialogDescription>
            Only verified admins can post content to PlayLSD Hub.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@playlsd.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-playlsd-dark/50 border-playlsd-purple/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-playlsd-dark/50 border-playlsd-purple/30"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-playlsd-purple hover:bg-playlsd-purple-mid transition-colors">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-xs text-gray-400 text-center">
          <p>For demo purposes, use:</p>
          <p>Email: admin1@playlsd.com</p>
          <p>Password: any password</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginModal;
