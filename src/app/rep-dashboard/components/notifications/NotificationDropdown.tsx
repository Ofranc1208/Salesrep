'use client';

import React from 'react';
import { LeadNotification } from '../../types';
import NotificationItem from './NotificationItem';

interface NotificationDropdownProps {
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
  onClose: () => void;
}

export default function NotificationDropdown({
  notifications,
  onNotificationMarkAsRead,
  onNotificationDismiss,
  onClose
}: NotificationDropdownProps) {
  return (
    <div className="absolute right-0 bottom-full mb-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-64 overflow-y-auto">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Notifications</h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No new notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onNotificationMarkAsRead}
              onDismiss={onNotificationDismiss}
            />
          ))
        )}
      </div>
    </div>
  );
}
