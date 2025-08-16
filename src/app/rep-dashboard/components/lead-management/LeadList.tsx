'use client';

import React, { useState, useMemo } from 'react';
import { Lead } from '../../types';
import LeadListHeader from './LeadListHeader';
import LeadTable from './LeadTable';
import LeadPagination from './LeadPagination';
import LeadEmptyState from './LeadEmptyState';

interface LeadListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onLeadSelect: (lead: Lead) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  campaignInfo: {
    name: string;
    totalLeads: number;
    processedLeads: number;
  };
}

export default function LeadList({
  leads,
  selectedLead,
  onLeadSelect,
  getStatusColor,
  getStatusText,
  campaignInfo
}: LeadListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 3; // Reduced from showing all leads
  
  const processedCount = leads.filter(lead => lead.processed).length;
  
  // Pagination logic
  const totalPages = Math.ceil(leads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const currentLeads = useMemo(() => leads.slice(startIndex, endIndex), [leads, startIndex, endIndex]);
  
  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col min-w-0 overflow-hidden">
        <LeadEmptyState />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col min-w-0 overflow-hidden">
      <LeadListHeader
        campaignName={campaignInfo.name}
        processedCount={processedCount}
        totalLeads={campaignInfo.totalLeads}
      />
      
      <LeadTable
        leads={currentLeads}
        selectedLead={selectedLead}
        onLeadSelect={onLeadSelect}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
      />
      
      {leads.length > leadsPerPage && (
        <LeadPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalLeads={leads.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
