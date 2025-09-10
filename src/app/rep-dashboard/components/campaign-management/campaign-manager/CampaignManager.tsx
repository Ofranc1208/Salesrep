'use client';

// REFACTORED: CampaignManager - Now a Slim Orchestrator (Single Responsibility)
// Extracted components: CampaignNavigation, CampaignLayout, TabContent
// Extracted hooks: useCampaignWorkflow (in hooks/useCampaignWorkflow.ts)

import React, { useState } from 'react';
import { Campaign, LeadNotification, Lead } from '../../../types';
import { CampaignNavigation, CampaignLayout, TabContent, TabType } from './components';
import { useCampaignWorkflow } from './hooks/useCampaignWorkflow';

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
  onLeadsReceived: (leads: Lead[], campaignId: string) => void;
  repId?: string;
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
  onLeadListChange,
  onLeadsReceived,
  repId = 'rep-1'
}: CampaignManagerProps) {
  // 🎭 SLIM ORCHESTRATOR - Single Responsibility: Coordinate Components
  
  // State Management (minimal)
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);
  
  // Workflow Integration (extracted to hook)
  const workflow = useCampaignWorkflow({ selectedCampaignId, onLeadsReceived });

  // 🎼 PURE ORCHESTRATION - Compose Components
  return (
    <CampaignLayout
      navigation={
        <CampaignNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      }
      content={
        <TabContent
          activeTab={activeTab}
          selectedCampaign={selectedCampaign}
          campaignLeads={campaignLeads}
          selectedLead={selectedLead}
          activeLeadList={activeLeadList}
          onLeadSelect={onLeadSelect}
          onLeadListChange={onLeadListChange}
          repId={repId}
          onAcceptAssignment={workflow.handleLeadAssignmentAccept}
          onDeclineAssignment={workflow.handleLeadAssignmentDecline}
        />
      }
    />
  );
}