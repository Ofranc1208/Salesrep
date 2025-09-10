import React, { useState } from 'react';
import { SalesRep, MessageTemplate, Lead } from '../../utils/mock-data';
import { leadAssignmentService } from '../../../rep-dashboard/components/campaign-management/services/LeadAssignmentService';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLeadCount: number;
  selectedLeads: Lead[];
  salesReps: SalesRep[];
  messageTemplates: MessageTemplate[];
  onAssignmentComplete: () => void;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ 
    isOpen, 
    onClose, 
    selectedLeadCount,
    selectedLeads,
    salesReps,
    messageTemplates,
    onAssignmentComplete
}) => {
  const [selectedRepId, setSelectedRepId] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isAssigning, setIsAssigning] = useState(false);

  if (!isOpen) return null;

  const handleAssign = async () => {
    if (!selectedRepId) {
      alert('Please select a sales rep');
      return;
    }

    setIsAssigning(true);
    
    try {
      // Convert manager dashboard leads to assignment service format
      const leadsToAssign = selectedLeads.map(lead => ({
        id: lead.CBSI.toString(),
        clientFirstName: lead.clientFirstName,
        clientLastName: lead.clientLastName,
        phone1: lead.phone1,
        insuranceCompany: lead.insuranceCompany,
        payment100: lead.payment100,
        status: 'New' as const
      }));

      const selectedRep = salesReps.find(rep => rep.id === selectedRepId);
      const selectedTemplate = messageTemplates.find(t => t.id === selectedTemplateId);

      // Assign leads using the service
      const assignmentId = leadAssignmentService.assignLeadsToRep(
        leadsToAssign,
        selectedRepId,
        'manager-1', // Manager ID - could be dynamic
        'campaign-1', // Campaign ID - could be dynamic
        'Q1 Structured Settlement Buyout', // Campaign name
        selectedTemplate?.name,
        priority
      );

      console.log(`✅ Assignment created: ${assignmentId}`);
      
      // Show success message
      alert(`Successfully assigned ${selectedLeadCount} leads to ${selectedRep?.name}`);
      
      // Reset form and close
      setSelectedRepId('');
      setSelectedTemplateId('');
      setPriority('medium');
      onAssignmentComplete();
      onClose();
      
    } catch (error) {
      console.error('❌ Error assigning leads:', error);
      alert('Error assigning leads. Please try again.');
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Assign Leads</h2>
        <p className="mb-6">You are about to assign {selectedLeadCount} selected lead(s).</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sales Rep *</label>
            <select 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              value={selectedRepId}
              onChange={(e) => setSelectedRepId(e.target.value)}
            >
              <option value="">Select a Sales Rep</option>
              {salesReps.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.name} ({rep.activeLeads} active leads)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Message Template (Optional)</label>
            <select 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
            >
              <option value="">Select a Message Template</option>
              {messageTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            onClick={onClose}
            disabled={isAssigning}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            onClick={handleAssign}
            disabled={isAssigning || !selectedRepId}
          >
            {isAssigning ? 'Assigning...' : 'Confirm Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
