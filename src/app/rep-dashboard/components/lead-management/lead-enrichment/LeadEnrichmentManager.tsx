'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';
import EnrichmentQueue from './EnrichmentQueue';
import DataEnrichmentPanel from './DataEnrichmentPanel';
import EnrichmentHistory from './EnrichmentHistory';
import { useLeadEnrichment } from './hooks';

interface LeadEnrichmentManagerProps {
  leads: Lead[];
  onLeadUpdated: (updatedLead: Lead) => void;
  onBulkUpdate: (updatedLeads: Lead[]) => void;
}

export default function LeadEnrichmentManager({
  leads,
  onLeadUpdated,
  onBulkUpdate
}: LeadEnrichmentManagerProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState<'queue' | 'enrich' | 'history'>('queue');

  const {
    enrichmentQueue,
    enrichmentHistory,
    addToQueue,
    removeFromQueue,
    enrichLead,
    bulkEnrichment,
    isEnriching
  } = useLeadEnrichment(leads);

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setActiveTab('enrich');
  };

  const handleEnrichmentComplete = (enrichedLead: Lead) => {
    onLeadUpdated(enrichedLead);
    removeFromQueue(enrichedLead.id);
    setSelectedLead(null);
    setActiveTab('queue');
  };

  const handleBulkEnrichment = async (fieldUpdates: Record<string, any>) => {
    const enrichedLeads = await bulkEnrichment(enrichmentQueue, fieldUpdates);
    onBulkUpdate(enrichedLeads);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'queue':
        return (
          <EnrichmentQueue
            queue={enrichmentQueue}
            onLeadSelect={handleLeadSelect}
            onRemoveFromQueue={removeFromQueue}
            onBulkEnrichment={handleBulkEnrichment}
            isEnriching={isEnriching}
          />
        );
      
      case 'enrich':
        return selectedLead ? (
          <DataEnrichmentPanel
            lead={selectedLead}
            onEnrichmentComplete={handleEnrichmentComplete}
            onCancel={() => {
              setSelectedLead(null);
              setActiveTab('queue');
            }}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            Select a lead from the queue to enrich
          </div>
        );
      
      case 'history':
        return (
          <EnrichmentHistory
            history={enrichmentHistory}
            onRevertEnrichment={(leadId, version) => {
              // Handle revert logic if needed
              console.log('Revert enrichment:', leadId, version);
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Lead Enrichment</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {enrichmentQueue.length} leads in queue
            </span>
            <button
              onClick={() => {
                const leadsNeedingEnrichment = leads.filter(lead => 
                  lead.clientInfo?.ssn === 'Not Available' ||
                  lead.clientInfo?.dateOfBirth === 'Not Available' ||
                  lead.structuredSettlement.monthlyPayment === 'Not Available'
                );
                leadsNeedingEnrichment.forEach(lead => addToQueue(lead));
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Auto-Queue Incomplete Leads
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-3 border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'queue', label: 'Enrichment Queue', count: enrichmentQueue.length },
            { id: 'enrich', label: 'Data Enrichment', count: null },
            { id: 'history', label: 'History', count: enrichmentHistory.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
}
