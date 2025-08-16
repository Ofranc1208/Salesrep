'use client';

import React from 'react';
import TabNavigation from '../core-components/TabNavigation';
import TabContent from '../core-components/TabContent';
import { Lead, TabType } from '../../types';
import { MessageTemplate } from '../../../shared/TemplateService';

interface LeadManagementProps {
  selectedLead: Lead | null;
  activeTab: TabType;
  selectedPhoneNumber: string;
  copiedMessage: string;
  onTabChange: (tab: TabType) => void;
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

export default function LeadManagement({
  selectedLead,
  activeTab,
  selectedPhoneNumber,
  copiedMessage,
  onTabChange,
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
}: LeadManagementProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col min-w-0 overflow-hidden">
      <TabNavigation
        activeTab={activeTab}
        onTabChange={onTabChange}
        selectedLeadName={selectedLead?.clientName}
        currentProgress={currentLeadProgress}
        totalLeads={totalLeads}
        activeLeadList={activeLeadList}
      />
      
      <TabContent
        activeTab={activeTab}
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
        leads={leads}
        onLeadSelect={onLeadSelect}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
        campaignInfo={campaignInfo}
        templates={templates}
        onTemplateSelect={onTemplateSelect}
        onRecordMessageSent={onRecordMessageSent}
        getLastTemplateSent={getLastTemplateSent}
        activeLeadList={activeLeadList}
      />
    </div>
  );
}
