
import React from "react";
import { 
  Bell, 
  MessageSquare, 
  Music, 
  ListMusic,
  Check
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'song' | 'playlist' | 'system';
  read: boolean;
  date: string;
}

interface AdminNotificationProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const AdminNotification: React.FC<AdminNotificationProps> = ({ 
  notification,
  onMarkAsRead
}) => {
  const { id, title, message, type, read, date } = notification;
  
  const getIcon = () => {
    switch (type) {
      case 'song':
        return <Music className="h-5 w-5 text-playlsd-purple" />;
      case 'playlist':
        return <ListMusic className="h-5 w-5 text-playlsd-purple-mid" />;
      case 'system':
        return <Bell className="h-5 w-5 text-playlsd-purple-light" />;
      default:
        return <MessageSquare className="h-5 w-5 text-playlsd-purple" />;
    }
  };
  
  return (
    <Card className={`glass-morphism ${!read ? 'border-playlsd-purple' : 'border-playlsd-purple/20'}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center">
          {getIcon()}
          <CardTitle className="ml-2 text-lg">{title}</CardTitle>
          {!read && (
            <Badge variant="default" className="ml-2 bg-playlsd-purple text-white">New</Badge>
          )}
        </div>
        <CardDescription>{new Date(date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{message}</p>
      </CardContent>
      {!read && (
        <CardFooter>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
            onClick={() => onMarkAsRead(id)}
          >
            <Check className="mr-1 h-4 w-4" />
            Mark as read
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AdminNotification;
