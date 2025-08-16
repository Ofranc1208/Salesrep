'use client';

import React from 'react';

interface LeadPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalLeads: number;
  onPageChange: (page: number) => void;
}

export default function LeadPagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalLeads,
  onPageChange
}: LeadPaginationProps) {
  return (
    <div className="border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between bg-gray-50 flex-shrink-0 space-y-4 sm:space-y-0">
      <div className="text-sm text-gray-600 order-2 sm:order-1">
        Showing {startIndex + 1}-{Math.min(endIndex, totalLeads)} of {totalLeads} leads
      </div>
      <div className="flex items-center space-x-3 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
