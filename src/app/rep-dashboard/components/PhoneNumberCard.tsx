'use client';

import React, { useState } from 'react';
import { PhoneNumber } from '../types';

interface PhoneNumberCardProps {
  phone: PhoneNumber;
  isSelected: boolean;
  onSelect: (phoneNumber: string) => void;
  onUpdateStatus: (phoneNumber: string, newStatus: string) => void;
  onUpdateType: (phoneNumber: string, newType: string) => void;
  onUpdateRelationship: (phoneNumber: string, newRelationship: string) => void;
  onUpdateNotes: (phoneNumber: string, newNotes: string) => void;
  getPhoneStatusColor: (status: string) => string;
  getNextStatus: (status: string) => string;
}

export default function PhoneNumberCard({
  phone,
  isSelected,
  onSelect,
  onUpdateStatus,
  onUpdateType,
  onUpdateRelationship,
  onUpdateNotes,
  getPhoneStatusColor,
  getNextStatus
}: PhoneNumberCardProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const statusOptions = [
    { value: 'working', label: 'Working', color: 'bg-green-500' },
    { value: 'disconnected', label: 'Disconnected', color: 'bg-red-500' },
    { value: 'voicemail', label: 'Voicemail', color: 'bg-purple-500' },
    { value: 'busy', label: 'Busy', color: 'bg-orange-500' },
    { value: 'bad', label: 'Bad', color: 'bg-red-600' },
    { value: 'invalid', label: 'Invalid', color: 'bg-yellow-500' }
  ];

  const typeOptions = [
    { value: 'mobile', label: 'Mobile', icon: '📱' },
    { value: 'landline', label: 'Landline', icon: '☎️' },
    { value: 'voip', label: 'VoIP', icon: '💻' },
    { value: 'business', label: 'Business', icon: '🏢' },
    { value: 'fax', label: 'Fax', icon: '📠' }
  ];

  const relationshipOptions = [
    { value: 'primary', label: 'Primary' },
    { value: 'home', label: 'Home' },
    { value: 'work', label: 'Work' },
    { value: 'alternate', label: 'Alternate' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = (field: string) => {
    if (editValue.trim() === '') return;
    
    // Show confirmation dialog
    if (window.confirm(`Do you want to update ${field} from "${phone[field as keyof PhoneNumber]}" to "${editValue}"?`)) {
      switch (field) {
        case 'status':
          onUpdateStatus(phone.number, editValue);
          break;
        case 'type':
          onUpdateType(phone.number, editValue);
          break;
        case 'relationship':
          onUpdateRelationship(phone.number, editValue);
          break;
        case 'notes':
          onUpdateNotes(phone.number, editValue);
          break;
      }
      setEditingField(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const renderEditableField = (field: string, currentValue: string, options: any[], label: string) => {
    const isEditing = editingField === field;
    
    if (isEditing) {
      return (
        <div className="space-y-2">
          <select
            autoFocus
            className="w-full text-xs border border-blue-300 rounded px-2 py-1 bg-white"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleSave(field)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave(field);
              } else if (e.key === 'Escape') {
                handleCancel();
              }
            }}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.icon ? `${option.icon} ${option.label}` : option.label}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-500">
            Press Enter to save, Escape to cancel
          </div>
        </div>
      );
    }

    const option = options.find(opt => opt.value === currentValue);
    return (
      <button
        onClick={() => handleEdit(field, currentValue)}
        className="w-full text-left text-xs text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors cursor-pointer group"
        title={`Click to edit ${label}`}
      >
        <span className="flex items-center justify-between">
          <span>{option?.icon ? `${option.icon} ${option.label}` : option?.label || currentValue}</span>
          <span className="opacity-0 group-hover:opacity-100 text-gray-400">✏️</span>
        </span>
      </button>
    );
  };

  const renderNotesField = () => {
    const isEditing = editingField === 'notes';
    
    if (isEditing) {
      return (
        <div className="space-y-2">
          <textarea
            autoFocus
            className="w-full text-xs border border-blue-300 rounded px-2 py-1 bg-white resize-none"
            rows={2}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleSave('notes')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleSave('notes');
              } else if (e.key === 'Escape') {
                handleCancel();
              }
            }}
            placeholder="Add notes..."
          />
          <div className="text-xs text-gray-500">
            Press Ctrl+Enter to save, Escape to cancel
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={() => handleEdit('notes', phone.notes || '')}
        className="w-full text-left text-xs text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors cursor-pointer min-h-[2rem] group"
        title="Click to edit notes"
      >
        <span className="flex items-center justify-between">
          <span className="text-left">
            {phone.notes || 'Click to add notes...'}
          </span>
          <span className="opacity-0 group-hover:opacity-100 text-gray-400">✏️</span>
        </span>
      </button>
    );
  };

  const renderHistoryModal = () => {
    if (!showHistory) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Phone Number History</h3>
            <button
              onClick={() => setShowHistory(false)}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">{phone.number}</div>
            <div className="text-xs text-gray-500">Complete change history with Rep ID tracking</div>
          </div>

          {phone.auditTrail && phone.auditTrail.length > 0 ? (
            <div className="space-y-3">
              {phone.auditTrail.slice().reverse().map((entry, index) => (
                <div key={entry.id} className="border-l-4 border-blue-200 pl-3 py-2 bg-gray-50 rounded-r">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium text-gray-900">
                      {entry.field.charAt(0).toUpperCase() + entry.field.slice(1)} Changed
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Rep: {entry.editedBy}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    <span className="font-medium">From:</span> "{entry.oldValue || 'empty'}"
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">To:</span> "{entry.newValue}"
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(entry.editedAt).toLocaleDateString()} at {new Date(entry.editedAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <div>No changes recorded yet</div>
              <div className="text-xs">Changes will appear here after editing</div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowHistory(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
        {/* Header - Phone Number & Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${getPhoneStatusColor(phone.status)}`}></span>
            <span className="text-sm font-semibold text-gray-900">{phone.number}</span>
          </div>
          <div className="flex items-center space-x-2">
            {phone.isPrimary && (
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Primary
              </span>
            )}
          </div>
        </div>

        {/* Status - Clean & Editable */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1 font-medium">Status</div>
          {renderEditableField('status', phone.status, statusOptions, 'status')}
        </div>

        {/* Type & Relationship - Side by Side */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs text-gray-500 mb-1 font-medium">Type</div>
            {renderEditableField('type', phone.type, typeOptions, 'type')}
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1 font-medium">Relationship</div>
            {renderEditableField('relationship', phone.relationship, relationshipOptions, 'relationship')}
          </div>
        </div>

        {/* Notes - Clean & Editable */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1 font-medium">Notes</div>
          {renderNotesField()}
        </div>

        {/* Actions - Clean & Focused */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelect(phone.number)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
          
          {/* History Button */}
          <button
            onClick={() => setShowHistory(true)}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1"
            title="View complete change history"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>History</span>
          </button>
        </div>
      </div>
      
      {/* History Modal */}
      {renderHistoryModal()}
    </>
  );
}
