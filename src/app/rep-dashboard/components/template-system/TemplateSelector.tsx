'use client';

import React, { useState } from 'react';
import { Lead } from '../../types';
import { MessageTemplate } from '../../../shared/TemplateService';
import { generateMessage, getSuggestedTemplate } from '../../utils/message-generator';
import TemplateHeader from './TemplateHeader';
import AISuggestion from './AISuggestion';
import TemplateGrid from './TemplateGrid';
import MessagePreview from './MessagePreview';

interface TemplateSelectorProps {
  lead: Lead;
  phoneNumber: string;
  templates: MessageTemplate[];
  lastTemplateSent?: number;
  onTemplateSelect: (template: MessageTemplate, generatedMessage: string) => void;
  onCopyMessage: () => void;
  copiedMessage: string;
}

export default function TemplateSelector({
  lead,
  phoneNumber,
  templates,
  lastTemplateSent,
  onTemplateSelect,
  onCopyMessage,
  copiedMessage
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  // Mock templates for now - will come from manager dashboard
  const mockTemplates: MessageTemplate[] = [
    {
      id: '1',
      name: 'Template 1: Initial Contact',
      sequence: 1,
      content: `Hey {{clientName}}, It's {{repName}} with Smarter Payouts. Your {{insuranceCompany}} payments allow you to take advantage of our Early payout program to buy a house, start a business, pay off debt and a lot more. Would you like to see how much you might be entitled to with zero obligation?`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'system'
    },
    {
      id: '2', 
      name: 'Template 2: Follow-up',
      sequence: 2,
      content: `Hey {{clientName}}, It's {{repName}} hope all is well. Ins Company {{insuranceCompany}} Early Payout {{offerAmount}}. {{monthlyPayment}} monthly. {{startDate}} till {{endDate}}. Family Protection {{totalValue}}. Hurry offer expires soon. Funding as quick as in 30 days`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'system'
    },
    {
      id: '3',
      name: 'Template 3: Closing',
      sequence: 3,
      content: `Hi {{clientName}}, this is {{repName}} with Smarter Payouts. I wanted to follow up on your {{insuranceCompany}} structured settlement. We can offer you {{offerAmount}} for your future payments. This offer is time-sensitive. Can we schedule a quick call to discuss the details?`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'system'
    }
  ];

  const activeTemplates = templates.length > 0 ? templates : mockTemplates;
  const suggestedNext = getSuggestedTemplate(lastTemplateSent);

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    const generatedMessage = generateMessage(template, lead);
    onTemplateSelect(template, generatedMessage);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <TemplateHeader phoneNumber={phoneNumber} />
      
      <AISuggestion suggestedNext={suggestedNext} lastTemplateSent={lastTemplateSent} />
      
      <TemplateGrid
        templates={activeTemplates}
        selectedTemplate={selectedTemplate}
        suggestedNext={suggestedNext}
        onTemplateSelect={handleTemplateSelect}
      />

      {selectedTemplate && (
        <MessagePreview
          selectedTemplate={selectedTemplate}
          copiedMessage={copiedMessage}
          onCopyMessage={onCopyMessage}
        />
      )}
    </div>
  );
}
