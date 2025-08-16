'use client';

import React from 'react';
import { Lead } from '../../types';
import LeadTableRow from './LeadTableRow';

interface LeadTableProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

export default function LeadTable({
  leads,
  selectedLead,
  onLeadSelect,
  getStatusColor,
  getStatusText
}: LeadTableProps) {
  return (
    <div className="flex-1 overflow-hidden min-w-0">
      <div className="overflow-y-auto h-full min-w-0">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Client
              </th>
              <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                CRM ID
              </th>
              <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Next Follow-up
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <LeadTableRow
                key={lead.id}
                lead={lead}
                isSelected={selectedLead?.id === lead.id}
                onSelect={onLeadSelect}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
