'use client';

import React from 'react';

interface NotificationButtonProps {
  unreadCount: number;
  showNotifications: boolean;
  onToggle: () => void;
}

export default function NotificationButton({ unreadCount, showNotifications, onToggle }: NotificationButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 0-8-3-8-8s3-8 8-8 8 3 8 8-3 8-8 8z" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
