import { Lead, TabType } from '../../../types';
import { MessageTemplate } from '../../../../shared/TemplateService';

export interface LeadManagementProps {
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

export interface LeadManagementState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: string;
}

export interface LeadManagementConfig {
  enableAutoSave: boolean;
  autoSaveInterval: number;
  enableNotifications: boolean;
  defaultTab: TabType;
}
