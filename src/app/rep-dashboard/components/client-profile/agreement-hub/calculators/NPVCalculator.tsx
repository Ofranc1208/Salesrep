'use client';

import React, { useState } from 'react';
import { Lead } from '../../../../types';

interface NPVCalculatorProps {
  selectedLead: Lead | null;
  calculatorData: any;
  onDataUpdate: (data: any) => void;
}

const NPVCalculator: React.FC<NPVCalculatorProps> = ({ 
  selectedLead, 
  calculatorData, 
  onDataUpdate 
}) => {
  const [paymentData, setPaymentData] = useState({
    monthlyAmount: 1000,
    startDate: '2024-01-01',
    endDate: '2034-01-01',
    paymentType: 'life-contingent',
    baseRate: 8.5,
    healthAdjustment: 0
  });

  const calculateNPV = () => {
    const { monthlyAmount, baseRate, healthAdjustment } = paymentData;
    const adjustedRate = (baseRate + healthAdjustment) / 100;
    const months = 120; // 10 years example
    
    let npv = 0;
    for (let month = 1; month <= months; month++) {
      const discountFactor = Math.pow(1 + adjustedRate / 12, month);
      npv += monthlyAmount / discountFactor;
    }
    
    return npv;
  };

  const npvResult = calculateNPV();
  const totalPayments = parseFloat(paymentData.monthlyAmount.toString()) * 120;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">NPV Calculator with Health Adjustments</h2>
          <p className="text-sm text-gray-600">Calculate present value with health-adjusted discount rates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Payment Amount</label>
                <input
                  type="number"
                  value={paymentData.monthlyAmount}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, monthlyAmount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter monthly amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                <select
                  value={paymentData.paymentType}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, paymentType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="guaranteed">Guaranteed Payments</option>
                  <option value="life-contingent">Life Contingent Payments</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Discount Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={paymentData.baseRate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, baseRate: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Health Risk Adjustment (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={paymentData.healthAdjustment}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, healthAdjustment: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Additional risk adjustment"
                />
              </div>

              {calculatorData.bmi && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">BMI-Based Adjustment</h4>
                  <p className="text-xs text-blue-600">
                    BMI: {calculatorData.bmi.value} ({calculatorData.bmi.category})
                  </p>
                  <p className="text-xs text-blue-600">
                    Suggested adjustment: +{calculatorData.bmi.rateAdjustment}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">NPV Calculation Results</h3>
            
            <div className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${npvResult.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-green-600">Present Value</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {(paymentData.baseRate + paymentData.healthAdjustment).toFixed(1)}%
                  </div>
                  <div className="text-xs text-blue-600">Adjusted Rate</div>
                </div>
              </div>

              {/* Comparison */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Value Comparison</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Future Payments:</span>
                    <span className="font-medium">${totalPayments.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Present Value:</span>
                    <span className="font-medium">${npvResult.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Discount Amount:</span>
                    <span className="font-medium text-red-600">
                      ${(totalPayments - npvResult).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount Percentage:</span>
                    <span className="font-medium">
                      {(((totalPayments - npvResult) / totalPayments) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Rate Breakdown */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-purple-800 mb-3">Rate Breakdown</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-purple-600">Base Rate:</span>
                    <span>{paymentData.baseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-600">Health Adjustment:</span>
                    <span>+{paymentData.healthAdjustment}%</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-medium">
                    <span className="text-purple-600">Final Rate:</span>
                    <span>{(paymentData.baseRate + paymentData.healthAdjustment).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPVCalculator;
