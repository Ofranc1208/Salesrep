'use client';

import React from 'react';

interface DashboardHeaderProps {
  sharedDataFlow: {
    isConnected: boolean;
    stats: {
      pendingLeads: number;
      inProgressLeads: number;
      completedLeads: number;
    };
  };
  leadManagement: {
    leads: any[];
  };
}

export default function DashboardHeader({ sharedDataFlow, leadManagement }: DashboardHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Sales Rep Dashboard</h1>
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-1 lg:mt-2">
                <p className="text-sm lg:text-base text-gray-600">Welcome, <span className="font-semibold text-gray-900">Client Relations Rep One</span></p>
                <span className="hidden lg:block text-gray-300">•</span>
                <p className="text-sm lg:text-base text-blue-600 font-semibold">Structured Settlement Buyouts</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="grid grid-cols-3 gap-4 lg:gap-6 text-center">
              <div>
                <div className="text-xs lg:text-sm text-gray-500">Pending</div>
                <div className="text-lg lg:text-2xl font-bold text-orange-600">
                  {sharedDataFlow.isConnected ? sharedDataFlow.stats.pendingLeads : leadManagement.leads.filter(l => l.status === 'pending').length}
                </div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-gray-500">In Progress</div>
                <div className="text-lg lg:text-2xl font-bold text-blue-600">
                  {sharedDataFlow.isConnected ? sharedDataFlow.stats.inProgressLeads : leadManagement.leads.filter(l => l.status === 'in-progress').length}
                </div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-gray-500">Completed</div>
                <div className="text-lg lg:text-2xl font-bold text-green-600">
                  {sharedDataFlow.isConnected ? sharedDataFlow.stats.completedLeads : leadManagement.leads.filter(l => l.status === 'completed').length}
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
              <a
                href="/manager-dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Manager Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
