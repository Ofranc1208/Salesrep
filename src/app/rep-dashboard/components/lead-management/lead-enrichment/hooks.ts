import { useState, useCallback, useEffect } from 'react';
import { Lead } from '../../../types';

export interface EnrichmentHistoryEntry {
  id: string;
  leadId: string;
  leadName: string;
  timestamp: string;
  enrichedBy: string;
  fieldsUpdated: string[];
  previousValues: Record<string, any>;
  newValues: Record<string, any>;
}

export interface UseLeadEnrichmentReturn {
  enrichmentQueue: Lead[];
  enrichmentHistory: EnrichmentHistoryEntry[];
  addToQueue: (lead: Lead) => void;
  removeFromQueue: (leadId: string) => void;
  enrichLead: (lead: Lead, updates: Record<string, any>) => Promise<Lead>;
  bulkEnrichment: (leads: Lead[], updates: Record<string, any>) => Promise<Lead[]>;
  isEnriching: boolean;
  error: string | null;
}

export function useLeadEnrichment(leads: Lead[]): UseLeadEnrichmentReturn {
  const [enrichmentQueue, setEnrichmentQueue] = useState<Lead[]>([]);
  const [enrichmentHistory, setEnrichmentHistory] = useState<EnrichmentHistoryEntry[]>([]);
  const [isEnriching, setIsEnriching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-populate queue with leads that need enrichment
  useEffect(() => {
    const leadsNeedingEnrichment = leads.filter(lead => 
      lead.clientInfo?.ssn === 'Not Available' ||
      lead.clientInfo?.dateOfBirth === 'Not Available' ||
      lead.structuredSettlement.monthlyPayment === 'Not Available' ||
      !lead.phoneNumbers.some(p => p.number !== 'Not Available')
    );
    
    // Only add leads that aren't already in the queue
    const newLeads = leadsNeedingEnrichment.filter(lead => 
      !enrichmentQueue.some(queuedLead => queuedLead.id === lead.id)
    );
    
    if (newLeads.length > 0) {
      setEnrichmentQueue(prev => [...prev, ...newLeads]);
    }
  }, [leads, enrichmentQueue]);

  const addToQueue = useCallback((lead: Lead) => {
    setEnrichmentQueue(prev => {
      if (prev.some(queuedLead => queuedLead.id === lead.id)) {
        return prev; // Already in queue
      }
      return [...prev, lead];
    });
  }, []);

  const removeFromQueue = useCallback((leadId: string) => {
    setEnrichmentQueue(prev => prev.filter(lead => lead.id !== leadId));
  }, []);

  const enrichLead = useCallback(async (lead: Lead, updates: Record<string, any>): Promise<Lead> => {
    setIsEnriching(true);
    setError(null);

    try {
      // Create enrichment history entry
      const historyEntry: EnrichmentHistoryEntry = {
        id: `enrichment_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        leadId: lead.id,
        leadName: lead.clientName,
        timestamp: new Date().toISOString(),
        enrichedBy: 'Rep 1', // Current user
        fieldsUpdated: Object.keys(updates),
        previousValues: extractCurrentValues(lead, Object.keys(updates)),
        newValues: updates
      };

      // Apply updates to lead
      const enrichedLead = applyUpdatesToLead(lead, updates);

      // Add to history
      setEnrichmentHistory(prev => [historyEntry, ...prev]);

      return enrichedLead;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Enrichment failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsEnriching(false);
    }
  }, []);

  const bulkEnrichment = useCallback(async (leads: Lead[], updates: Record<string, any>): Promise<Lead[]> => {
    setIsEnriching(true);
    setError(null);

    try {
      const enrichedLeads: Lead[] = [];
      const historyEntries: EnrichmentHistoryEntry[] = [];

      for (const lead of leads) {
        // Create history entry for each lead
        const historyEntry: EnrichmentHistoryEntry = {
          id: `bulk_enrichment_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          leadId: lead.id,
          leadName: lead.clientName,
          timestamp: new Date().toISOString(),
          enrichedBy: 'Rep 1', // Current user
          fieldsUpdated: Object.keys(updates),
          previousValues: extractCurrentValues(lead, Object.keys(updates)),
          newValues: updates
        };

        // Apply updates
        const enrichedLead = applyUpdatesToLead(lead, updates);
        
        enrichedLeads.push(enrichedLead);
        historyEntries.push(historyEntry);
      }

      // Add all history entries
      setEnrichmentHistory(prev => [...historyEntries, ...prev]);

      // Remove enriched leads from queue
      const enrichedLeadIds = new Set(enrichedLeads.map(lead => lead.id));
      setEnrichmentQueue(prev => prev.filter(lead => !enrichedLeadIds.has(lead.id)));

      return enrichedLeads;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bulk enrichment failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsEnriching(false);
    }
  }, []);

  return {
    enrichmentQueue,
    enrichmentHistory,
    addToQueue,
    removeFromQueue,
    enrichLead,
    bulkEnrichment,
    isEnriching,
    error
  };
}

/**
 * Extract current values from lead for the specified fields
 */
function extractCurrentValues(lead: Lead, fields: string[]): Record<string, any> {
  const currentValues: Record<string, any> = {};
  
  for (const field of fields) {
    if (field in lead) {
      currentValues[field] = (lead as any)[field];
    } else if (field.startsWith('clientInfo.')) {
      const subField = field.replace('clientInfo.', '');
      currentValues[field] = lead.clientInfo?.[subField as keyof typeof lead.clientInfo];
    } else if (field.startsWith('structuredSettlement.')) {
      const subField = field.replace('structuredSettlement.', '');
      currentValues[field] = lead.structuredSettlement[subField as keyof typeof lead.structuredSettlement];
    }
  }
  
  return currentValues;
}

/**
 * Apply updates to a lead object
 */
function applyUpdatesToLead(lead: Lead, updates: Record<string, any>): Lead {
  const updatedLead = { ...lead };
  
  for (const [field, value] of Object.entries(updates)) {
    if (value === undefined || value === null || value === '') {
      continue; // Skip empty updates
    }
    
    if (field in updatedLead) {
      (updatedLead as any)[field] = value;
    } else if (field.startsWith('clientInfo.')) {
      const subField = field.replace('clientInfo.', '');
      updatedLead.clientInfo = { ...updatedLead.clientInfo, [subField]: value };
    } else if (field.startsWith('structuredSettlement.')) {
      const subField = field.replace('structuredSettlement.', '');
      updatedLead.structuredSettlement = { ...updatedLead.structuredSettlement, [subField]: value };
    }
  }
  
  // Update timestamps
  updatedLead.updatedAt = new Date().toISOString();
  updatedLead.lastActivity = new Date().toISOString();
  
  return updatedLead;
}
