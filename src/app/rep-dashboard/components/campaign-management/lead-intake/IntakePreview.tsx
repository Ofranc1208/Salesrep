// REFACTORED: Intake Preview - Now uses small, focused components
// Components: PreviewHeader, LeadTable, LeadDetailModal, PreviewActions

'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import { ValidationResult } from './hooks';
import { PreviewHeader, LeadTable, LeadDetailModal, PreviewActions } from './preview';

interface IntakePreviewProps {
  leads: Lead[];
  validationResults: ValidationResult;
  campaignId: string;
  onConfirm: () => void;
  onBack: () => void;
}

/**
 * IntakePreview - Orchestrates preview components for lead intake
 * Uses: PreviewHeader + LeadTable + LeadDetailModal + PreviewActions
 */
export default function IntakePreview({
  leads,
  validationResults,
  campaignId,
  onConfirm,
  onBack
}: IntakePreviewProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { validLeads } = validationResults;

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleModalClose = () => {
    setSelectedLead(null);
  };

  return (
    <div className="space-y-6">
      <PreviewHeader 
        validLeadCount={validLeads.length} 
        campaignId={campaignId} 
      />

      <LeadTable 
        validLeads={validLeads} 
        onLeadSelect={handleLeadSelect} 
      />

      <LeadDetailModal 
        selectedLead={selectedLead} 
        onClose={handleModalClose} 
      />

      <PreviewActions 
        validLeadCount={validLeads.length}
        campaignId={campaignId}
        onBack={onBack}
        onConfirm={onConfirm}
      />
    </div>
  );
}
