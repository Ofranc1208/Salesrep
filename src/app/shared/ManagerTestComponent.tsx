'use client';

import React, { useState } from 'react';
import { useDataFlow, LeadStatus, BaseLead } from './index';
import LeadStatusBadge from './LeadStatusBadge';

const ManagerTestComponent: React.FC = () => {
  const { leads, stats, addLead, assignLead, updateLeadStatus } = useDataFlow();
  const [selectedRep, setSelectedRep] = useState('rep-1');
  const [selectedCampaign, setSelectedCampaign] = useState('campaign-1');

  const handleAddTestLeads = () => {
    const testLeads: BaseLead[] = [
      {
        id: '1',
        crmId: '784841',
        clientName: 'James Takori',
        phoneNumbers: ['(800) 568-8087'],
        status: LeadStatus.NEW,
        insuranceCompany: 'Metlife',
        paymentAmount: 7000.00,
        startDate: '5/1/2024',
        endDate: '7/24/2048'
      },
      {
        id: '2',
        crmId: '786576',
        clientName: 'Cheryl Doel',
        phoneNumbers: ['(714) 508-1002'],
        status: LeadStatus.NEW,
        insuranceCompany: 'AGS',
        paymentAmount: 1594.73,
        startDate: '5/1/2024',
        endDate: '7/23/2053'
      }
    ];

    testLeads.forEach(lead => addLead(lead));
  };

  const handleAssignLead = (leadId: string) => {
    try {
      console.log('ManagerTestComponent: Assigning lead', { leadId, selectedRep, selectedCampaign });
      const assignment = assignLead(leadId, selectedRep, selectedCampaign);
      console.log('ManagerTestComponent: Assignment result', assignment);
    } catch (error) {
      console.error('Assignment failed:', error);
    }
  };

  const handleUpdateStatus = (leadId: string, status: LeadStatus) => {
    updateLeadStatus(leadId, status);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Manager Dashboard - Phase 2 Test</h2>
      
      <div className="mb-6">
        <button
          onClick={handleAddTestLeads}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        >
          Add Test Leads
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Assignment Controls</h3>
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sales Rep</label>
            <select
              value={selectedRep}
              onChange={(e) => setSelectedRep(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="rep-1">Client Relations Rep One</option>
              <option value="rep-2">Sales Rep Two</option>
              <option value="rep-3">Sales Rep Three</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="campaign-1">Metlife Campaign - May</option>
              <option value="campaign-2">AGS Campaign - Q2</option>
              <option value="campaign-3">General Campaign</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Assignment Statistics</h3>
        {stats && (
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <div className="font-medium text-blue-900">Total</div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalAssignments}</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <div className="font-medium text-yellow-900">Active</div>
              <div className="text-2xl font-bold text-yellow-600">{stats.activeAssignments}</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="font-medium text-green-900">Completed</div>
              <div className="text-2xl font-bold text-green-600">{stats.completedAssignments}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <div className="font-medium text-purple-900">Rep Workload</div>
              <div className="text-2xl font-bold text-purple-600">{Object.keys(stats.repWorkloads).length}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Test Leads ({leads.length})</h3>
        <div className="space-y-3">
          {leads.map(lead => (
            <div key={lead.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{lead.clientName}</h4>
                  <p className="text-sm text-gray-600">CRM: {lead.crmId}</p>
                  <p className="text-sm text-gray-600">{lead.insuranceCompany}</p>
                  <p className="text-sm text-gray-600">${lead.paymentAmount.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <LeadStatusBadge status={lead.status} />
                  {lead.status === LeadStatus.NEW && (
                    <button
                      onClick={() => handleAssignLead(lead.id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Assign to {selectedRep}
                    </button>
                  )}
                  {lead.status === LeadStatus.ASSIGNED && (
                    <button
                      onClick={() => handleUpdateStatus(lead.id, LeadStatus.CONTACTED)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Mark Contacted
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>✅ This component tests the Manager → Rep Dashboard data flow</p>
        <p>✅ Add test leads, assign them to sales reps, and watch the Rep Dashboard update</p>
        <p>✅ Check the Rep Dashboard to see the connection status and assigned leads</p>
        <p>✅ The Rep Dashboard will show real-time updates when leads are assigned</p>
      </div>
    </div>
  );
};

export default ManagerTestComponent;
