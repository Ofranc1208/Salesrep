'use client';

import React, { useState } from 'react';
import { Campaign, LeadNotification } from '../../../types';
import {
  CampaignInfo,
  NotificationButton,
  NotificationDropdown,
  CampaignQuickStats
} from './header';

interface CampaignHeaderProps {
  selectedCampaign?: Campaign;
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
}

export default function CampaignHeader({
  selectedCampaign,
  notifications,
  onNotificationMarkAsRead,
  onNotificationDismiss
}: CampaignHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="border-b border-gray-200 pb-2 mb-2">
      <div className="flex items-center justify-between">
        <CampaignInfo selectedCampaign={selectedCampaign} />

        <div className="relative">
          <NotificationButton
            unreadCount={unreadCount}
            showNotifications={showNotifications}
            onToggle={() => setShowNotifications(!showNotifications)}
          />

          <NotificationDropdown
            notifications={notifications}
            showNotifications={showNotifications}
            onClose={() => setShowNotifications(false)}
            onMarkAsRead={onNotificationMarkAsRead}
            onDismiss={onNotificationDismiss}
          />
        </div>
      </div>

      <CampaignQuickStats selectedCampaign={selectedCampaign} />
    </div>
  );
}