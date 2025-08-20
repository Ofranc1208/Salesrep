import { useState, useCallback, useEffect } from 'react';
import { Lead } from '../../../types';
import { LeadOverviewState, LeadOverviewConfig, MessageHistoryItem } from './types';

export interface UseLeadOverviewReturn {
  state: LeadOverviewState;
  config: LeadOverviewConfig;
  messageHistory: MessageHistoryItem[];
  updateConfig: (newConfig: Partial<LeadOverviewConfig>) => void;
  toggleExpanded: () => void;
  setActiveSection: (section: 'templates' | 'notes' | 'history') => void;
  addMessageToHistory: (message: MessageHistoryItem) => void;
  clearMessageHistory: () => void;
}

export function useLeadOverview(
  selectedLead: Lead | null,
  initialConfig?: Partial<LeadOverviewConfig>
): UseLeadOverviewReturn {
  const [state, setState] = useState<LeadOverviewState>({
    isExpanded: false,
    activeSection: 'templates',
    lastInteraction: null
  });

  const [config, setConfig] = useState<LeadOverviewConfig>({
    enableAutoExpand: true,
    defaultSection: 'templates',
    enableQuickActions: true,
    showProgressIndicator: true,
    ...initialConfig
  });

  const [messageHistory, setMessageHistory] = useState<MessageHistoryItem[]>([]);

  const updateConfig = useCallback((newConfig: Partial<LeadOverviewConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const toggleExpanded = useCallback(() => {
    setState(prev => ({
      ...prev,
      isExpanded: !prev.isExpanded,
      lastInteraction: new Date().toISOString()
    }));
  }, []);

  const setActiveSection = useCallback((section: 'templates' | 'notes' | 'history') => {
    setState(prev => ({
      ...prev,
      activeSection: section,
      lastInteraction: new Date().toISOString()
    }));
  }, []);

  const addMessageToHistory = useCallback((message: MessageHistoryItem) => {
    setMessageHistory(prev => [message, ...prev]);
  }, []);

  const clearMessageHistory = useCallback(() => {
    setMessageHistory([]);
  }, []);

  // Auto-expand when lead changes
  useEffect(() => {
    if (selectedLead && config.enableAutoExpand) {
      setState(prev => ({
        ...prev,
        isExpanded: true,
        activeSection: config.defaultSection
      }));
    }
  }, [selectedLead?.id, config.enableAutoExpand, config.defaultSection]);

  // Load message history for selected lead
  useEffect(() => {
    if (selectedLead) {
      // In a real app, this would load from API
      const mockHistory: MessageHistoryItem[] = selectedLead.messageHistory?.map((msg, index) => ({
        id: `msg_${index}`,
        templateId: `template_${index}`,
        templateName: `Template ${index + 1}`,
        phoneNumber: selectedLead.phoneNumbers[0]?.number || '',
        message: msg.message,
        sentAt: msg.sentDate,
        status: msg.status as any,
        response: msg.response || undefined
      })) || [];

      setMessageHistory(mockHistory);
    }
  }, [selectedLead?.id]);

  return {
    state,
    config,
    messageHistory,
    updateConfig,
    toggleExpanded,
    setActiveSection,
    addMessageToHistory,
    clearMessageHistory
  };
}
