'use client';

import React, { useState } from 'react';
import { EnrichmentHistoryEntry } from './hooks';

interface EnrichmentHistoryProps {
  history: EnrichmentHistoryEntry[];
  onRevertEnrichment: (leadId: string, version: string) => void;
}

export default function EnrichmentHistory({
  history,
  onRevertEnrichment
}: EnrichmentHistoryProps) {
  const [selectedEntry, setSelectedEntry] = useState<EnrichmentHistoryEntry | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'today' | 'week'>('all');

  const filteredHistory = history.filter(entry => {
    if (filterBy === 'all') return true;
    
    const entryDate = new Date(entry.timestamp);
    const now = new Date();
    
    if (filterBy === 'today') {
      return entryDate.toDateString() === now.toDateString();
    }
    
    if (filterBy === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return entryDate >= weekAgo;
    }
    
    return true;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatFieldChanges = (entry: EnrichmentHistoryEntry) => {
    return entry.fieldsUpdated.map(field => {
      const oldValue = entry.previousValues[field];
      const newValue = entry.newValues[field];
      
      return {
        field,
        oldValue: oldValue === 'Not Available' ? 'Empty' : String(oldValue),
        newValue: String(newValue)
      };
    });
  };

  if (history.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Enrichment History</h3>
          <p className="text-gray-600">
            Lead enrichment activities will appear here once you start updating lead data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Filter Controls */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Enrichment History</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter:</span>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {filteredHistory.length} enrichment activities
        </p>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {filteredHistory.map((entry) => (
            <div
              key={entry.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{entry.leadName}</h4>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {entry.fieldsUpdated.length} fields updated
                    </span>
                  </div>
                  
                  <div className="mt-1 text-sm text-gray-600">
                    <span>Enriched by {entry.enrichedBy}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTimestamp(entry.timestamp)}</span>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {entry.fieldsUpdated.slice(0, 4).map((field) => (
                      <span
                        key={field}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {field}
                      </span>
                    ))}
                    {entry.fieldsUpdated.length > 4 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        +{entry.fieldsUpdated.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEntry(entry);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Enrichment Details: {selectedEntry.leadName}
                </h3>
                <p className="text-sm text-gray-600">
                  {formatTimestamp(selectedEntry.timestamp)} by {selectedEntry.enrichedBy}
                </p>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Field Changes</h4>
              
              <div className="space-y-4">
                {formatFieldChanges(selectedEntry).map(({ field, oldValue, newValue }) => (
                  <div key={field} className="border border-gray-200 rounded-lg p-4">
                    <div className="font-medium text-gray-900 mb-2">{field}</div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Previous Value</div>
                        <div className="bg-red-50 border border-red-200 rounded p-2 text-sm">
                          <span className="text-red-800">
                            {oldValue || 'Empty'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">New Value</div>
                        <div className="bg-green-50 border border-green-200 rounded p-2 text-sm">
                          <span className="text-green-800">
                            {newValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                
                <button
                  onClick={() => {
                    onRevertEnrichment(selectedEntry.leadId, selectedEntry.id);
                    setSelectedEntry(null);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Revert Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
