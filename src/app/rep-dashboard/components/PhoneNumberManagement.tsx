'use client';

import React from 'react';
import { PhoneNumber } from '../types';
import PhoneNumberCard from './PhoneNumberCard';
import AddPhoneNumberCard from './AddPhoneNumberCard';

interface PhoneNumberManagementProps {
  phoneNumbers: PhoneNumber[];
  selectedPhoneNumber: string;
  onPhoneNumberSelect: (phoneNumber: string) => void;
  onUpdateStatus: (phoneNumber: string, newStatus: string) => void;
  onUpdateType: (phoneNumber: string, newType: string) => void;
  onUpdateRelationship: (phoneNumber: string, newRelationship: string) => void;
  onUpdateNotes: (phoneNumber: string, newNotes: string) => void;
  onAddPhoneNumber: (phoneNumber: PhoneNumber) => void;
  getPhoneStatusColor: (status: string) => string;
  getPhoneStatusTextColor: (status: string) => string;
  getPhoneStatusText: (status: string) => string;
  getRelationshipText: (relationship: string) => string;
  getNextStatus: (status: string) => string;
}

export default function PhoneNumberManagement({
  phoneNumbers,
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
}: PhoneNumberManagementProps) {
  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-3">Phone Number Management</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Existing Phone Numbers */}
        {phoneNumbers.map((phone, index) => (
          <PhoneNumberCard
            key={index}
            phone={phone}
            isSelected={selectedPhoneNumber === phone.number}
            onSelect={onPhoneNumberSelect}
            onUpdateStatus={onUpdateStatus}
            onUpdateType={onUpdateType}
            onUpdateRelationship={onUpdateRelationship}
            onUpdateNotes={onUpdateNotes}
            getPhoneStatusColor={getPhoneStatusColor}
            getNextStatus={getNextStatus}
          />
        ))}
        
        {/* Add New Phone Number Card */}
        <AddPhoneNumberCard onAddPhoneNumber={onAddPhoneNumber} />
      </div>
    </div>
  );
}
