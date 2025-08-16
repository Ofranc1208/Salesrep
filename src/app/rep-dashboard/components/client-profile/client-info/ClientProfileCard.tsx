'use client';

import React from 'react';

interface ClientData {
  firstName: string;
  lastName: string;
  age: number;
  maritalStatus: string;
  dob: string;
  status: string;
  primaryPhone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
}

interface ClientProfileCardProps {
  clientData: ClientData;
}

export default function ClientProfileCard({ clientData }: ClientProfileCardProps) {
  return (
    <div className="space-y-3">
      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Name:</span>
          <span className="text-sm font-medium text-gray-900">{clientData.firstName} {clientData.lastName}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Age:</span>
          <span className="text-sm font-medium text-gray-900">{clientData.age} years</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Status:</span>
          <span className="text-sm font-medium text-gray-900">{clientData.status}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">DOB:</span>
          <span className="text-sm font-medium text-gray-900">{clientData.dob}</span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Phone:</span>
          <span className="text-sm font-medium text-gray-900">{clientData.primaryPhone}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-xs font-medium text-gray-500">Email:</span>
          <span className="text-sm font-medium text-gray-900">{clientData.email}</span>
        </div>
      </div>

      {/* Address Information */}
      <div className="flex justify-between items-start py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-500">Address:</span>
        <div className="text-sm text-gray-900 text-right">
          <p>{clientData.address.street}</p>
          <p>{clientData.address.city}, {clientData.address.state} {clientData.address.zipCode}</p>
        </div>
      </div>

      {/* Emergency Contact Information */}
      <div className="pt-3 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Emergency Contact</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1">
            <span className="text-xs font-medium text-gray-500">Name:</span>
            <span className="text-sm font-medium text-gray-900">{clientData.emergencyContact.name}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-xs font-medium text-gray-500">Relationship:</span>
            <span className="text-sm font-medium text-gray-900">{clientData.emergencyContact.relationship}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-xs font-medium text-gray-500">Phone:</span>
            <span className="text-sm font-medium text-gray-900">{clientData.emergencyContact.phone}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-xs font-medium text-gray-500">Email:</span>
            <span className="text-sm font-medium text-gray-900">{clientData.emergencyContact.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
