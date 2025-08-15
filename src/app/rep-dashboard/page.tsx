'use client';

import React, { useState } from 'react';
import LeadManagement from './components/LeadManagement';
import CampaignManager from './components/CampaignManager';
import { useLeadManagement } from './hooks/useLeadManagement';
import { useCampaignManagement } from './hooks/useCampaignManagement';
import { useTemplates } from './hooks/useTemplates';
import { getStatusColor, getStatusText, getPhoneStatusColor, getPhoneStatusTextColor, getPhoneStatusText, getRelationshipText, getNextStatus } from './utils/status-helpers';
import { useSharedDataFlow } from './hooks/useSharedDataFlow';
import ConnectionStatus from './components/ConnectionStatus';
import AIWindow from './components/AIWindow';
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
  // Use 'rep-1' to match the Manager Dashboard's rep ID system
  const sharedDataFlow = useSharedDataFlow('rep-1');

  // Template Management Hook
  const templateSystem = useTemplates('Client Relations Rep One');

  // Get current campaign info
  const currentCampaignInfo = campaignManagement.campaigns.find(c => c.id === campaignManagement.selectedCampaignId) || campaignInfo;

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Responsive Header - Optimized for 27" Monitor & Laptops */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Sales Rep Dashboard</h1>
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-1 lg:mt-2">
                  <p className="text-sm lg:text-base text-gray-600">Welcome, <span className="font-semibold text-gray-900">Client Relations Rep One</span></p>
                  <span className="hidden lg:block text-gray-300">•</span>
                  <p className="text-sm lg:text-base text-blue-600 font-semibold">Structured Settlement Buyouts</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="grid grid-cols-3 gap-4 lg:gap-6 text-center">
                <div>
                  <div className="text-xs lg:text-sm text-gray-500">Pending</div>
                  <div className="text-lg lg:text-2xl font-bold text-orange-600">
                    {sharedDataFlow.isConnected ? sharedDataFlow.stats.pendingLeads : leadManagement.leads.filter(l => l.status === 'pending').length}
                  </div>
                </div>
                <div>
                  <div className="text-xs lg:text-sm text-gray-500">In Progress</div>
                  <div className="text-lg lg:text-2xl font-bold text-blue-600">
                    {sharedDataFlow.isConnected ? sharedDataFlow.stats.inProgressLeads : leadManagement.leads.filter(l => l.status === 'in-progress').length}
                  </div>
                </div>
                <div>
                  <div className="text-xs lg:text-sm text-gray-500">Completed</div>
                  <div className="text-lg lg:text-2xl font-bold text-green-600">
                    {sharedDataFlow.isConnected ? sharedDataFlow.stats.completedLeads : leadManagement.leads.filter(l => l.processed).length}
                  </div>
                </div>
              </div>
              <a 
                href="/manager-dashboard" 
                className="px-4 py-2 lg:px-6 lg:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm lg:text-base font-semibold shadow-sm"
              >
                Manager Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-w-0">
          
          {/* Left Side - Lead List and Campaign Management */}
          <div className="lg:col-span-5 space-y-6 overflow-hidden flex flex-col order-2 lg:order-1 min-w-0">
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
          <div className="lg:col-span-7 overflow-hidden order-1 lg:order-2 min-w-0">
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