import { useState, useEffect, useCallback } from 'react';
import { templateService, MessageTemplate, TemplateVariables } from '../../shared/TemplateService';
import { Lead } from '../types';

export interface MessageHistory {
  leadId: string;
  templateSequence: number;
  sentAt: Date;
  phoneNumber: string;
  message: string;
}

export const useTemplates = (repName: string = 'Scott') => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [messageHistory, setMessageHistory] = useState<MessageHistory[]>([]);
  const [loading, setLoading] = useState(false);

  // Load templates on mount and subscribe to changes
  useEffect(() => {
    // Initial load
    setTemplates(templateService.getAllTemplates());

    // Subscribe to template updates
    const unsubscribe = templateService.subscribe(() => {
      setTemplates(templateService.getAllTemplates());
    });

    return unsubscribe;
  }, []);

  /**
   * Generate message from template for a specific lead
   */
  const generateMessage = useCallback((templateId: string, lead: Lead, phoneNumber: string): string => {
    const variables: TemplateVariables = {
      clientName: lead.clientName,
      repName: repName,
      insuranceCompany: lead.insuranceCompany,
      offerAmount: lead.structuredSettlementDetails?.offerAmount || 'competitive offer',
      monthlyPayment: lead.structuredSettlementDetails?.monthlyPayment || lead.payment,
      startDate: lead.structuredSettlementDetails?.startDate || lead.startDate,
      endDate: lead.structuredSettlementDetails?.endDate || lead.insuranceCompany,
      totalValue: lead.structuredSettlementDetails?.totalValue || lead.payment
    };

    return templateService.generateMessage(templateId, variables);
  }, [repName]);

  /**
   * Get the last template sent to a specific lead
   */
  const getLastTemplateSent = useCallback((leadId: string): number | undefined => {
    const leadHistory = messageHistory
      .filter(h => h.leadId === leadId)
      .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
    
    return leadHistory[0]?.templateSequence;
  }, [messageHistory]);

  /**
   * Get suggested next template for a lead
   */
  const getSuggestedTemplate = useCallback((leadId: string): number => {
    const lastSent = getLastTemplateSent(leadId);
    return templateService.getSuggestedNextTemplate(lastSent);
  }, [getLastTemplateSent]);

  /**
   * Record that a message was sent
   */
  const recordMessageSent = useCallback((
    leadId: string,
    templateSequence: number,
    phoneNumber: string,
    message: string
  ) => {
    const history: MessageHistory = {
      leadId,
      templateSequence,
      sentAt: new Date(),
      phoneNumber,
      message
    };

    setMessageHistory(prev => [...prev, history]);
    console.log('Message recorded:', history);
  }, []);

  /**
   * Get message history for a specific lead
   */
  const getLeadMessageHistory = useCallback((leadId: string): MessageHistory[] => {
    return messageHistory
      .filter(h => h.leadId === leadId)
      .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  }, [messageHistory]);

  /**
   * Get template by sequence number
   */
  const getTemplateBySequence = useCallback((sequence: number): MessageTemplate | undefined => {
    return templates.find(t => t.sequence === sequence);
  }, [templates]);

  /**
   * Check if a template sequence is available
   */
  const isTemplateAvailable = useCallback((sequence: number): boolean => {
    return templates.some(t => t.sequence === sequence);
  }, [templates]);

  return {
    templates,
    messageHistory,
    loading,
    
    // Template operations
    generateMessage,
    getTemplateBySequence,
    isTemplateAvailable,
    
    // Message tracking
    getLastTemplateSent,
    getSuggestedTemplate,
    recordMessageSent,
    getLeadMessageHistory
  };
};
