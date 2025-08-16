import { Lead } from '../types';
import { MessageTemplate } from '../../shared/TemplateService';

export const generateMessage = (template: MessageTemplate, lead: Lead): string => {
  const details = lead.structuredSettlementDetails;
  
  return template.content
    .replace(/\{\{clientName\}\}/g, lead.clientName)
    .replace(/\{\{repName\}\}/g, 'Scott') // Will come from user context
    .replace(/\{\{insuranceCompany\}\}/g, lead.insuranceCompany)
    .replace(/\{\{offerAmount\}\}/g, details?.offerAmount || 'competitive offer')
    .replace(/\{\{monthlyPayment\}\}/g, details?.monthlyPayment || lead.payment)
    .replace(/\{\{startDate\}\}/g, details?.startDate || lead.startDate)
    .replace(/\{\{endDate\}\}/g, details?.endDate || lead.insuranceCompany)
    .replace(/\{\{totalValue\}\}/g, details?.totalValue || lead.payment);
};

export const getSuggestedTemplate = (lastTemplateSent?: number): number => {
  if (!lastTemplateSent) return 1;
  if (lastTemplateSent === 1) return 2;
  if (lastTemplateSent === 2) return 3;
  return 1; // Loop back to beginning
};
