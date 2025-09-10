'use client';

// Tab Content Renderer - Extracted from CampaignManager.tsx
import React from 'react';
import { Campaign, Lead } from '../../../../types';
import { OverviewTab, LeadsTab, QueueTab, AnalyticsTab } from '../tabs';
import { TabType } from './CampaignNavigation';

interface TabContentProps {
  activeTab: TabType;
  selectedCampaign: Campaign | undefined;
  campaignLeads: Lead[];
  selectedLead: Lead | null;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
  onLeadSelect: (lead: Lead) => void;
  onLeadListChange: (listType: 'prospect' | 'hot' | 'warm' | 'active') => void;
  repId?: string;
  onAcceptAssignment: (assignmentId: string, leads: Lead[]) => void;
  onDeclineAssignment: (assignmentId: string, reason?: string) => void;
}

export default function TabContent({
  activeTab,
  selectedCampaign,
  campaignLeads,
  selectedLead,
  activeLeadList,
  onLeadSelect,
  onLeadListChange,
  repId,
  onAcceptAssignment,
  onDeclineAssignment
}: TabContentProps) {
  switch (activeTab) {
    case 'overview':
      return (
        <OverviewTab
          selectedCampaign={selectedCampaign}
          campaignLeads={campaignLeads}
          activeLeadList={activeLeadList}
          onLeadListChange={onLeadListChange}
          repId={repId}
          onAcceptAssignment={onAcceptAssignment}
          onDeclineAssignment={onDeclineAssignment}
        />
      );

    case 'leads':
      return (
        <LeadsTab
          campaignLeads={campaignLeads}
          onLeadSelect={onLeadSelect}
          selectedLead={selectedLead}
          activeLeadList={activeLeadList}
          onLeadListChange={onLeadListChange}
        />
      );

    case 'queue':
      return (
        <QueueTab 
          repId={repId}
          onAcceptAssignment={onAcceptAssignment}
          onDeclineAssignment={onDeclineAssignment}
        />
      );

    case 'analytics':
      return (
        <AnalyticsTab
          selectedCampaign={selectedCampaign}
          activeLeadList={activeLeadList}
        />
      );

    default:
      return null;
  }
}
