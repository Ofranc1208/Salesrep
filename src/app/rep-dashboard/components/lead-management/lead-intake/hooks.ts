import { useState, useCallback } from 'react';
import { Lead, PhoneNumber } from '../../../types';
import { leadIntakeService } from './services';

export interface UseLeadIntakeReturn {
  processSpreadsheet: (data: any[]) => Promise<Lead[]>;
  validateLeads: (leads: Lead[]) => Promise<ValidationResult>;
  enrichLeadData: (lead: Lead) => Promise<Lead>;
  isProcessing: boolean;
  error: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validLeads: Lead[];
  invalidLeads: any[];
}

export function useLeadIntake(): UseLeadIntakeReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processSpreadsheet = useCallback(async (data: any[]): Promise<Lead[]> => {
    setIsProcessing(true);
    setError(null);

    try {
      const leads = await leadIntakeService.processSpreadsheetData(data);
      return leads;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const validateLeads = useCallback(async (leads: Lead[]): Promise<ValidationResult> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await leadIntakeService.validateLeads(leads);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Validation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const enrichLeadData = useCallback(async (lead: Lead): Promise<Lead> => {
    try {
      const enrichedLead = await leadIntakeService.enrichLeadData(lead);
      return enrichedLead;
    } catch (err) {
      console.warn('Lead enrichment failed:', err);
      // Return original lead if enrichment fails
      return lead;
    }
  }, []);

  return {
    processSpreadsheet,
    validateLeads,
    enrichLeadData,
    isProcessing,
    error
  };
}
