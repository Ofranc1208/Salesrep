'use client';

import React, { useState } from 'react';
import { Lead, PhoneNumber } from '../../../types';

interface DataEnrichmentPanelProps {
  lead: Lead;
  onEnrichmentComplete: (enrichedLead: Lead) => void;
  onCancel: () => void;
}

export default function DataEnrichmentPanel({
  lead,
  onEnrichmentComplete,
  onCancel
}: DataEnrichmentPanelProps) {
  const [enrichedLead, setEnrichedLead] = useState<Lead>({ ...lead });
  const [activeSection, setActiveSection] = useState<'basic' | 'contact' | 'payment' | 'additional'>('basic');

  const handleFieldUpdate = (section: string, field: string, value: any) => {
    setEnrichedLead(prev => {
      const updated = { ...prev };
      
      if (section === 'basic') {
        (updated as any)[field] = value;
      } else if (section === 'clientInfo') {
        updated.clientInfo = { ...updated.clientInfo, [field]: value };
      } else if (section === 'structuredSettlement') {
        updated.structuredSettlement = { ...updated.structuredSettlement, [field]: value };
      }
      
      return updated;
    });
  };

  const handlePhoneNumberUpdate = (index: number, field: keyof PhoneNumber, value: any) => {
    setEnrichedLead(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.map((phone, i) => 
        i === index ? { ...phone, [field]: value } : phone
      )
    }));
  };

  const addPhoneNumber = () => {
    setEnrichedLead(prev => ({
      ...prev,
      phoneNumbers: [
        ...prev.phoneNumbers,
        {
          number: '',
          status: 'Not Contacted',
          lastUsed: '',
          isPrimary: false,
          type: 'Unknown',
          relationship: 'Client',
          lastVerified: '',
          notes: ''
        }
      ]
    }));
  };

  const removePhoneNumber = (index: number) => {
    setEnrichedLead(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const updatedLead = {
      ...enrichedLead,
      updatedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    
    onEnrichmentComplete(updatedLead);
  };

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            value={enrichedLead.clientName}
            onChange={(e) => handleFieldUpdate('basic', 'clientName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CRM ID
          </label>
          <input
            type="text"
            value={enrichedLead.crmId}
            onChange={(e) => handleFieldUpdate('basic', 'crmId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name
          </label>
          <input
            type="text"
            value={enrichedLead.campaignName}
            onChange={(e) => handleFieldUpdate('basic', 'campaignName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={enrichedLead.priority}
            onChange={(e) => handleFieldUpdate('basic', 'priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SSN
          </label>
          <input
            type="text"
            value={enrichedLead.clientInfo?.ssn || ''}
            onChange={(e) => handleFieldUpdate('clientInfo', 'ssn', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="XXX-XX-XXXX"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={enrichedLead.clientInfo?.dateOfBirth || ''}
            onChange={(e) => handleFieldUpdate('clientInfo', 'dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Phone Numbers</h4>
        <button
          onClick={addPhoneNumber}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
        >
          Add Phone
        </button>
      </div>
      
      <div className="space-y-3">
        {enrichedLead.phoneNumbers.map((phone, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone.number}
                  onChange={(e) => handlePhoneNumberUpdate(index, 'number', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={phone.type}
                  onChange={(e) => handlePhoneNumberUpdate(index, 'type', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <select
                  value={phone.relationship}
                  onChange={(e) => handlePhoneNumberUpdate(index, 'relationship', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Client">Client</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Family">Family</option>
                  <option value="Attorney">Attorney</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={phone.isPrimary}
                    onChange={(e) => handlePhoneNumberUpdate(index, 'isPrimary', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Primary</span>
                </label>
                
                <div className="text-sm text-gray-600">
                  Status: <span className="font-medium">{phone.status}</span>
                </div>
              </div>
              
              {enrichedLead.phoneNumbers.length > 1 && (
                <button
                  onClick={() => removePhoneNumber(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            {phone.notes && (
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={phone.notes}
                  onChange={(e) => handlePhoneNumberUpdate(index, 'notes', e.target.value)}
                  rows={2}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Payment
          </label>
          <input
            type="text"
            value={enrichedLead.structuredSettlement.monthlyPayment}
            onChange={(e) => handleFieldUpdate('structuredSettlement', 'monthlyPayment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$5,000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Value
          </label>
          <input
            type="text"
            value={enrichedLead.structuredSettlement.totalValue}
            onChange={(e) => handleFieldUpdate('structuredSettlement', 'totalValue', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$150,000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={enrichedLead.structuredSettlement.startDate}
            onChange={(e) => handleFieldUpdate('structuredSettlement', 'startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={enrichedLead.structuredSettlement.endDate}
            onChange={(e) => handleFieldUpdate('structuredSettlement', 'endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Company
          </label>
          <input
            type="text"
            value={enrichedLead.structuredSettlement.insuranceCompany}
            onChange={(e) => handleFieldUpdate('structuredSettlement', 'insuranceCompany', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="MetLife, Prudential, etc."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Offer Amount
          </label>
          <input
            type="text"
            value={enrichedLead.structuredSettlement.offerAmount}
            onChange={(e) => handleFieldUpdate('structuredSettlement', 'offerAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$75,000"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Future NPV
          </label>
          <input
            type="text"
            value={enrichedLead.clientInfo?.futureNPV || ''}
            onChange={(e) => handleFieldUpdate('clientInfo', 'futureNPV', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$120,000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Offers
          </label>
          <input
            type="text"
            value={enrichedLead.clientInfo?.currentOffers || ''}
            onChange={(e) => handleFieldUpdate('clientInfo', 'currentOffers', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$65,000 - $70,000"
          />
        </div>
      </div>
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          value={enrichedLead.notes}
          onChange={(e) => handleFieldUpdate('basic', 'notes', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add any additional notes about this lead..."
        />
      </div>
      
      {/* Additional Fields from Spreadsheet */}
      {enrichedLead.clientInfo?.additionalFields && Object.keys(enrichedLead.clientInfo.additionalFields).length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Additional Fields from Spreadsheet</h4>
          <div className="space-y-3">
            {Object.entries(enrichedLead.clientInfo.additionalFields).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key}
                </label>
                <input
                  type="text"
                  value={String(value)}
                  onChange={(e) => {
                    const updatedFields = { ...enrichedLead.clientInfo?.additionalFields };
                    updatedFields[key] = e.target.value;
                    handleFieldUpdate('clientInfo', 'additionalFields', updatedFields);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Enriching: {lead.clientName}
        </h3>
        <p className="text-sm text-gray-600">CRM ID: {lead.crmId}</p>
      </div>

      {/* Section Navigation */}
      <div className="px-6 py-3 border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'basic', label: 'Basic Info' },
            { id: 'contact', label: 'Contact Info' },
            { id: 'payment', label: 'Payment Info' },
            { id: 'additional', label: 'Additional' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'basic' && renderBasicInfo()}
        {activeSection === 'contact' && renderContactInfo()}
        {activeSection === 'payment' && renderPaymentInfo()}
        {activeSection === 'additional' && renderAdditionalInfo()}
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
