'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import { useLeadIntake } from './hooks';
import { IntakeProgressBar, IntakeStepRenderer } from './workflow';

interface LeadIntakeManagerProps {
  selectedCampaignId: string;
  onLeadsProcessed: (leads: Lead[], campaignId: string) => void;
  onError: (error: string) => void;
}

export default function LeadIntakeManager({
  selectedCampaignId,
  onLeadsProcessed,
  onError
}: LeadIntakeManagerProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'validate' | 'preview' | 'complete'>('upload');
  const [rawData, setRawData] = useState<any[]>([]);
  const [processedLeads, setProcessedLeads] = useState<Lead[]>([]);
  const [validationResults, setValidationResults] = useState<any>(null);

  const { 
    processSpreadsheet, 
    validateLeads, 
    enrichLeadData,
    isProcessing 
  } = useLeadIntake();

  const handleSpreadsheetUpload = async (data: any[]) => {
    try {
      setRawData(data);
      setCurrentStep('validate');
      
      // Process raw spreadsheet data into Lead format
      const processed = await processSpreadsheet(data, selectedCampaignId);
      setProcessedLeads(processed);
      
    } catch (error) {
      onError(`Failed to process spreadsheet: ${error}`);
    }
  };

  const handleValidation = async () => {
    try {
      const results = await validateLeads(processedLeads);
      setValidationResults(results);
      
      if (results.isValid) {
        setCurrentStep('preview');
      } else {
        onError(`Validation failed: ${results.errors.join(', ')}`);
      }
    } catch (error) {
      onError(`Validation error: ${error}`);
    }
  };

  const handleConfirmIntake = async () => {
    try {
      // Enrich leads with additional data structure
      const enrichedLeads = await Promise.all(
        processedLeads.map(lead => enrichLeadData(lead))
      );
      
      setCurrentStep('complete');
      onLeadsProcessed(enrichedLeads, selectedCampaignId);
      
    } catch (error) {
      onError(`Failed to complete intake: ${error}`);
    }
  };

  const handleProcessMore = () => {
    setCurrentStep('upload');
    setRawData([]);
    setProcessedLeads([]);
    setValidationResults(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <IntakeProgressBar 
        currentStep={currentStep} 
        selectedCampaignId={selectedCampaignId} 
      />

      <IntakeStepRenderer
        currentStep={currentStep}
        selectedCampaignId={selectedCampaignId}
        processedLeads={processedLeads}
        validationResults={validationResults}
        isProcessing={isProcessing}
        onSpreadsheetUpload={handleSpreadsheetUpload}
        onValidation={handleValidation}
        onConfirmIntake={handleConfirmIntake}
        onBackToValidation={() => setCurrentStep('validate')}
        onProcessMore={handleProcessMore}
      />
    </div>
  );
}