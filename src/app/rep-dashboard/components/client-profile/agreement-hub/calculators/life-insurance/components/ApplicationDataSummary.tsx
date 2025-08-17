import React from 'react';
import { ApplicationData } from '../types';

interface ApplicationDataSummaryProps {
  applicationData: ApplicationData;
}

const ApplicationDataSummary: React.FC<ApplicationDataSummaryProps> = ({ applicationData }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
      <h3 className="text-xs font-medium text-blue-800 mb-1">📋 From Completed Application</h3>
      <div className="grid grid-cols-6 gap-3 text-xs">
        <div className="text-center">
          <div className="text-sm font-semibold text-blue-900">{applicationData.age}</div>
          <div className="text-blue-600 text-xs">Age</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-blue-900">${(applicationData.annualIncome / 1000)}K</div>
          <div className="text-blue-600 text-xs">Income</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-blue-900">{applicationData.occupation}</div>
          <div className="text-blue-600 text-xs">Occupation</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-blue-900">${applicationData.monthlyPayment}</div>
          <div className="text-blue-600 text-xs">Monthly Pay</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-blue-900">{applicationData.paymentYears}y</div>
          <div className="text-blue-600 text-xs">Term</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-blue-900">${(applicationData.existingLifeInsurance / 1000)}K</div>
          <div className="text-blue-600 text-xs">Existing LI</div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDataSummary;
