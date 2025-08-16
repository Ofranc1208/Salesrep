'use client';

import React from 'react';
import { Lead } from '../../types';

// Import from organized subfolders
import { ActionButtons, ExpandCollapseControls } from './shared';
import { DocumentHub } from './document-hub';
import { DealManagementHub } from './deal-management';
import { LeftColumn, MiddleColumn, RightColumn } from './sections';
import { useClientProfileState } from './hooks';
import { getClientData, annuityData, offerData, mockNotes, getVisibleSections, handleAddActivity } from './utils';

interface ClientProfileProps {
  leadType: 'prospect' | 'hot' | 'warm' | 'active';
  selectedLead: Lead | null;
  selectedPhoneNumber: string;
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
}

export default function ClientProfile({
  leadType,
  selectedLead,
  selectedPhoneNumber,
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
  getNextStatus
}: ClientProfileProps) {
  // Use custom hook for state management
  const {
    expandedSections,
    showDocumentHub,
    setShowDocumentHub,
    showDealManagementHub,
    setShowDealManagementHub,
    toggleSection,
    expandAll,
    collapseAll
  } = useClientProfileState();

  const visibleSections = getVisibleSections(leadType);

  if (!selectedLead) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Client Selected</h3>
          <p className="text-gray-600">Select a lead to view client profile</p>
        </div>
      </div>
    );
  }

  // Get data from utility functions
  const clientData = getClientData(selectedLead);

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <ActionButtons 
        onDocumentsClick={() => setShowDocumentHub(true)}
        onBHQClick={() => console.log('BHQ clicked')}
        onClientManagementClick={() => setShowDealManagementHub(true)}
      />

      {/* Expand/Collapse Controls */}
      <ExpandCollapseControls 
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
      />

      {/* Client Profile Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <LeftColumn
          selectedLead={selectedLead}
          clientData={clientData}
          expandedSections={expandedSections}
          visibleSections={visibleSections}
          toggleSection={toggleSection}
          selectedPhoneNumber={selectedPhoneNumber}
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
        />

        {/* Middle Column */}
        <MiddleColumn
          annuityData={annuityData}
          offerData={offerData}
          expandedSections={expandedSections}
          visibleSections={visibleSections}
          toggleSection={toggleSection}
        />

        {/* Right Column */}
        <RightColumn
          selectedLead={selectedLead}
          notes={mockNotes}
          expandedSections={expandedSections}
          visibleSections={visibleSections}
          toggleSection={toggleSection}
          onAddActivity={handleAddActivity}
        />
      </div>

      {/* Document Hub Modal */}
      {showDocumentHub && (
        <DocumentHub 
          selectedLead={selectedLead}
          onClose={() => setShowDocumentHub(false)}
        />
      )}

      {/* Deal Management Hub Modal */}
      {showDealManagementHub && (
        <DealManagementHub 
          selectedLead={selectedLead}
          onClose={() => setShowDealManagementHub(false)}
        />
      )}
    </div>
  );
}