'use client';

import React from 'react';
import { Lead } from '../../../types';
import { SectionKey, ExpandedSections } from '../types';
import { CollapsibleCard } from '../shared';
import { ClientProfileCard } from '../client-info';
import { PhoneManagementCard } from '../phone-management';
import { AttorneyInfoCard } from '../attorney-info';
import { CourtInfoCard } from '../court-info';

interface LeftColumnProps {
  selectedLead: Lead;
  clientData: any;
  expandedSections: ExpandedSections;
  visibleSections: string[];
  toggleSection: (section: SectionKey) => void;
  // Phone management props
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

const LeftColumn: React.FC<LeftColumnProps> = ({
  selectedLead,
  clientData,
  expandedSections,
  visibleSections,
  toggleSection,
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
}) => {
  return (
    <div className="space-y-6">
      {/* Client Profile Card */}
      <CollapsibleCard
        title="Client Details"
        subtitle="Personal Information"
        isExpanded={expandedSections.clientProfile}
        onToggle={() => toggleSection('clientProfile')}
        isDisabled={!visibleSections.includes('clientProfile')}
        disabledMessage="Available in all lead stages"
      >
        <ClientProfileCard clientData={clientData} />
      </CollapsibleCard>

      {/* Phone Management Card */}
      <CollapsibleCard
        title="Phone Management"
        subtitle="Contact Numbers"
        isExpanded={expandedSections.phoneManagement}
        onToggle={() => toggleSection('phoneManagement')}
        isDisabled={!visibleSections.includes('phoneManagement')}
        disabledMessage="Available in Warm and Active leads"
      >
        <PhoneManagementCard
          selectedLead={selectedLead}
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
      </CollapsibleCard>

      {/* Attorney Info Card */}
      <CollapsibleCard
        title="Attorney Info"
        subtitle="Legal Representation"
        isExpanded={expandedSections.attorney}
        onToggle={() => toggleSection('attorney')}
        isDisabled={!visibleSections.includes('attorney')}
        disabledMessage="Available in Active leads only"
      >
        <AttorneyInfoCard />
      </CollapsibleCard>

      {/* Court Info Card */}
      <CollapsibleCard
        title="Court Info"
        subtitle="Legal Proceedings"
        isExpanded={expandedSections.court}
        onToggle={() => toggleSection('court')}
        isDisabled={!visibleSections.includes('court')}
        disabledMessage="Available in Active leads only"
      >
        <CourtInfoCard />
      </CollapsibleCard>
    </div>
  );
};

export default LeftColumn;
