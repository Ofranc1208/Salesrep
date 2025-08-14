'use client';

import React, { useState } from 'react';
import { PhoneNumber } from '../types';

interface AddPhoneNumberCardProps {
  onAddPhoneNumber: (phoneNumber: PhoneNumber) => void;
}

export default function AddPhoneNumberCard({ onAddPhoneNumber }: AddPhoneNumberCardProps) {
  const [showForm, setShowForm] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState({
    number: '',
    status: 'working',
    type: 'mobile',
    relationship: 'alternate',
    notes: ''
  });

  const statusOptions = [
    { value: 'working', label: 'Working' },
    { value: 'disconnected', label: 'Disconnected' },
    { value: 'voicemail', label: 'Voicemail' },
    { value: 'busy', label: 'Busy' },
    { value: 'bad', label: 'Bad' },
    { value: 'invalid', label: 'Invalid' }
  ];

  const typeOptions = [
    { value: 'mobile', label: 'Mobile', icon: '📱' },
    { value: 'landline', label: 'Landline', icon: '☎️' },
    { value: 'voip', label: 'VoIP', icon: '💻' },
    { value: 'business', label: 'Business', icon: '🏢' }
  ];

  const relationshipOptions = [
    { value: 'primary', label: 'Primary' },
    { value: 'home', label: 'Home' },
    { value: 'work', label: 'Work' },
    { value: 'alternate', label: 'Alternate' }
  ];

  const handleAddPhoneNumber = () => {
    if (newPhoneNumber.number.trim()) {
      const phoneNumber: PhoneNumber = {
        number: newPhoneNumber.number.trim(),
        status: newPhoneNumber.status,
        lastUsed: new Date().toISOString().split('T')[0],
        isPrimary: false,
        type: newPhoneNumber.type,
        relationship: newPhoneNumber.relationship,
        lastVerified: new Date().toISOString().split('T')[0],
        notes: newPhoneNumber.notes || undefined
      };
      
      onAddPhoneNumber(phoneNumber);
      
      // Reset form
      setNewPhoneNumber({
        number: '',
        status: 'working',
        type: 'mobile',
        relationship: 'alternate',
        notes: ''
      });
      setShowForm(false);
    }
  };

  if (showForm) {
    return (
      <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
        <div className="space-y-3">
          {/* Phone Number Input */}
          <div>
            <label className="block text-xs font-medium text-blue-900 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              className="w-full text-sm border border-blue-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newPhoneNumber.number}
              onChange={(e) => setNewPhoneNumber(prev => ({ ...prev, number: e.target.value }))}
              autoFocus
            />
          </div>
          
          {/* Status & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-blue-900 mb-1">Status</label>
              <select
                className="w-full text-sm border border-blue-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newPhoneNumber.status}
                onChange={(e) => setNewPhoneNumber(prev => ({ ...prev, status: e.target.value }))}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-blue-900 mb-1">Type</label>
              <select
                className="w-full text-sm border border-blue-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newPhoneNumber.type}
                onChange={(e) => setNewPhoneNumber(prev => ({ ...prev, type: e.target.value }))}
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.icon} {option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Relationship */}
          <div>
            <label className="block text-xs font-medium text-blue-900 mb-1">Relationship</label>
            <select
              className="w-full text-sm border border-blue-300 rounded px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newPhoneNumber.relationship}
              onChange={(e) => setNewPhoneNumber(prev => ({ ...prev, relationship: e.target.value }))}
            >
              {relationshipOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-blue-900 mb-1">Notes (Optional)</label>
            <textarea
              placeholder="Add any relevant notes..."
              className="w-full text-sm border border-blue-300 rounded px-3 py-2 bg-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              value={newPhoneNumber.notes}
              onChange={(e) => setNewPhoneNumber(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleAddPhoneNumber}
              className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
            >
              Add Phone Number
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center justify-center group"
      onClick={() => setShowForm(true)}
    >
      <div className="text-center">
        <div className="text-4xl text-gray-400 mb-3 group-hover:text-blue-400 transition-colors">+</div>
        <div className="text-sm text-gray-600 font-medium group-hover:text-gray-800 transition-colors">Add New Phone Number</div>
        <div className="text-xs text-gray-500 mt-1">Click to add contact information</div>
      </div>
    </div>
  );
}
