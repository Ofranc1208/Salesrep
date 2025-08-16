'use client';

import React from 'react';
import { LeadList } from '../../utils/mock-data';

interface LeadListManagementProps {
  leadLists: LeadList[];
  activeListId: string;
  onSelectList: (listId: string) => void;
  onDeleteList?: (listId: string) => void;
  onDeleteClick: (listId: string, listName: string) => void;
}

export default function LeadListManagement({
  leadLists,
  activeListId,
  onSelectList,
  onDeleteClick
}: LeadListManagementProps) {

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Lead Lists</h3>
      
      {/* Lead List Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Lead List</label>
        <select
          value={activeListId}
          onChange={(e) => onSelectList(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Select a lead list...</option>
          {leadLists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.id.startsWith('uploaded-') ? '📁 ' : '📋 '}{list.name} ({list.leads.length} leads)
            </option>
          ))}
        </select>
        
        {/* Active List Info */}
        {activeListId && (
          <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-blue-800">
                  <strong>Current:</strong> {leadLists.find(l => l.id === activeListId)?.name}
                </p>
                <p className="text-xs text-blue-600">
                  {leadLists.find(l => l.id === activeListId)?.leads.length || 0} leads loaded
                </p>
              </div>
              {leadLists.find(l => l.id === activeListId)?.id.startsWith('uploaded-') && (
                <div className="ml-3">
                  <button 
                    onClick={() => onDeleteClick(activeListId, leadLists.find(l => l.id === activeListId)?.name || '')}
                    className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100 border border-red-200 transition-colors duration-200"
                    title="Delete this list"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Lists Management */}
      {leadLists.filter(list => list.id.startsWith('uploaded-')).length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-2">Uploaded Lists</h4>
          <p className="text-xs text-gray-600 mb-3">Hover over a list to see actions</p>
          <div className="space-y-2">
            {leadLists.filter(list => list.id.startsWith('uploaded-')).map((list) => (
              <div key={list.id} className="group relative p-3 bg-white rounded-md border hover:border-gray-300 transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500">📁</span>
                      <p className="text-sm font-medium text-gray-800">{list.name}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{list.leads.length} leads</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {list.id === activeListId ? '🟢 Active' : '⚪ Inactive'}
                    </p>
                  </div>
                  
                  {/* Action buttons - visible on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                    {list.id !== activeListId && (
                      <button
                        onClick={() => onSelectList(list.id)}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 border border-blue-200 transition-colors duration-200"
                        title="Make this list active"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteClick(list.id, list.name)}
                      className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100 border border-red-200 transition-colors duration-200"
                      title="Delete this list"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
