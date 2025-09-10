'use client';

import React, { useState } from 'react';
import { Lead, LeadList } from '../../utils/mock-data';
import TemplateManager from '../template-manager/TemplateManager';

// Import sub-components
import FileUploadSection from './FileUploadSection';
import LeadListManagement from './LeadListManagement';
import AssignmentControls from './AssignmentControls';
import ActionButtons from './ActionButtons';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface LeftPanelProps {
  onFileUpload: (leads: Lead[], fileName: string) => void;
  leadLists: LeadList[];
  activeListId: string;
  onSelectList: (listId: string) => void;
  selectedLeadCount: number;
  onAssignClick: () => void;
  showAssignControls: boolean;
  messageTemplates: any[];
  onTemplatesChange: (templates: any[]) => void;
  onDeleteList?: (listId: string) => void;
  selectedLeads: Lead[];
  onAssignmentComplete: () => void;
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
  onDeleteList,
  selectedLeads,
  onAssignmentComplete
}) => {
  // File upload state
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  
  // Template manager state
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false);
  
  // Delete confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    listId: string;
    listName: string;
    warning?: string;
    isActiveList?: boolean;
  }>({ isOpen: false, listId: '', listName: '' });

  // Delete handlers
  const handleDeleteClick = (listId: string, listName: string) => {
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
      : undefined;
      
    setDeleteConfirmation({
      isOpen: true,
      listId,
      listName,
      warning: warningMessage,
      isActiveList
    });
  };

  const confirmDelete = () => {
    if (onDeleteList) {
      onDeleteList(deleteConfirmation.listId);
    }
    setDeleteConfirmation({ isOpen: false, listId: '', listName: '' });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, listId: '', listName: '' });
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Lead Management</h2>
        
        <div className="space-y-6">
        {/* File Upload Section */}
        <FileUploadSection
          onFileUpload={onFileUpload}
          uploadStatus={uploadStatus}
          setUploadStatus={setUploadStatus}
          uploadMessage={uploadMessage}
          setUploadMessage={setUploadMessage}
          uploadedFileName={uploadedFileName}
          setUploadedFileName={setUploadedFileName}
        />

        {/* Lead List Management */}
        <LeadListManagement
          leadLists={leadLists}
          activeListId={activeListId}
          onSelectList={onSelectList}
          onDeleteClick={handleDeleteClick}
        />

        {/* Assignment Controls */}
        <AssignmentControls
          selectedLeadCount={selectedLeadCount}
          onAssignClick={onAssignClick}
          showAssignControls={showAssignControls}
          selectedLeads={selectedLeads}
          onAssignmentComplete={onAssignmentComplete}
        />

        {/* Action Buttons */}
        <ActionButtons
          onManageTemplates={() => setIsTemplateManagerOpen(true)}
        />
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
      <DeleteConfirmationModal
        deleteConfirmation={deleteConfirmation}
        onConfirmDelete={confirmDelete}
        onCancelDelete={cancelDelete}
      />
    </div>
  );
};

export default LeftPanel;