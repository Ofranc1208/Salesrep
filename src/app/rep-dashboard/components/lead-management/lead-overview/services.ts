import { Lead } from '../../../types';
import { MessageTemplate } from '../../../../shared/TemplateService';
import { MessageHistoryItem } from './types';

export class LeadOverviewService {
  /**
   * Get message history for a lead
   */
  static async getMessageHistory(leadId: string): Promise<MessageHistoryItem[]> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - in real app, this would come from API
      return [
        {
          id: 'msg_1',
          templateId: 'template_1',
          templateName: 'Initial Contact',
          phoneNumber: '(555) 123-4567',
          message: 'Hi John, this is regarding your structured settlement...',
          sentAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'delivered',
          response: 'Thanks for reaching out. I\'m interested.',
          responseAt: new Date(Date.now() - 82800000).toISOString() // 23 hours ago
        },
        {
          id: 'msg_2',
          templateId: 'template_2',
          templateName: 'Follow-up',
          phoneNumber: '(555) 123-4567',
          message: 'Great! I\'d like to schedule a call to discuss your options...',
          sentAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          status: 'read'
        }
      ];
    } catch (error) {
      console.error('Failed to load message history:', error);
      return [];
    }
  }

  /**
   * Send a message using a template
   */
  static async sendMessage(
    leadId: string,
    phoneNumber: string,
    template: MessageTemplate,
    customMessage?: string
  ): Promise<MessageHistoryItem> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const message: MessageHistoryItem = {
        id: `msg_${Date.now()}`,
        templateId: template.id,
        templateName: template.name,
        phoneNumber,
        message: customMessage || template.content,
        sentAt: new Date().toISOString(),
        status: 'sent'
      };

      // In real app, this would make API call to send SMS
      console.log('Sending message:', message);
      
      return message;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Mark message as read
   */
  static async markMessageAsRead(messageId: string): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log('Marked message as read:', messageId);
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      throw error;
    }
  }

  /**
   * Get suggested templates for a lead
   */
  static getSuggestedTemplates(lead: Lead, templates: MessageTemplate[]): MessageTemplate[] {
    // Simple logic to suggest templates based on lead status
    const suggestions = templates.filter(template => {
      if (lead.processed) {
        return template.category === 'follow-up' || template.category === 'closing';
      } else {
        return template.category === 'initial' || template.category === 'introduction';
      }
    });

    return suggestions.slice(0, 3); // Return top 3 suggestions
  }

  /**
   * Generate personalized message from template
   */
  static personalizeMessage(template: MessageTemplate, lead: Lead): string {
    let message = template.content;

    // Replace placeholders with lead data
    const replacements = {
      '{clientName}': lead.clientName,
      '{firstName}': lead.clientName.split(' ')[0],
      '{paymentAmount}': lead.payment,
      '{insuranceCompany}': lead.insuranceCompany,
      '{crmId}': lead.crmId
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      message = message.replace(new RegExp(placeholder, 'g'), value);
    });

    return message;
  }

  /**
   * Validate message before sending
   */
  static validateMessage(message: string, phoneNumber: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!message || message.trim().length === 0) {
      errors.push('Message cannot be empty');
    }

    if (message.length > 1600) {
      errors.push('Message is too long (max 1600 characters)');
    }

    if (!phoneNumber || phoneNumber.trim().length === 0) {
      errors.push('Phone number is required');
    }

    // Basic phone number validation
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      errors.push('Invalid phone number format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Export message history to CSV
   */
  static exportMessageHistory(history: MessageHistoryItem[]): string {
    const headers = [
      'Date/Time',
      'Phone Number',
      'Template',
      'Message',
      'Status',
      'Response',
      'Response Time'
    ];

    const rows = history.map(item => [
      new Date(item.sentAt).toLocaleString(),
      item.phoneNumber,
      item.templateName,
      item.message.replace(/"/g, '""'), // Escape quotes
      item.status,
      item.response || '',
      item.responseAt ? new Date(item.responseAt).toLocaleString() : ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }
}
