'use client';

import React, { useState } from 'react';
import { LeadNotification } from '../../types';
import NotificationDropdown from './NotificationDropdown';

interface NotificationBellProps {
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
}

export default function NotificationBell({
  notifications,
  onNotificationMarkAsRead,
  onNotificationDismiss
}: NotificationBellProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5a2.5 2.5 0 01-2.5-2.5V9a2.5 2.5 0 012.5-2.5h15a2.5 2.5 0 012.5 2.5v8a2.5 2.5 0 01-2.5 2.5h-15z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isNotificationsOpen && (
        <NotificationDropdown
          notifications={notifications}
          onNotificationMarkAsRead={onNotificationMarkAsRead}
          onNotificationDismiss={onNotificationDismiss}
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}
    </div>
  );
}
