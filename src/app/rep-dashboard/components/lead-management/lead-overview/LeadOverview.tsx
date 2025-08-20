'use client';

import React from 'react';
import TemplateSelector from '../../template-system/TemplateSelector';
import { Lead } from '../../../types';
import { MessageTemplate } from '../../../../shared/TemplateService';

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

  // Template system props
  templates?: MessageTemplate[];
  onTemplateSelect?: (template: MessageTemplate, message: string) => void;
  onRecordMessageSent?: (leadId: string, templateSequence: number, phoneNumber: string, message: string) => void;
  getLastTemplateSent?: (leadId: string) => number | undefined;
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
  totalLeads,
  templates = [],
  onTemplateSelect,
  onRecordMessageSent,
  getLastTemplateSent
}: LeadOverviewProps) {
  const hasMultipleNumbers = selectedLead.phoneNumbers.length > 1;
  const currentNumberIndex = selectedLead.phoneNumbers.findIndex((p) => p.number === selectedPhoneNumber);

  return (
    <div className="space-y-3">
      {/* Message Templates */}
      {selectedPhoneNumber && (
        <TemplateSelector
          lead={selectedLead}
          phoneNumber={selectedPhoneNumber}
          templates={templates}
          lastTemplateSent={getLastTemplateSent ? getLastTemplateSent(selectedLead.id) : undefined}
          onTemplateSelect={(template, message) => {
            if (onTemplateSelect) {
              onTemplateSelect(template, message);
            }
          }}
          onCopyMessage={onCopyMessage}
          copiedMessage={copiedMessage}
        />
      )}


    </div>
  );
}
