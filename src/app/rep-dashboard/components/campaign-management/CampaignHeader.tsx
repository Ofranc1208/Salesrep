'use client';

import React from 'react';
import NotificationBell from '../notifications/NotificationBell';
import { LeadNotification } from '../../types';

interface CampaignHeaderProps {
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
}

export default function CampaignHeader({
  notifications,
  onNotificationMarkAsRead,
  onNotificationDismiss
}: CampaignHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold text-gray-900">Campaign Management</h3>
      <div className="flex items-center space-x-1">
        <NotificationBell
          notifications={notifications}
          onNotificationMarkAsRead={onNotificationMarkAsRead}
          onNotificationDismiss={onNotificationDismiss}
        />
      </div>
    </div>
  );
}
