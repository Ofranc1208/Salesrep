'use client';

import React, { useState } from 'react';
import LeadManagement from './components/lead-management/LeadManagement';
import CampaignManager from './components/campaign-management/CampaignManager';
import DashboardHeader from './components/core-components/DashboardHeader';
import { useLeadManagement } from './hooks/useLeadManagement';
import { useCampaignManagement } from './hooks/useCampaignManagement';
import { useTemplates } from './hooks/useTemplates';
import { getStatusColor, getStatusText, getPhoneStatusColor, getPhoneStatusTextColor, getPhoneStatusText, getRelationshipText, getNextStatus } from './utils/status-helpers';
import { useSharedDataFlow } from './hooks/useSharedDataFlow';
import ConnectionStatus from './components/core-components/ConnectionStatus';
import AIWindow from './components/ai-assistant/AIWindow';
import { CampaignInfo, TabType } from './types';
import { campaignLeads } from './utils/mock-data/campaign-leads';

// Default campaign info
const campaignInfo: CampaignInfo = {
  name: 'Q1 Structured Settlement Buyout',
  totalLeads: 300,
  processedLeads: 0,
  startDate: '2024-01-01',
  endDate: '2024-03-31'
};

export default function RepDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [activeLeadList, setActiveLeadList] = useState<'prospect' | 'hot' | 'warm' | 'active'>('prospect');

  // Lead Management Hook
  const leadManagement = useLeadManagement();

  // Campaign Management Hook
  const campaignManagement = useCampaignManagement();

  // Get current campaign leads based on active lead list
  const getCurrentCampaignLeads = () => {
    return campaignLeads[activeLeadList] || [];
  };

  // Get current campaign info for display
  const getCurrentCampaignInfo = () => {
    const currentLeads = getCurrentCampaignLeads();
    return {
      name: `${activeLeadList.charAt(0).toUpperCase() + activeLeadList.slice(1)} List`,
      totalLeads: currentLeads.length,
      processedLeads: currentLeads.filter(lead => lead.processed).length
    };
  };

  // Shared Data Flow Hook - Connect to Manager Dashboard
  const sharedDataFlow = useSharedDataFlow('rep-1');

  // Template Management Hook
  const templateSystem = useTemplates('Client Relations Rep One');

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Dashboard Header */}
      <DashboardHeader 
        sharedDataFlow={sharedDataFlow}
        leadManagement={leadManagement}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-w-0">
          
            {/* Left Side - Lead List and Campaign Management */}
            <div className="lg:col-span-4 space-y-6 overflow-hidden flex flex-col order-2 lg:order-1 min-w-0">
              {/* Connection Status */}
              <ConnectionStatus
                isConnected={sharedDataFlow.isConnected}
                totalLeads={sharedDataFlow.stats.totalLeads}
                pendingLeads={sharedDataFlow.stats.pendingLeads}
                inProgressLeads={sharedDataFlow.stats.inProgressLeads}
                completedLeads={sharedDataFlow.stats.completedLeads}
              />
              
              {/* Campaign Manager - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:block flex-shrink-0 min-w-0">
                <CampaignManager
                  campaigns={campaignManagement.campaigns}
                  selectedCampaignId={campaignManagement.selectedCampaignId}
                  onCampaignChange={campaignManagement.handleCampaignChange}
                  notifications={campaignManagement.notifications}
                  onNotificationMarkAsRead={campaignManagement.handleNotificationMarkAsRead}
                  onNotificationDismiss={campaignManagement.handleNotificationDismiss}
                  campaignLeads={getCurrentCampaignLeads()}
                  onLeadSelect={leadManagement.handleLeadSelect}
                  selectedLead={leadManagement.selectedLead}
                  activeLeadList={activeLeadList}
                  onLeadListChange={setActiveLeadList}
                />
              </div>
            </div>

            {/* Right Side - Lead Management */}
            <div className="lg:col-span-8 overflow-hidden order-1 lg:order-2 min-w-0">
              <LeadManagement
                selectedLead={leadManagement.selectedLead}
                activeTab={activeTab}
                selectedPhoneNumber={leadManagement.selectedPhoneNumber}
                copiedMessage={leadManagement.copiedMessage}
                onTabChange={(tab: TabType) => setActiveTab(tab)}
                onCopyMessage={leadManagement.handleCopyMessage}
                onGenerateFollowUp={() => {
                  if (leadManagement.selectedLead) {
                    const followUpMessage = leadManagement.generateMessage(leadManagement.selectedLead, leadManagement.selectedPhoneNumber, 'follow-up');
                    leadManagement.setCopiedMessage(followUpMessage);
                  }
                }}
                onMarkComplete={() => leadManagement.selectedLead && leadManagement.markLeadComplete(leadManagement.selectedLead.id)}
                onNextPhoneNumber={leadManagement.handleNextPhoneNumber}
                onPreviousPhoneNumber={leadManagement.handlePreviousPhoneNumber}
                onPhoneNumberSelect={leadManagement.handlePhoneNumberSelect}
                onUpdateStatus={(phoneNumber, newStatus) => {
                  if (leadManagement.selectedLead) {
                    // TODO: Implement phone number status update
                    console.log('Update status:', phoneNumber, newStatus);
                  }
                }}
                onUpdateType={(phoneNumber, newType) => {
                  if (leadManagement.selectedLead) {
                    // TODO: Implement phone number type update
                    console.log('Update type:', phoneNumber, newType);
                  }
                }}
                onUpdateRelationship={(phoneNumber, newRelationship) => {
                  if (leadManagement.selectedLead) {
                    // TODO: Implement phone number relationship update
                    console.log('Update relationship:', phoneNumber, newRelationship);
                  }
                }}
                onUpdateNotes={(phoneNumber, newNotes) => {
                  if (leadManagement.selectedLead) {
                    // TODO: Implement phone number notes update
                    console.log('Update notes:', phoneNumber, newNotes);
                  }
                }}
                onAddPhoneNumber={(newPhoneNumber) => {
                  if (leadManagement.selectedLead) {
                    // TODO: Implement phone number
                    console.log('Add phone number:', newPhoneNumber);
                  }
                }}
                getPhoneStatusColor={getPhoneStatusColor}
                getPhoneStatusTextColor={getPhoneStatusTextColor}
                getPhoneStatusText={getPhoneStatusText}
                getRelationshipText={getRelationshipText}
                getNextStatus={getNextStatus}
                currentLeadProgress={leadManagement.currentLeadIndex + 1}
                totalLeads={leadManagement.leads.length}
                
                // Lead List props
                leads={getCurrentCampaignLeads()}
                onLeadSelect={leadManagement.handleLeadSelect}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
                campaignInfo={getCurrentCampaignInfo()}
                
                // Template system integration
                templates={templateSystem.templates}
                onTemplateSelect={(template, message) => {
                  leadManagement.setCopiedMessage(message);
                  console.log('Template selected:', template.name, 'Message:', message);
                }}
                onRecordMessageSent={(leadId, templateSequence, phoneNumber, message) => {
                  templateSystem.recordMessageSent(leadId, templateSequence, phoneNumber, message);
                  console.log('Message recorded:', { leadId, templateSequence, phoneNumber });
                }}
                getLastTemplateSent={templateSystem.getLastTemplateSent}
                activeLeadList={activeLeadList}
              />
              
              {/* AI Window - Below Lead Management */}
              <AIWindow
                selectedLead={leadManagement.selectedLead}
                selectedPhoneNumber={leadManagement.selectedPhoneNumber}
                activeLeadList={activeLeadList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}