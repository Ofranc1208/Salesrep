'use client';

import React, { useState } from 'react';
import { Lead, mockLeadLists, mockSalesReps, mockMessageTemplates, MessageTemplate, LeadList } from './utils/mock-data';
import LeftPanel from './components/left-panel/LeftPanel';
import MainArea from './components/main-area/MainArea';
import Header from './components/header/Header';

export default function ManagerDashboard() {
  const [leadLists, setLeadLists] = useState(mockLeadLists);
  const [activeListId, setActiveListId] = useState(mockLeadLists[0]?.id || '');
  const [leads, setLeads] = useState<Lead[]>(mockLeadLists[0]?.leads || []);
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>({});
  const [showAssignControls, setShowAssignControls] = useState(false);
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>(mockMessageTemplates);

  const handleSelectList = (listId: string) => {
    setActiveListId(listId);
    const selectedList = leadLists.find(list => list.id === listId);
    if (selectedList) {
      setLeads(selectedList.leads);
    }
  };

  const handleFileUpload = (newLeads: Lead[], fileName: string) => {
    // Create a new list from uploaded leads
    const newList: LeadList = {
      id: `uploaded-${Date.now()}`,
      name: `Uploaded: ${fileName.replace('.csv', '')}`,
      leads: newLeads
    };
    
    // Add to existing lists
    const updatedLists = [...leadLists, newList];
    setLeadLists(updatedLists);
    
    // Set as active list
    setActiveListId(newList.id);
    setLeads(newLeads);
    
    // Clear row selection for new data
    setRowSelection({});
  };

  const handleAssignClick = () => {
    setShowAssignControls(!showAssignControls);
  };

  const handleTemplatesChange = (newTemplates: MessageTemplate[]) => {
    setMessageTemplates(newTemplates);
  };

  const handleDeleteList = (listId: string) => {
    // Remove the list from leadLists
    const updatedLists = leadLists.filter(list => list.id !== listId);
    setLeadLists(updatedLists);
    
    // If we're deleting the currently active list, switch to the first available list
    if (listId === activeListId) {
      if (updatedLists.length > 0) {
        setActiveListId(updatedLists[0].id);
        setLeads(updatedLists[0].leads);
      } else {
        // If no lists remain, clear everything
        setActiveListId('');
        setLeads([]);
      }
      // Clear row selection
      setRowSelection({});
    }
  };

  const activeList = leadLists.find(list => list.id === activeListId);

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <Header 
        activeList={activeList}
        selectedCount={Object.keys(rowSelection).length}
        totalLeads={leads.length}
      />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Fixed Width */}
        <div className="w-72 flex-shrink-0 bg-white shadow-lg overflow-y-auto">
          <LeftPanel
            leadLists={leadLists}
            activeListId={activeListId}
            onSelectList={handleSelectList}
            onFileUpload={handleFileUpload}
            onAssignClick={handleAssignClick}
            selectedLeadCount={Object.keys(rowSelection).length}
            showAssignControls={showAssignControls}
            messageTemplates={messageTemplates}
            onTemplatesChange={handleTemplatesChange}
            onDeleteList={handleDeleteList}
          />
        </div>
        
        {/* Main Content Area - Flexible Width */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <MainArea
            leads={leads}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            messageTemplates={messageTemplates}
          />
        </div>
      </div>
    </div>
  );
}