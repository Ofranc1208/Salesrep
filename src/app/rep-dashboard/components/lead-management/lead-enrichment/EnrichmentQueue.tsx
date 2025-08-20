'use client';

import React, { useState } from 'react';
import { Lead } from '../../../types';

interface EnrichmentQueueProps {
  queue: Lead[];
  onLeadSelect: (lead: Lead) => void;
  onRemoveFromQueue: (leadId: string) => void;
  onBulkEnrichment: (fieldUpdates: Record<string, any>) => void;
  isEnriching: boolean;
}

export default function EnrichmentQueue({
  queue,
  onLeadSelect,
  onRemoveFromQueue,
  onBulkEnrichment,
  isEnriching
}: EnrichmentQueueProps) {
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [showBulkPanel, setShowBulkPanel] = useState(false);
  const [bulkUpdates, setBulkUpdates] = useState<Record<string, any>>({});

  const toggleLeadSelection = (leadId: string) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const selectAllLeads = () => {
    if (selectedLeads.size === queue.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(queue.map(lead => lead.id)));
    }
  };

  const getMissingFields = (lead: Lead): string[] => {
    const missing: string[] = [];
    
    if (lead.clientInfo?.ssn === 'Not Available') missing.push('SSN');
    if (lead.clientInfo?.dateOfBirth === 'Not Available') missing.push('Date of Birth');
    if (lead.structuredSettlement.monthlyPayment === 'Not Available') missing.push('Monthly Payment');
    if (lead.structuredSettlement.totalValue === 'Not Available') missing.push('Total Value');
    if (lead.clientInfo?.futureNPV === 'Not Available') missing.push('Future NPV');
    if (lead.clientInfo?.currentOffers === 'Not Available') missing.push('Current Offers');
    if (!lead.phoneNumbers.some(p => p.number !== 'Not Available')) missing.push('Valid Phone');
    
    return missing;
  };

  const handleBulkEnrichment = () => {
    onBulkEnrichment(bulkUpdates);
    setShowBulkPanel(false);
    setBulkUpdates({});
    setSelectedLeads(new Set());
  };

  if (queue.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">✨</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Leads in Enrichment Queue</h3>
          <p className="text-gray-600">
            All leads have complete data or use "Auto-Queue Incomplete Leads" to find leads that need enrichment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Queue Controls */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={selectAllLeads}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {selectedLeads.size === queue.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedLeads.size > 0 && (
              <>
                <span className="text-sm text-gray-600">
                  {selectedLeads.size} selected
                </span>
                <button
                  onClick={() => setShowBulkPanel(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Bulk Enrich
                </button>
                <button
                  onClick={() => {
                    selectedLeads.forEach(leadId => onRemoveFromQueue(leadId));
                    setSelectedLeads(new Set());
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Remove Selected
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {queue.map((lead) => {
            const missingFields = getMissingFields(lead);
            const isSelected = selectedLeads.has(lead.id);
            
            return (
              <div
                key={lead.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleLeadSelection(lead.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{lead.clientName}</h4>
                      <p className="text-sm text-gray-600">{lead.crmId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-600">
                        {missingFields.length} missing fields
                      </div>
                      <div className="text-xs text-gray-500">
                        {missingFields.slice(0, 3).join(', ')}
                        {missingFields.length > 3 && ` +${missingFields.length - 3} more`}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onLeadSelect(lead)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Enrich
                      </button>
                      <button
                        onClick={() => onRemoveFromQueue(lead.id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Missing Fields Detail */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {missingFields.map((field) => (
                    <span
                      key={field}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      Missing: {field}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bulk Enrichment Panel */}
      {showBulkPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Bulk Enrich {selectedLeads.size} Leads
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Company
                  </label>
                  <input
                    type="text"
                    value={bulkUpdates.insuranceCompany || ''}
                    onChange={(e) => setBulkUpdates({...bulkUpdates, insuranceCompany: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., MetLife, Prudential"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={bulkUpdates.campaignName || ''}
                    onChange={(e) => setBulkUpdates({...bulkUpdates, campaignName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Q1 2024 Campaign"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={bulkUpdates.priority || ''}
                    onChange={(e) => setBulkUpdates({...bulkUpdates, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={bulkUpdates.status || ''}
                    onChange={(e) => setBulkUpdates({...bulkUpdates, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={bulkUpdates.notes || ''}
                  onChange={(e) => setBulkUpdates({...bulkUpdates, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add notes that will be applied to all selected leads..."
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowBulkPanel(false);
                  setBulkUpdates({});
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkEnrichment}
                disabled={isEnriching}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {isEnriching ? 'Enriching...' : 'Apply Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
