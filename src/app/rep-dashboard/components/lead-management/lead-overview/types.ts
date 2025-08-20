import { Lead } from '../../../types';
import { MessageTemplate } from '../../../../shared/TemplateService';

export interface LeadOverviewProps {
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
  templates?: MessageTemplate[];
  onTemplateSelect?: (template: MessageTemplate, message: string) => void;
  onRecordMessageSent?: (leadId: string, templateSequence: number, phoneNumber: string, message: string) => void;
  getLastTemplateSent?: (leadId: string) => number | undefined;
}

export interface LeadOverviewState {
  isExpanded: boolean;
  activeSection: 'templates' | 'notes' | 'history';
  lastInteraction: string | null;
}

export interface LeadOverviewConfig {
  enableAutoExpand: boolean;
  defaultSection: 'templates' | 'notes' | 'history';
  enableQuickActions: boolean;
  showProgressIndicator: boolean;
}

export interface MessageHistoryItem {
  id: string;
  templateId: string;
  templateName: string;
  phoneNumber: string;
  message: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  response?: string;
  responseAt?: string;
}
