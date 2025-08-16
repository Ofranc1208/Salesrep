'use client';

import React from 'react';
import { useDataFlow, LeadStatus, BaseLead } from './index';
import LeadStatusBadge from './LeadStatusBadge';

const IntegrationTest: React.FC = () => {
  const { leads, stats, loading, addLead, assignLead, updateLeadStatus } = useDataFlow();

  const handleAddTestLeads = () => {
    const testLeads: BaseLead[] = [
      {
        id: '1',
        crmId: '784841',
        clientName: 'John Doe',
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
        clientName: 'Jane Smith',
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
      assignLead(leadId, 'rep-1', 'campaign-1');
    } catch (error) {
      console.error('Assignment failed:', error);
    }
  };

  const handleUpdateStatus = (leadId: string, status: LeadStatus) => {
    updateLeadStatus(leadId, status);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Phase 1 Integration Test</h2>
      
      <div className="mb-6">
        <button
          onClick={handleAddTestLeads}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        >
          Add Test Leads
        </button>
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
                      Assign
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
                  {lead.status === LeadStatus.CONTACTED && (
                    <button
                      onClick={() => handleUpdateStatus(lead.id, LeadStatus.RESPONDED)}
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                    >
                      Mark Responded
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>✅ This component tests the shared data flow between dashboards</p>
        <p>✅ Try adding test leads, assigning them, and updating their status</p>
        <p>✅ Watch the statistics update in real-time</p>
        <p>✅ Check the console for event logs showing data flow</p>
      </div>
    </div>
  );
};

export default IntegrationTest;
