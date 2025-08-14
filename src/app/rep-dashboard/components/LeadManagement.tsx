'use client';

import React from 'react';
import LeadOverview from './LeadOverview';
import ClientDetails from './ClientDetails';
import MessageHistory from './MessageHistory';
import { Lead, TabType } from '../types';

interface LeadManagementProps {
  selectedLead: Lead | null;
  activeTab: TabType;
  selectedPhoneNumber: string;
  copiedMessage: string;
  onTabChange: (tab: TabType) => void;
  onCopyMessage: () => void;
  onGenerateFollowUp: () => void;
  onMarkComplete: () => void;
  onNextPhoneNumber: () => void;
  onPreviousPhoneNumber: () => void;
  onPhoneNumberSelect: (phoneNumber: string) => void;
  onUpdateStatus: (phoneNumber: string, newStatus: string) => void;
  onUpdateType: (phoneNumber: string, newType: string) => void;
  onUpdateRelationship: (phoneNumber: string, newRelationship: string) => void;
  onUpdateNotes: (phoneNumber: string, newNotes: string) => void;
  onAddPhoneNumber: (phoneNumber: any) => void;
  getPhoneStatusColor: (status: string) => string;
  getPhoneStatusTextColor: (status: string) => string;
  getPhoneStatusText: (status: string) => string;
  getRelationshipText: (relationship: string) => string;
  getNextStatus: (status: string) => string;
  currentLeadProgress?: number;
  totalLeads?: number;
}

export default function LeadManagement({
  selectedLead,
  activeTab,
  selectedPhoneNumber,
  copiedMessage,
  onTabChange,
  onCopyMessage,
  onGenerateFollowUp,
  onMarkComplete,
  onNextPhoneNumber,
  onPreviousPhoneNumber,
  onPhoneNumberSelect,
  onUpdateStatus,
  onUpdateType,
  onUpdateRelationship,
  onUpdateNotes,
  onAddPhoneNumber,
  getPhoneStatusColor,
  getPhoneStatusTextColor,
  getPhoneStatusText,
  getRelationshipText,
  getNextStatus,
  currentLeadProgress,
  totalLeads
}: LeadManagementProps) {
  if (!selectedLead) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lead Management</h2>
          <p className="text-sm text-gray-600">Select a lead to manage</p>
        </div>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Lead Selected</h3>
          <p className="text-gray-600">Click on a lead from the list to start managing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Lead Management</h2>
        <p className="text-sm text-gray-600">Managing: {selectedLead.clientName}</p>
      </div>
      
      <div className="p-4">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Lead Overview' },
              { id: 'client-details', label: 'Client Details' },
              { id: 'messages', label: 'Message History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as TabType)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <LeadOverview
            selectedLead={selectedLead}
            selectedPhoneNumber={selectedPhoneNumber}
            copiedMessage={copiedMessage}
            onCopyMessage={onCopyMessage}
            onGenerateFollowUp={onGenerateFollowUp}
            onMarkComplete={onMarkComplete}
            onNextPhoneNumber={onNextPhoneNumber}
            onPreviousPhoneNumber={onPreviousPhoneNumber}
            onPhoneNumberSelect={onPhoneNumberSelect}
            onUpdateStatus={onUpdateStatus}
            onUpdateType={onUpdateType}
            onUpdateRelationship={onUpdateRelationship}
            onUpdateNotes={onUpdateNotes}
            onAddPhoneNumber={onAddPhoneNumber}
            getPhoneStatusColor={getPhoneStatusColor}
            getPhoneStatusTextColor={getPhoneStatusTextColor}
            getPhoneStatusText={getPhoneStatusText}
            getRelationshipText={getRelationshipText}
            getNextStatus={getNextStatus}
            currentLeadProgress={currentLeadProgress}
            totalLeads={totalLeads}
          />
        )}

        {activeTab === 'client-details' && (
          <ClientDetails selectedLead={selectedLead} />
        )}

        {activeTab === 'messages' && (
          <MessageHistory selectedLead={selectedLead} />
        )}
      </div>
    </div>
  );
}
