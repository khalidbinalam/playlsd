
import React, { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from "@/hooks/use-notifications";
import AdminNotification from "./AdminNotification";
import { Card } from "@/components/ui/card";

interface NotificationCenterProps {
  expanded?: boolean;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ expanded = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    loading, 
    markAsRead, 
    markAllAsRead,
    unreadCount 
  } = useNotifications();

  const unreadNotifications = notifications.filter(notification => !notification.read);
  const readNotifications = notifications.filter(notification => notification.read);

  const NotificationList = ({ notifications, onMarkAsRead }: { 
    notifications: any[],
    onMarkAsRead: (id: string) => void
  }) => {
    if (notifications.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">No notifications</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
        {notifications.map((notification) => (
          <AdminNotification
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    );
  };

  // For expanded view in the notifications tab
  if (expanded) {
    return (
      <div className="w-full p-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notification Center</h3>
          {unreadCount > 0 && (
            <Button 
              size="sm" 
              onClick={markAllAsRead}
              variant="outline" 
              className="border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
            >
              <Check className="mr-1 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-playlsd-purple mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading notifications...</p>
          </div>
        ) : (
          <Tabs defaultValue="unread" className="w-full">
            <TabsList className="mb-4 glass-morphism">
              <TabsTrigger value="unread">
                Unread ({unreadNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="read">
                Read ({readNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="all">
                All ({notifications.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="unread">
              <NotificationList 
                notifications={unreadNotifications} 
                onMarkAsRead={markAsRead} 
              />
            </TabsContent>
            
            <TabsContent value="read">
              <NotificationList 
                notifications={readNotifications} 
                onMarkAsRead={() => {}} 
              />
            </TabsContent>
            
            <TabsContent value="all">
              <NotificationList 
                notifications={notifications} 
                onMarkAsRead={markAsRead} 
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    );
  }

  // For popover view in the header
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative" size="icon">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-playlsd-purple text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass-morphism border-playlsd-purple/30" align="end">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              size="sm" 
              onClick={markAllAsRead}
              variant="outline" 
              className="border-playlsd-purple hover:bg-playlsd-purple/10 text-playlsd-purple-light"
            >
              <Check className="mr-1 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-playlsd-purple mx-auto"></div>
          </div>
        ) : (
          <Tabs defaultValue="unread" className="w-full">
            <TabsList className="w-full mb-3">
              <TabsTrigger value="unread" className="flex-1">
                Unread ({unreadNotifications.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex-1">
                All ({notifications.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="unread">
              <NotificationList 
                notifications={unreadNotifications} 
                onMarkAsRead={(id) => {
                  markAsRead(id);
                  if (unreadCount <= 1) {
                    setIsOpen(false);
                  }
                }} 
              />
            </TabsContent>
            
            <TabsContent value="all">
              <NotificationList 
                notifications={notifications} 
                onMarkAsRead={(id) => {
                  markAsRead(id);
                  if (unreadCount <= 1) {
                    setIsOpen(false);
                  }
                }} 
              />
            </TabsContent>
          </Tabs>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
