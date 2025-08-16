'use client';

import React from 'react';
import { LeadList } from '../../utils/mock-data';

interface HeaderProps {
  activeList?: LeadList;
  selectedCount: number;
  totalLeads: number;
}

export default function Header({ activeList, selectedCount, totalLeads }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Title and breadcrumb */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span>Structured Settlement Lead Management</span>
                  {activeList && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="font-medium text-blue-600">{activeList.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Stats and navigation */}
          <div className="flex items-center space-x-6">
            {/* Lead Statistics */}
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Total Leads</div>
                <div className="text-2xl font-bold text-gray-900">{totalLeads}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Selected</div>
                <div className="text-2xl font-bold text-blue-600">{selectedCount}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-2xl font-bold text-green-600">
                  {totalLeads > 0 ? Math.round((selectedCount / totalLeads) * 100) : 0}%
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-3">
              <a 
                href="/rep-dashboard" 
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Rep Dashboard
              </a>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}