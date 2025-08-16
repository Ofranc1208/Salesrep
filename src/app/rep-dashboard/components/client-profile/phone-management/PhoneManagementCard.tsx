'use client';

import React, { useState } from 'react';
import { Lead, PhoneNumber } from '../../../types';

interface PhoneManagementCardProps {
  selectedLead: Lead;
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

interface NewPhoneForm {
  number: string;
  type: string;
  relationship: string;
  status: string;
  notes: string;
}

interface EditPhoneForm {
  status: string;
  type: string;
  relationship: string;
  notes: string;
}

const PhoneManagementCard: React.FC<PhoneManagementCardProps> = ({
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
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState<string | null>(null);
  
  // Form states
  const [newPhoneForm, setNewPhoneForm] = useState<NewPhoneForm>({
    number: '',
    type: 'mobile',
    relationship: 'client',
    status: 'working',
    notes: ''
  });

  const [editPhoneForms, setEditPhoneForms] = useState<Record<string, EditPhoneForm>>({});

  const phoneNumbers = selectedLead.phoneNumbers || [];

  // Reset new phone form
  const resetNewPhoneForm = () => {
    setNewPhoneForm({
      number: '',
      type: 'mobile',
      relationship: 'client',
      status: 'working',
      notes: ''
    });
  };

  // Handle add phone
  const handleAddPhone = () => {
    if (!newPhoneForm.number.trim()) {
      alert('Please enter a phone number');
      return;
    }

    // Check for duplicate phone numbers
    const isDuplicate = phoneNumbers.some(phone => phone.number === newPhoneForm.number);
    if (isDuplicate) {
      alert('This phone number already exists');
      return;
    }

    const newPhone: PhoneNumber = {
      number: newPhoneForm.number,
      type: newPhoneForm.type,
      relationship: newPhoneForm.relationship,
      status: newPhoneForm.status,
      notes: newPhoneForm.notes,
      lastUsed: new Date().toISOString().split('T')[0], // Today's date
      lastVerified: new Date().toISOString().split('T')[0], // Today's date
      isPrimary: phoneNumbers.length === 0 // First phone is primary
    };

    onAddPhoneNumber(newPhone);
    resetNewPhoneForm();
    setShowAddForm(false);
  };

  // Handle edit phone toggle
  const handleEditPhone = (phoneNumber: string) => {
    if (editingPhone === phoneNumber) {
      setEditingPhone(null);
    } else {
      // Initialize edit form with current phone data
      const phone = phoneNumbers.find(p => p.number === phoneNumber);
      if (phone) {
        setEditPhoneForms(prev => ({
          ...prev,
          [phoneNumber]: {
            status: phone.status,
            type: phone.type,
            relationship: phone.relationship,
            notes: phone.notes || ''
          }
        }));
      }
      setEditingPhone(phoneNumber);
    }
  };

  // Handle save phone edits
  const handleSavePhoneEdit = (phoneNumber: string) => {
    const editForm = editPhoneForms[phoneNumber];
    if (!editForm) return;

    onUpdateStatus(phoneNumber, editForm.status);
    onUpdateType(phoneNumber, editForm.type);
    onUpdateRelationship(phoneNumber, editForm.relationship);
    onUpdateNotes(phoneNumber, editForm.notes);

    setEditingPhone(null);
  };

  // Handle cancel phone edit
  const handleCancelPhoneEdit = () => {
    setEditingPhone(null);
  };

  // Update edit form field
  const updateEditForm = (phoneNumber: string, field: keyof EditPhoneForm, value: string) => {
    setEditPhoneForms(prev => ({
      ...prev,
      [phoneNumber]: {
        ...prev[phoneNumber],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-4">
      {/* Add Phone Button */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {phoneNumbers.length} Phone Number{phoneNumbers.length !== 1 ? 's' : ''}
        </span>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            if (!showAddForm) resetNewPhoneForm();
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Phone</span>
        </button>
      </div>

      {/* Add Phone Form - COMPACT */}
      {showAddForm && (
        <div className="bg-gray-50 p-3 rounded-md border">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Add New Phone Number</h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={newPhoneForm.number}
                onChange={(e) => setNewPhoneForm(prev => ({ ...prev, number: e.target.value }))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
              <select 
                value={newPhoneForm.type}
                onChange={(e) => setNewPhoneForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="mobile">Mobile</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Relationship</label>
              <select 
                value={newPhoneForm.relationship}
                onChange={(e) => setNewPhoneForm(prev => ({ ...prev, relationship: e.target.value }))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="client">Client</option>
                <option value="spouse">Spouse</option>
                <option value="family">Family</option>
                <option value="attorney">Attorney</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <select 
                value={newPhoneForm.status}
                onChange={(e) => setNewPhoneForm(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="working">Working</option>
                <option value="invalid">Invalid</option>
                <option value="disconnected">Disconnected</option>
                <option value="voicemail">Voicemail</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
            <textarea
              placeholder="Additional notes..."
              rows={2}
              value={newPhoneForm.notes}
              onChange={(e) => setNewPhoneForm(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddPhone}
              className="flex-1 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Add Phone
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                resetNewPhoneForm();
              }}
              className="flex-1 bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Phone Numbers List - COMPACT DESIGN */}
      <div className="space-y-2">
        {phoneNumbers.map((phone) => (
          <div
            key={phone.number}
            className={`border rounded-md p-2 transition-all duration-200 ${
              selectedPhoneNumber === phone.number
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Compact Phone Row */}
            <div className="flex items-center justify-between">
              {/* Left: Phone Number + Status */}
              <button
                onClick={() => onPhoneNumberSelect(phone.number)}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors flex-1"
              >
                <span className="font-medium text-sm text-gray-900">{phone.number}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getPhoneStatusColor(phone.status)}`}>
                  {getPhoneStatusText(phone.status)}
                </span>
              </button>

              {/* Right: Type + Actions */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 capitalize">{phone.type}</span>
                <button
                  onClick={() => handleEditPhone(phone.number)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  title="Edit phone number"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Edit Form - Only shows when editing */}
            {editingPhone === phone.number && editPhoneForms[phone.number] && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                    <select 
                      value={editPhoneForms[phone.number].status}
                      onChange={(e) => updateEditForm(phone.number, 'status', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="working">Working</option>
                      <option value="invalid">Invalid</option>
                      <option value="disconnected">Disconnected</option>
                      <option value="voicemail">Voicemail</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                    <select 
                      value={editPhoneForms[phone.number].type}
                      onChange={(e) => updateEditForm(phone.number, 'type', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="mobile">Mobile</option>
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                    </select>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Relationship</label>
                  <select 
                    value={editPhoneForms[phone.number].relationship}
                    onChange={(e) => updateEditForm(phone.number, 'relationship', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="client">Client</option>
                    <option value="spouse">Spouse</option>
                    <option value="family">Family</option>
                    <option value="attorney">Attorney</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                  <textarea
                    value={editPhoneForms[phone.number].notes}
                    onChange={(e) => updateEditForm(phone.number, 'notes', e.target.value)}
                    rows={2}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    placeholder="Add notes..."
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSavePhoneEdit(phone.number)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelPhoneEdit}
                    className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Phone History/Details - Expandable */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Relationship:</span>
                      <span className="text-gray-700 capitalize">{getRelationshipText(phone.relationship)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Used:</span>
                      <span className="text-gray-700">{phone.lastUsed}</span>
                    </div>
                    {phone.notes && (
                      <div className="flex justify-between">
                        <span>Notes:</span>
                        <span className="text-gray-700 text-right max-w-32 truncate">{phone.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {phoneNumbers.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <p className="text-sm">No phone numbers added yet</p>
          <p className="text-xs text-gray-400">Click "Add Phone" to get started</p>
        </div>
      )}
    </div>
  );
};

export default PhoneManagementCard;
