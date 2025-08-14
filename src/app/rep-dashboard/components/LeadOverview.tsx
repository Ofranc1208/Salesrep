'use client';

import React from 'react';
import MessageGeneration from './MessageGeneration';
import PhoneNumberManagement from './PhoneNumberManagement';
import { Lead } from '../types';

interface LeadOverviewProps {
  selectedLead: Lead;
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
}

export default function LeadOverview({
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
  totalLeads
}: LeadOverviewProps) {
  const hasMultipleNumbers = selectedLead.phoneNumbers.length > 1;
  const currentNumberIndex = selectedLead.phoneNumbers.findIndex((p) => p.number === selectedPhoneNumber);

  return (
    <div className="space-y-6">
      {/* Message Generation */}
      {selectedPhoneNumber && (
        <MessageGeneration
          selectedPhoneNumber={selectedPhoneNumber}
          copiedMessage={copiedMessage}
          onCopyMessage={onCopyMessage}
          onGenerateFollowUp={onGenerateFollowUp}
          onMarkComplete={onMarkComplete}
          onNextPhoneNumber={onNextPhoneNumber}
          onPreviousPhoneNumber={onPreviousPhoneNumber}
          hasMultipleNumbers={hasMultipleNumbers}
          currentNumberIndex={currentNumberIndex}
          totalNumbers={selectedLead.phoneNumbers.length}
          currentLeadProgress={currentLeadProgress}
          totalLeads={totalLeads}
        />
      )}

      {/* Phone Number Management */}
      <PhoneNumberManagement
        phoneNumbers={selectedLead.phoneNumbers}
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
    </div>
  );
}
