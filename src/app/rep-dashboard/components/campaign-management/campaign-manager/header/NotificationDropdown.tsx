'use client';

import React from 'react';
import { LeadNotification } from '../../../../types';

interface NotificationDropdownProps {
  notifications: LeadNotification[];
  showNotifications: boolean;
  onClose: () => void;
  onMarkAsRead: (notificationId: string) => void;
  onDismiss: (notificationId: string) => void;
}

export default function NotificationDropdown({
  notifications,
  showNotifications,
  onClose,
  onMarkAsRead,
  onDismiss
}: NotificationDropdownProps) {
  if (!showNotifications) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-10" 
        onClick={onClose}
      />
      <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
        <div className="p-3 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900">
            Notifications ({notifications.length})
          </h4>
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No notifications
          </div>
        ) : (
          <div className="py-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.isRead ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {notification.leadCount} new leads assigned to {notification.campaignName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => onDismiss(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
