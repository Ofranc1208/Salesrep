'use client';

import React from 'react';
import { useNotifications, useNotificationFilters } from './hooks';
import { NotificationCenterProps } from './types';

const NotificationCenter: React.FC<NotificationCenterProps> = ({ selectedPriority }) => {
  // Use the new modular hooks
  const { filters, updateFilter } = useNotificationFilters({
    priority: selectedPriority,
    unreadOnly: false
  });

  const { 
    notifications, 
    stats, 
    loading, 
    error, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications(filters);

  // Handle notification click
  const handleNotificationClick = async (notificationId: string) => {
    await markAsRead(notificationId);
  };

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  // Filter notifications based on selected priority
  const filteredNotifications = selectedPriority 
    ? notifications.filter(n => n.priority === selectedPriority)
    : notifications;

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-xs p-2 bg-red-50 rounded">
        Error loading notifications: {error}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header with stats and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-700">
            {filteredNotifications.length} notifications
          </span>
          {stats && stats.unread > 0 && (
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
              {stats.unread} unread
            </span>
          )}
        </div>
        
        {stats && stats.unread > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Filter toggles */}
      <div className="flex space-x-2">
        <button
          onClick={() => updateFilter('unreadOnly', !filters.unreadOnly)}
          className={`px-2 py-1 text-xs rounded ${
            filters.unreadOnly 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Unread only
        </button>
        <button
          onClick={() => updateFilter('actionRequiredOnly', !filters.actionRequiredOnly)}
          className={`px-2 py-1 text-xs rounded ${
            filters.actionRequiredOnly 
              ? 'bg-orange-100 text-orange-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Action required
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-xs text-gray-500 text-center py-4">
            {selectedPriority 
              ? `No notifications for ${selectedPriority} priority`
              : 'No notifications'
            }
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={`p-2 rounded-lg border cursor-pointer transition-all ${
                notification.read
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-white border-gray-300 shadow-sm'
              } hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      notification.type === 'urgent' ? 'bg-red-500' :
                      notification.type === 'warning' ? 'bg-orange-500' :
                      notification.type === 'success' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}></div>
                    
                    <h4 className={`text-xs font-medium truncate ${
                      notification.read ? 'text-gray-600' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </h4>
                    
                    {notification.actionRequired && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-xs rounded font-medium">
                        Action
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-xs mt-1 truncate ${
                    notification.read ? 'text-gray-500' : 'text-gray-700'
                  }`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">
                      {notification.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    
                    <span className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${
                      notification.priority === 'hot' ? 'bg-red-100 text-red-600' :
                      notification.priority === 'active' ? 'bg-green-100 text-green-600' :
                      notification.priority === 'warm' ? 'bg-orange-100 text-orange-600' :
                      notification.priority === 'prospect' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {notification.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center justify-center pt-1">
        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Live updates</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
