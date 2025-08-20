'use client';

import React from 'react';
import { Lead } from '../../../../types';
import SpreadsheetProcessor from '../SpreadsheetProcessor';
import DataValidator from '../DataValidator';
import IntakePreview from '../IntakePreview';
import IntakeComplete from './IntakeComplete';

interface IntakeStepRendererProps {
  currentStep: 'upload' | 'validate' | 'preview' | 'complete';
  selectedCampaignId: string;
  processedLeads: Lead[];
  validationResults: any;
  isProcessing: boolean;
  onSpreadsheetUpload: (data: any[]) => void;
  onValidation: () => void;
  onConfirmIntake: () => void;
  onBackToValidation: () => void;
  onProcessMore: () => void;
}

export default function IntakeStepRenderer({
  currentStep,
  selectedCampaignId,
  processedLeads,
  validationResults,
  isProcessing,
  onSpreadsheetUpload,
  onValidation,
  onConfirmIntake,
  onBackToValidation,
  onProcessMore
}: IntakeStepRendererProps) {
  switch (currentStep) {
    case 'upload':
      return (
        <SpreadsheetProcessor
          onDataProcessed={onSpreadsheetUpload}
          isProcessing={isProcessing}
          campaignId={selectedCampaignId}
        />
      );
    
    case 'validate':
      return (
        <DataValidator
          leads={processedLeads}
          onValidationComplete={onValidation}
          validationResults={validationResults}
        />
      );
    
    case 'preview':
      return (
        <IntakePreview
          leads={processedLeads}
          validationResults={validationResults}
          campaignId={selectedCampaignId}
          onConfirm={onConfirmIntake}
          onBack={onBackToValidation}
        />
      );
    
    case 'complete':
      return (
        <IntakeComplete
          leadCount={processedLeads.length}
          onProcessMore={onProcessMore}
        />
      );
    
    default:
      return null;
  }
}
