'use client'; // This directive is necessary for using hooks like useState

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Lead, LeadList, SalesRep, mockLeadLists, mockSalesReps, mockMessageTemplates } from '../../utils/mock-data';
import TemplateManager from '../template-manager/TemplateManager';

interface LeftPanelProps {
  onFileUpload: (leads: Lead[], fileName: string) => void;
  leadLists: LeadList[];
  activeListId: string;
  onSelectList: (listId: string) => void;
  selectedLeadCount: number;
  onAssignClick: () => void;
  showAssignControls: boolean;
  messageTemplates: any[]; // Assuming messageTemplates is an array of objects
  onTemplatesChange: (templates: any[]) => void;
  onDeleteList?: (listId: string) => void; // Added for list deletion
}

const LeftPanel: React.FC<LeftPanelProps> = ({ 
    onFileUpload, 
    leadLists, 
    activeListId, 
    onSelectList,
    selectedLeadCount,
    onAssignClick,
    showAssignControls,
    messageTemplates,
    onTemplatesChange,
    onDeleteList // Added for list deletion
}) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; listId: string; listName: string; warning?: string; isActiveList?: boolean }>({ isOpen: false, listId: '', listName: '' });

  const handleDeleteList = (listId: string, listName: string) => {
    // Prevent deletion if this is the last list
    if (leadLists.length <= 1) {
      setUploadMessage('Cannot delete the last remaining list. Please upload a new list first.');
      setUploadStatus('error');
      return;
    }
    
    // Special warning if deleting the active list
    const isActiveList = listId === activeListId;
    const warningMessage = isActiveList 
      ? `⚠️ WARNING: You are about to delete the currently active list "${listName}". This will switch you to another list. Are you sure?`
      : `Are you sure you want to delete the list "${listName}"? This action cannot be undone.`;
    
    setDeleteConfirmation({ 
      isOpen: true, 
      listId, 
      listName,
      warning: warningMessage,
      isActiveList
    });
  };

  const confirmDelete = () => {
    // Find the list to delete
    const listToDelete = leadLists.find(list => list.id === deleteConfirmation.listId);
    if (listToDelete) {
      // Remove the list from leadLists
      const updatedLists = leadLists.filter(list => list.id !== deleteConfirmation.listId);
      
      // If we're deleting the currently active list, switch to the first available list
      if (deleteConfirmation.listId === activeListId) {
        if (updatedLists.length > 0) {
          onSelectList(updatedLists[0].id);
        } else {
          // If no lists remain, clear the current leads
          onFileUpload([], '');
        }
      }
      
      // Update the parent component's lead lists
      // We need to add this prop to handle list deletion
      if (onDeleteList) {
        onDeleteList(deleteConfirmation.listId);
      }
    }
    
    // Close the confirmation modal
    setDeleteConfirmation({ isOpen: false, listId: '', listName: '' });
  };

  const validateLeadData = (data: any[]): Lead[] => {
    const validLeads: Lead[] = [];
    const errors: string[] = [];
    
    data.forEach((row, index) => {
      // Check required fields
      if (!row.paymentType || !row.CBSI || !row.repFirstName || !row.clientFirstName || !row.clientLastName) {
        errors.push(`Row ${index + 1}: Missing required fields`);
        return;
      }
      
      // Validate payment type
      if (!['LCP', 'Guaranteed'].includes(row.paymentType)) {
        errors.push(`Row ${index + 1}: Invalid payment type. Must be 'LCP' or 'Guaranteed'`);
        return;
      }
      
      // Validate CBSI is a number
      if (isNaN(Number(row.CBSI))) {
        errors.push(`Row ${index + 1}: CBSI must be a number`);
        return;
      }
      
      // Validate numeric fields
      const numericFields = ['payment100', 'payment50', 'offerAt100Low', 'offerAt100High', 'offerAt50Low', 'offerAt50High', 'lifeInsurancePayment100', 'lifeInsurancePayment50'];
      numericFields.forEach(field => {
        if (row[field] && isNaN(Number(row[field]))) {
          errors.push(`Row ${index + 1}: ${field} must be a number`);
        }
      });
      
      // If all validations pass, add to valid leads
      validLeads.push({
        paymentType: row.paymentType,
        CBSI: Number(row.CBSI),
        repFirstName: row.repFirstName,
        clientFirstName: row.clientFirstName,
        clientLastName: row.clientLastName,
        insuranceCompany: row.insuranceCompany || '',
        paymentStrtDate: row.paymentStrtDate || '',
        paymentEndDate: row.paymentEndDate || '',
        payment100: Number(row.payment100) || 0,
        payment50: Number(row.payment50) || 0,
        offerAt100Low: Number(row.offerAt100Low) || 0,
        offerAt100High: Number(row.offerAt100High) || 0,
        offerAt50Low: Number(row.offerAt50Low) || 0,
        offerAt50High: Number(row.offerAt50High) || 0,
        lifeInsurancePayment100: Number(row.lifeInsurancePayment100) || 0,
        lifeInsurancePayment50: Number(row.lifeInsurancePayment50) || 0,
        phone1: row.phone1 || '',
        phone2: row.phone2 || '',
        phone3: row.phone3 || '',
        status: row.status || 'New'
      });
    });
    
    if (errors.length > 0) {
      setUploadMessage(`Validation errors: ${errors.join(', ')}`);
      setUploadStatus('error');
      return [];
    }
    
    return validLeads;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      setUploadMessage('Processing file...');
      setUploadedFileName(file.name);
      
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            setUploadStatus('error');
            setUploadMessage(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`);
            return;
          }
          
          const validLeads = validateLeadData(results.data);
          if (validLeads.length > 0) {
            setUploadStatus('success');
            setUploadMessage(`Successfully uploaded ${validLeads.length} leads`);
            onFileUpload(validLeads, file.name);
          }
        },
        error: (error) => {
          setUploadStatus('error');
          setUploadMessage(`Upload error: ${error.message}`);
        }
      });
    }
  };

  return (
    <aside className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Active Lead List</h3>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={activeListId}
            onChange={(e) => onSelectList(e.target.value)}
          >
            {leadLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.id.startsWith('uploaded-') ? '📁 ' : '📋 '}{list.name} ({list.leads.length} leads)
              </option>
            ))}
          </select>
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
                      onClick={() => handleDeleteList(activeListId, leadLists.find(l => l.id === activeListId)?.name || '')}
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
            <h3 className="text-lg font-semibold mb-2">Uploaded Lists</h3>
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
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                      {list.id !== activeListId && (
                        <button 
                          onClick={() => onSelectList(list.id)}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 border border-blue-200"
                          title="Switch to this list"
                        >
                          📋 Switch
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteList(list.id, list.name)}
                        className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100 border border-red-200"
                        title="Delete this list"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Lead File Upload</h3>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">CSV files only</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
            </label>
          </div>
          {uploadedFileName && <p className="mt-2 text-sm text-gray-600">File: {uploadedFileName}</p>}
          {uploadStatus === 'uploading' && <p className="mt-2 text-sm text-blue-600">{uploadMessage}</p>}
          {uploadStatus === 'success' && (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-green-600">{uploadMessage}</p>
              <button 
                onClick={() => {
                  setUploadStatus('idle');
                  setUploadMessage('');
                  setUploadedFileName(null);
                  const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
                  if (fileInput) fileInput.value = '';
                }}
                className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200"
              >
                Upload Another File
              </button>
            </div>
          )}
          {uploadStatus === 'error' && (
            <div className="mt-2 space-y-2">
              <p className="text-sm text-red-600">{uploadMessage}</p>
              <button 
                onClick={() => {
                  setUploadStatus('idle');
                  setUploadMessage('');
                  setUploadedFileName(null);
                  const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
                  if (fileInput) fileInput.value = '';
                }}
                className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Actions</h3>
            
            <button 
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              onClick={onAssignClick}
              disabled={selectedLeadCount === 0}
            >
                Assign Leads ({selectedLeadCount})
            </button>

            {/* --- Assign Controls (Conditional) --- */}
            {showAssignControls && (
              <div className="bg-gray-300 p-4 rounded-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sales Rep</label>
                  <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                    <option>Select a Sales Rep</option>
                    {mockSalesReps.map((rep) => (
                      <option key={rep.id} value={rep.id}>
                        {rep.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message Template</label>
                  <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
                    <option>Select a Message Template</option>
                    {mockMessageTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">
                    Confirm Assignment
                </button>
              </div>
            )}
            {/* --- End Assign Controls --- */}

            <button 
              className="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsTemplateManagerOpen(true)}
            >
                Manage Templates
            </button>
            <button className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                Send Test
            </button>
        </div>
      </div>

      {/* Template Manager Modal */}
      {isTemplateManagerOpen && (
        <TemplateManager
          templates={messageTemplates}
          onTemplatesChange={onTemplatesChange}
          onClose={() => setIsTemplateManagerOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="text-center">
              <h3 className={`text-lg font-semibold leading-6 ${deleteConfirmation.isActiveList ? 'text-red-600' : 'text-gray-900'}`}>
                {deleteConfirmation.isActiveList ? '⚠️ Delete Active List' : 'Confirm Deletion'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {deleteConfirmation.warning || `Are you sure you want to delete the list "${deleteConfirmation.listName}"? This action cannot be undone.`}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={confirmDelete}
                  className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ${
                    deleteConfirmation.isActiveList 
                      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                      : 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                  }`}
                >
                  {deleteConfirmation.isActiveList ? 'Delete Active List' : 'Delete'}
                </button>
                <button
                  onClick={() => setDeleteConfirmation({ ...deleteConfirmation, isOpen: false })}
                  className="mt-3 px-4 py-2 bg-gray-200 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftPanel;
