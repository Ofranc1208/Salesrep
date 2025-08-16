'use client';

import React from 'react';
import { Lead } from '../../types';
import { formatDate } from '../../utils/date-helpers';

interface LeadTableRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

export default function LeadTableRow({
  lead,
  isSelected,
  onSelect,
  getStatusColor,
  getStatusText
}: LeadTableRowProps) {
  return (
    <tr 
      onClick={() => onSelect(lead)}
      className={`cursor-pointer hover:bg-blue-50 transition-colors ${
        isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : ''
      }`}
    >
      <td className="px-6 py-5">
        <div className="flex items-center space-x-4">
          {lead.processed && (
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-base font-semibold text-gray-900 truncate">{lead.clientName}</div>
            <div className="text-sm text-gray-600 mt-1 truncate">
              {lead.payment} • {lead.insuranceCompany}
            </div>
            {/* Mobile-only: Show CRM ID */}
            <div className="sm:hidden text-xs text-gray-500 mt-1">
              ID: {lead.crmId}
            </div>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell px-6 py-5">
        <div className="text-base text-gray-900 font-mono font-semibold">{lead.crmId}</div>
      </td>
      <td className="hidden md:table-cell px-6 py-5">
        <div className="text-base text-gray-900">{formatDate(lead.nextFollowUp)}</div>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  lead.processed 
                    ? 'bg-green-500' 
                    : lead.phoneNumbersProcessed > 0 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300'
                }`}
                style={{ 
                  width: `${lead.phoneNumbers.length > 0 ? (lead.phoneNumbersProcessed / lead.phoneNumbers.length) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
          <span className="text-sm text-gray-600 min-w-[3rem] text-right font-medium">
            {lead.phoneNumbersProcessed}/{lead.phoneNumbers.length}
          </span>
        </div>
      </td>
    </tr>
  );
}
