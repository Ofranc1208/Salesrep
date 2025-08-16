'use client';

import React from 'react';
import { SectionKey, ExpandedSections } from '../types';
import { CollapsibleCard } from '../shared';
import { AnnuityCard } from '../annuity-info';
import { OfferCard } from '../offer-info';
import SettlementSummaryCard from '../settlement-summary/SettlementSummaryCard';

interface MiddleColumnProps {
  annuityData: any;
  offerData: any;
  expandedSections: ExpandedSections;
  visibleSections: string[];
  toggleSection: (section: SectionKey) => void;
}

const MiddleColumn: React.FC<MiddleColumnProps> = ({
  annuityData,
  offerData,
  expandedSections,
  visibleSections,
  toggleSection
}) => {
  return (
    <div className="space-y-6">
      {/* Annuity Card */}
      <CollapsibleCard
        title="Annuity Info"
        subtitle="Monthly Payment"
        isExpanded={expandedSections.annuity}
        onToggle={() => toggleSection('annuity')}
        isDisabled={!visibleSections.includes('annuity')}
        disabledMessage="Available in Hot, Warm, and Active leads"
      >
        <AnnuityCard annuityData={annuityData} />
      </CollapsibleCard>

      {/* Offer Card */}
      <CollapsibleCard
        title="Offer"
        subtitle="Lump Sum Details"
        isExpanded={expandedSections.offer}
        onToggle={() => toggleSection('offer')}
        isDisabled={!visibleSections.includes('offer')}
        disabledMessage="Available in Warm and Active leads"
      >
        <OfferCard offerData={offerData} />
      </CollapsibleCard>

      {/* Settlement Summary Card */}
      <CollapsibleCard
        title="Settlement Summary"
        subtitle="Payment Overview"
        isExpanded={expandedSections.settlementSummary}
        onToggle={() => toggleSection('settlementSummary')}
        isDisabled={!visibleSections.includes('settlementSummary')}
        disabledMessage="Available in Active leads only"
      >
        <SettlementSummaryCard />
      </CollapsibleCard>
    </div>
  );
};

export default MiddleColumn;
