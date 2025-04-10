
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon, CheckIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ open, onOpenChange, url, title }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the URL manually.",
        variant: "destructive",
      });
    }
  };
  
  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };
  
  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out this playlist on PlayLSD: ${title}`)}`, '_blank');
  };
  
  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-morphism border-playlsd-purple/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Share this playlist with your friends and followers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              className="bg-playlsd-dark/50 border-playlsd-purple/30 text-gray-300"
              readOnly
              value={url}
            />
          </div>
          <Button size="sm" onClick={handleCopy} className="px-3">
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-3">Share on social media:</p>
          <div className="flex space-x-2">
            <Button 
              onClick={shareFacebook} 
              variant="outline" 
              size="icon"
              className="rounded-full w-10 h-10 border-blue-500 text-blue-500 hover:text-blue-400 hover:border-blue-400 hover:bg-blue-500/10"
            >
              <FacebookIcon className="h-5 w-5" />
            </Button>
            <Button 
              onClick={shareTwitter} 
              variant="outline" 
              size="icon"
              className="rounded-full w-10 h-10 border-sky-500 text-sky-500 hover:text-sky-400 hover:border-sky-400 hover:bg-sky-500/10"
            >
              <TwitterIcon className="h-5 w-5" />
            </Button>
            <Button 
              onClick={shareLinkedIn} 
              variant="outline" 
              size="icon"
              className="rounded-full w-10 h-10 border-blue-600 text-blue-600 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-600/10"
            >
              <LinkedinIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
