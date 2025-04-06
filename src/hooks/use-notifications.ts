
import { useState, useEffect } from 'react';
import { Notification } from '@/components/admin/AdminNotification';

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Song Submission',
    message: 'A new track "Cosmic Waves" has been submitted for review.',
    type: 'song',
    read: false,
    date: new Date(Date.now() - 8640000).toISOString() // 1 day ago
  },
  {
    id: '2',
    title: 'Playlist Update',
    message: 'Your "Summer Vibes" playlist has been updated with 3 new tracks.',
    type: 'playlist',
    read: false,
    date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'The system will undergo maintenance on Saturday night. Some features may be temporarily unavailable.',
    type: 'system',
    read: true,
    date: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  },
  {
    id: '4',
    title: 'Trending Playlist',
    message: 'Your "Chill House" playlist is trending with 150+ shares this week!',
    type: 'playlist',
    read: true,
    date: new Date(Date.now() - 604800000).toISOString() // 7 days ago
  },
  {
    id: '5',
    title: 'Playlist Submission',
    message: 'A user has requested to add their track to your "Deep Focus" playlist.',
    type: 'playlist',
    read: true,
    date: new Date(Date.now() - 864000000).toISOString() // 10 days ago
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchNotifications = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Get notifications from localStorage or use sample data
        const storedNotifications = localStorage.getItem('adminNotifications');
        
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        } else {
          setNotifications(sampleNotifications);
          localStorage.setItem('adminNotifications', JSON.stringify(sampleNotifications));
        }
        
        setLoading(false);
      }, 600);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ 
      ...notification, 
      read: true 
    }));
    
    setNotifications(updatedNotifications);
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return { 
    notifications, 
    loading, 
    markAsRead, 
    markAllAsRead,
    unreadCount
  };
};
