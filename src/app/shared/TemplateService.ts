/**
 * TemplateService - Manages message templates across Manager and Rep dashboards
 * Templates sync in real-time via BroadcastChannel
 */

import { broadcastService } from './services/BroadcastService';

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  sequence: number; // 1, 2, or 3
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // Manager ID
}

export interface TemplateVariables {
  clientName: string;
  repName: string;
  insuranceCompany: string;
  offerAmount: string;
  monthlyPayment: string;
  startDate: string;
  endDate: string;
  totalValue: string;
  [key: string]: string;
}

class TemplateService {
  private templates: Map<string, MessageTemplate> = new Map();
  private listeners: (() => void)[] = [];

  constructor() {
    this.initializeDefaultTemplates();
    this.setupBroadcastListener();
  }

  /**
   * Initialize with default templates
   */
  private initializeDefaultTemplates(): void {
    const defaultTemplates: MessageTemplate[] = [
      {
        id: 'template-1',
        name: 'Template 1: Initial Contact',
        sequence: 1,
        content: `Hey {{clientName}}, It's {{repName}} with Smarter Payouts. Your {{insuranceCompany}} payments allow you to take advantage of our Early payout program to buy a house, start a business, pay off debt and a lot more. Would you like to see how much you might be entitled to with zero obligation?`,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system'
      },
      {
        id: 'template-2',
        name: 'Template 2: Follow-up',
        sequence: 2,
        content: `Hey {{clientName}}, It's {{repName}} hope all is well. Ins Company {{insuranceCompany}} Early Payout {{offerAmount}}. {{monthlyPayment}} monthly. {{startDate}} till {{endDate}}. Family Protection {{totalValue}}. Hurry offer expires soon. Funding as quick as in 30 days`,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system'
      },
      {
        id: 'template-3',
        name: 'Template 3: Closing',
        sequence: 3,
        content: `Hi {{clientName}}, this is {{repName}} with Smarter Payouts. I wanted to follow up on your {{insuranceCompany}} structured settlement. We can offer you {{offerAmount}} for your future payments. This offer is time-sensitive. Can we schedule a quick call to discuss the details?`,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system'
      }
    ];

    defaultTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  /**
   * Setup broadcast listener for template updates
   */
  private setupBroadcastListener(): void {
    if (typeof window !== 'undefined') {
      broadcastService.subscribe('TEMPLATE_UPDATE', (data: { templates: MessageTemplate[] }) => {
        console.log('TemplateService: Received template update from other tab:', data);
        
        // Update local templates
        this.templates.clear();
        data.templates.forEach(template => {
          this.templates.set(template.id, template);
        });
        
        // Notify listeners
        this.notifyListeners();
      });
    }
  }

  /**
   * Get all templates
   */
  getAllTemplates(): MessageTemplate[] {
    return Array.from(this.templates.values()).sort((a, b) => a.sequence - b.sequence);
  }

  /**
   * Get template by sequence number
   */
  getTemplateBySequence(sequence: number): MessageTemplate | undefined {
    return Array.from(this.templates.values()).find(t => t.sequence === sequence);
  }

  /**
   * Update template (Manager only)
   */
  updateTemplate(templateId: string, updates: Partial<MessageTemplate>): void {
    const existing = this.templates.get(templateId);
    if (!existing) {
      throw new Error(`Template ${templateId} not found`);
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };

    this.templates.set(templateId, updated);
    console.log('TemplateService: Template updated', { templateId, updated });

    // Broadcast to other tabs
    this.broadcastTemplates();
    
    // Notify local listeners
    this.notifyListeners();
  }

  /**
   * Generate message from template with variables
   */
  generateMessage(templateId: string, variables: TemplateVariables): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    let message = template.content;

    // Replace all variables
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      message = message.replace(new RegExp(placeholder, 'g'), value);
    });

    console.log('TemplateService: Message generated', { templateId, variables, message });
    return message;
  }

  /**
   * Get suggested next template based on last sent
   */
  getSuggestedNextTemplate(lastTemplateSent?: number): number {
    if (!lastTemplateSent) return 1;
    if (lastTemplateSent === 1) return 2;
    if (lastTemplateSent === 2) return 3;
    return 1; // Loop back to beginning
  }

  /**
   * Broadcast templates to other tabs
   */
  private broadcastTemplates(): void {
    const templates = this.getAllTemplates();
    broadcastService.broadcast('TEMPLATE_UPDATE', { templates });
  }

  /**
   * Subscribe to template changes
   */
  subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('TemplateService: Error in listener:', error);
      }
    });
  }
}

// Create singleton instance
export const templateService = new TemplateService();
export default templateService;
