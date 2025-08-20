'use client';

import React from 'react';
import { Lead } from '../../../../types';

interface DataQualitySummaryProps {
  validLeads: Lead[];
}

export default function DataQualitySummary({ validLeads }: DataQualitySummaryProps) {
  const completeProfiles = validLeads.filter(lead => 
    lead.clientInfo?.ssn !== 'Not Available' && 
    lead.clientInfo?.dateOfBirth !== 'Not Available' &&
    lead.phoneNumbers.some(p => p.number !== 'Not Available')
  ).length;

  const validPhoneNumbers = validLeads.filter(lead => 
    lead.phoneNumbers.some(p => p.number !== 'Not Available')
  ).length;

  const paymentInfo = validLeads.filter(lead => 
    lead.structuredSettlement.monthlyPayment !== 'Not Available'
  ).length;

  const highPriority = validLeads.filter(lead => lead.priority === 'High').length;

  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h4 className="font-semibold text-blue-900 mb-3">📊 Data Quality Summary</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="font-medium text-blue-900">Complete Profiles</div>
          <div className="text-blue-700">
            {completeProfiles} / {validLeads.length}
          </div>
        </div>
        
        <div>
          <div className="font-medium text-blue-900">Valid Phone Numbers</div>
          <div className="text-blue-700">
            {validPhoneNumbers} / {validLeads.length}
          </div>
        </div>
        
        <div>
          <div className="font-medium text-blue-900">Payment Info</div>
          <div className="text-blue-700">
            {paymentInfo} / {validLeads.length}
          </div>
        </div>
        
        <div>
          <div className="font-medium text-blue-900">High Priority</div>
          <div className="text-blue-700">
            {highPriority} leads
          </div>
        </div>
      </div>
    </div>
  );
}
