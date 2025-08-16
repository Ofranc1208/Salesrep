'use client';

import React from 'react';
import { LeadNotification } from '../../types';
import { formatTimeAgo } from '../../utils/date-helpers';

interface NotificationItemProps {
  notification: LeadNotification;
  onMarkAsRead: (notificationId: string) => void;
  onDismiss: (notificationId: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDismiss
}: NotificationItemProps) {
  return (
    <div
      className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
        !notification.isRead ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 mb-1">
            {notification.campaignName}
          </div>
          <p className="text-xs text-gray-600 mb-1">
            {notification.leadCount} new leads from {notification.managerName}
          </p>
          <p className="text-xs text-gray-400">
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          {!notification.isRead && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="p-1 text-blue-600 hover:text-blue-800 rounded"
              title="Mark as read"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
          <button
            onClick={() => onDismiss(notification.id)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            title="Dismiss"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
