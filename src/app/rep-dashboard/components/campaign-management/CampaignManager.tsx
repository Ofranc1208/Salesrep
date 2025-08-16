'use client';

import React from 'react';
import { Campaign, LeadNotification, Lead } from '../../types';
import CampaignHeader from './CampaignHeader';
import LeadListCard from './LeadListCard';
import ActiveLeadListDetails from './ActiveLeadListDetails';
import CampaignSummary from './CampaignSummary';
import CampaignLeadsPreview from './CampaignLeadsPreview';

interface CampaignManagerProps {
  campaigns: Campaign[];
  selectedCampaignId: string;
  onCampaignChange: (campaignId: string) => void;
  notifications: LeadNotification[];
  onNotificationMarkAsRead: (notificationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
  campaignLeads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
}

export default function CampaignManager({
  campaigns,
  selectedCampaignId,
  onCampaignChange,
  notifications,
  onNotificationMarkAsRead,
  onNotificationDismiss,
  campaignLeads,
  onLeadSelect,
  selectedLead,
  activeLeadList,
  onLeadListChange
}: CampaignManagerProps) {
  // Mock data for the 4 lead lists - MVP version with realistic numbers
  const leadListData = {
    prospect: {
      name: 'Prospect List',
      count: 3,
      status: 'New leads from manager',
      color: 'blue',
      icon: '📋'
    },
    hot: {
      name: 'Hot List', 
      count: 2,
      status: 'Actively working',
      color: 'red',
      icon: '🔥'
    },
    warm: {
      name: 'Warm List',
      count: 1,
      status: 'Following up',
      color: 'orange',
      icon: '🌡️'
    },
    active: {
      name: 'Active List',
      count: 2,
      status: 'In progress/court',
      color: 'green',
      icon: '✅'
    }
  };

  const handleLeadListSelect = (listType: 'prospect' | 'hot' | 'warm' | 'active') => {
    onLeadListChange(listType);
    // TODO: Load leads for this specific list into Lead Management
    console.log(`Switched to ${listType} list`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-w-0 overflow-hidden">
      <div className="p-1">
        <CampaignHeader
          notifications={notifications}
          onNotificationMarkAsRead={onNotificationMarkAsRead}
          onNotificationDismiss={onNotificationDismiss}
        />
        
        {/* Four Lead List Cards */}
        <div className="grid grid-cols-2 gap-1 mb-1">
          <LeadListCard
            data={leadListData.prospect}
            isActive={activeLeadList === 'prospect'}
            onClick={() => handleLeadListSelect('prospect')}
          />
          <LeadListCard
            data={leadListData.hot}
            isActive={activeLeadList === 'hot'}
            onClick={() => handleLeadListSelect('hot')}
          />
          <LeadListCard
            data={leadListData.warm}
            isActive={activeLeadList === 'warm'}
            onClick={() => handleLeadListSelect('warm')}
          />
          <LeadListCard
            data={leadListData.active}
            isActive={activeLeadList === 'active'}
            onClick={() => handleLeadListSelect('active')}
          />
        </div>

        {/* Active Lead List Details */}
        <ActiveLeadListDetails
          activeLeadList={activeLeadList}
          leadListData={leadListData}
        />

        {/* Campaign Summary */}
        <CampaignSummary activeLeadList={activeLeadList} />

        {/* Campaign Leads Preview */}
        <CampaignLeadsPreview
          campaignLeads={campaignLeads}
          selectedLead={selectedLead}
          onLeadSelect={onLeadSelect}
          activeLeadList={activeLeadList}
          leadListData={leadListData}
        />
      </div>
    </div>
  );
}
