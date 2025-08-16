'use client';

import React from 'react';
import { Lead } from '../../../types';
import { SectionKey, ExpandedSections } from '../types';
import { CollapsibleCard } from '../shared';
import { ClientProfileNotesCard } from '../notes';
import { MessageHistoryCard } from '../message-history';
import CashAdvanceCard from '../cash-advance/CashAdvanceCard';

interface RightColumnProps {
  selectedLead: Lead;
  notes: any[];
  expandedSections: ExpandedSections;
  visibleSections: string[];
  toggleSection: (section: SectionKey) => void;
  onAddActivity: (activity: { type: string; content: string }) => void;
}

const RightColumn: React.FC<RightColumnProps> = ({
  selectedLead,
  notes,
  expandedSections,
  visibleSections,
  toggleSection,
  onAddActivity
}) => {
  return (
    <div className="space-y-6">
      {/* Activity Log Card */}
      <CollapsibleCard
        title="Activity Log"
        subtitle="Lead History"
        isExpanded={expandedSections.notes}
        onToggle={() => toggleSection('notes')}
        isDisabled={!visibleSections.includes('notes')}
        disabledMessage="Available in all lead stages"
      >
        <ClientProfileNotesCard notes={notes} onAddActivity={onAddActivity} />
      </CollapsibleCard>

      {/* Message History Card */}
      <CollapsibleCard
        title="Message History"
        subtitle="Communication Log"
        isExpanded={expandedSections.messageHistory}
        onToggle={() => toggleSection('messageHistory')}
        isDisabled={!visibleSections.includes('messageHistory')}
        disabledMessage="Available in Hot, Warm, and Active leads"
      >
        <MessageHistoryCard selectedLead={selectedLead} />
      </CollapsibleCard>

      {/* Cash Advance Card */}
      <CollapsibleCard
        title="Cash Advance"
        subtitle="Request & History"
        isExpanded={expandedSections.cashAdvance}
        onToggle={() => toggleSection('cashAdvance')}
        isDisabled={!visibleSections.includes('cashAdvance')}
        disabledMessage="Available in Active leads only"
      >
        <CashAdvanceCard />
      </CollapsibleCard>
    </div>
  );
};

export default RightColumn;
