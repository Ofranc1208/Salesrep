'use client';

import React from 'react';
import { Lead, TabType } from '../../types';
import { MessageTemplate } from '../../../shared/TemplateService';
import { LeadOverview } from '../lead-management/lead-overview';
import ClientProfile from '../client-profile/ClientProfile';
import { LeadList } from '../lead-management/lead-list';

interface TabContentProps {
  activeTab: TabType;
  selectedLead: Lead | null;
  selectedPhoneNumber: string;
  copiedMessage: string;
  onCopyMessage: () => void;
  onGenerateFollowUp: () => void;
  onMarkComplete: () => void;
  onNextPhoneNumber: () => void;
  onPreviousPhoneNumber: () => void;
  onPhoneNumberSelect: (phoneNumber: string) => void;
  onUpdateStatus: (phoneNumber: string, newStatus: string) => void;
  onUpdateType: (phoneNumber: string, newType: string) => void;
  onUpdateRelationship: (phoneNumber: string, newRelationship: string) => void;
  onUpdateNotes: (phoneNumber: string, newNotes: string) => void;
  onAddPhoneNumber: (phoneNumber: any) => void;
  getPhoneStatusColor: (status: string) => string;
  getPhoneStatusTextColor: (status: string) => string;
  getPhoneStatusText: (status: string) => string;
  getRelationshipText: (relationship: string) => string;
  getNextStatus: (status: string) => string;
  currentLeadProgress?: number;
  totalLeads?: number;
  leads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  campaignInfo: {
    name: string;
    totalLeads: number;
    processedLeads: number;
  };
  templates?: MessageTemplate[];
  onTemplateSelect?: (template: MessageTemplate, message: string) => void;
  onRecordMessageSent?: (leadId: string, templateSequence: number, phoneNumber: string, message: string) => void;
  getLastTemplateSent?: (leadId: string) => number | undefined;
  activeLeadList: 'prospect' | 'hot' | 'warm' | 'active';
}

export default function TabContent({
  activeTab,
  selectedLead,
  selectedPhoneNumber,
  copiedMessage,
  onCopyMessage,
  onGenerateFollowUp,
  onMarkComplete,
  onNextPhoneNumber,
  onPreviousPhoneNumber,
  onPhoneNumberSelect,
  onUpdateStatus,
  onUpdateType,
  onUpdateRelationship,
  onUpdateNotes,
  onAddPhoneNumber,
  getPhoneStatusColor,
  getPhoneStatusTextColor,
  getPhoneStatusText,
  getRelationshipText,
  getNextStatus,
  currentLeadProgress,
  totalLeads,
  leads,
  onLeadSelect,
  getStatusColor,
  getStatusText,
  campaignInfo,
  templates = [],
  onTemplateSelect,
  onRecordMessageSent,
  getLastTemplateSent,
  activeLeadList
}: TabContentProps) {
  if (!selectedLead) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center py-16">
          <div className="text-gray-400 text-8xl mb-6">📋</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Lead Selected</h3>
          <p className="text-lg text-gray-600">Click on a lead from the list to start managing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 min-w-0">
      {activeTab === 'overview' && (
        <LeadOverview
          selectedLead={selectedLead}
          selectedPhoneNumber={selectedPhoneNumber}
          copiedMessage={copiedMessage}
          onCopyMessage={onCopyMessage}
          onGenerateFollowUp={onGenerateFollowUp}
          onMarkComplete={onMarkComplete}
          onNextPhoneNumber={onNextPhoneNumber}
          onPreviousPhoneNumber={onPreviousPhoneNumber}
          onPhoneNumberSelect={onPhoneNumberSelect}
          onUpdateStatus={onUpdateStatus}
          onUpdateType={onUpdateType}
          onUpdateRelationship={onUpdateRelationship}
          onUpdateNotes={onUpdateNotes}
          onAddPhoneNumber={onAddPhoneNumber}
          getPhoneStatusColor={getPhoneStatusColor}
          getPhoneStatusTextColor={getPhoneStatusTextColor}
          getPhoneStatusText={getPhoneStatusText}
          getRelationshipText={getRelationshipText}
          getNextStatus={getNextStatus}
          currentLeadProgress={currentLeadProgress}
          totalLeads={totalLeads}
          templates={templates}
          onTemplateSelect={onTemplateSelect}
          onRecordMessageSent={onRecordMessageSent}
          getLastTemplateSent={getLastTemplateSent}
        />
      )}

      {activeTab === 'client-details' && (
        <ClientProfile 
          leadType={activeLeadList}
          selectedLead={selectedLead}
          selectedPhoneNumber={selectedPhoneNumber}
          onPhoneNumberSelect={onPhoneNumberSelect}
          onUpdateStatus={onUpdateStatus}
          onUpdateType={onUpdateType}
          onUpdateRelationship={onUpdateRelationship}
          onUpdateNotes={onUpdateNotes}
          onAddPhoneNumber={onAddPhoneNumber}
          getPhoneStatusColor={getPhoneStatusColor}
          getPhoneStatusTextColor={getPhoneStatusTextColor}
          getPhoneStatusText={getPhoneStatusText}
          getRelationshipText={getRelationshipText}
          getNextStatus={getNextStatus}
        />
      )}

      {activeTab === 'lead-list' && (
        <LeadList
          leads={leads}
          selectedLead={selectedLead}
          onLeadSelect={onLeadSelect}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
          campaignInfo={campaignInfo}
        />
      )}
    </div>
  );
}
