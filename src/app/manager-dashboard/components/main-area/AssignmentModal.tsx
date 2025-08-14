import React from 'react';
import { SalesRep, MessageTemplate } from '../../utils/mock-data';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLeadCount: number;
  salesReps: SalesRep[];
  messageTemplates: MessageTemplate[];
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ 
    isOpen, 
    onClose, 
    selectedLeadCount,
    salesReps,
    messageTemplates
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Assign Leads</h2>
        <p className="mb-6">You are about to assign {selectedLeadCount} selected lead(s).</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sales Rep</label>
            <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
              <option>Select a Sales Rep</option>
              {salesReps.map((rep) => (
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
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
