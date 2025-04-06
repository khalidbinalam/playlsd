import React, { useState } from "react";
import { Bell, BellOff, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNotifications } from "@/hooks/use-notifications";
import AdminNotification from "./AdminNotification";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationCenter: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { 
    notifications, 
    loading, 
    markAsRead, 
    markAllAsRead,
    unreadCount 
  } = useNotifications();

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    // Keep popover open
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-playlsd-purple/10"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-playlsd-purple text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="glass-morphism w-80 sm:w-96 border-playlsd-purple/20 p-0" side="bottom" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b border-playlsd-purple/20">
          <h3 className="font-semibold text-gray-200">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs hover:bg-playlsd-purple/10"
              onClick={handleMarkAllAsRead}
            >
              <CheckSquare className="mr-1 h-3 w-3" />
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="unread" className="w-full">
          <TabsList className="grid grid-cols-2 bg-playlsd-dark/40 mx-2 mt-2">
            <TabsTrigger 
              value="unread" 
              className="data-[state=active]:bg-playlsd-purple/20"
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-playlsd-purple/20"
            >
              All
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="unread" className="mt-0">
            <ScrollArea className="h-[300px] p-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ))}
                </div>
              ) : unreadNotifications.length > 0 ? (
                <div className="space-y-4">
                  {unreadNotifications.map((notification) => (
                    <AdminNotification 
                      key={notification.id} 
                      notification={notification} 
                      onMarkAsRead={markAsRead} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <BellOff className="h-10 w-10 text-gray-500 mb-2" />
                  <p className="text-gray-400">No unread notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[300px] p-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ))}
                </div>
              ) : notifications.length > 0 ? (
                <div className="space-y-4">
                  {unreadNotifications.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium text-gray-400">New</h4>
                      {unreadNotifications.map((notification) => (
                        <AdminNotification 
                          key={notification.id} 
                          notification={notification} 
                          onMarkAsRead={markAsRead} 
                        />
                      ))}
                      {readNotifications.length > 0 && (
                        <Separator className="my-2 bg-playlsd-purple/20" />
                      )}
                    </>
                  )}
                  
                  {readNotifications.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium text-gray-400">Earlier</h4>
                      {readNotifications.map((notification) => (
                        <AdminNotification 
                          key={notification.id} 
                          notification={notification} 
                          onMarkAsRead={markAsRead} 
                        />
                      ))}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <BellOff className="h-10 w-10 text-gray-500 mb-2" />
                  <p className="text-gray-400">No notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
