'use client';

import React, { useState } from 'react';
import { Lead } from '../../../../types';
import { CalculatorData, BMIResult, LifeInsuranceResult, NPVResult, PrequalificationResult } from './types';
import BMICalculator from './BMICalculator';
import HealthRiskAssessment from './HealthRiskAssessment';
import NPVCalculator from './NPVCalculator';
import PrequalificationEngine from './PrequalificationEngine';

interface CalculatorsMainProps {
  selectedLead: Lead | null;
}

const CalculatorsMain: React.FC<CalculatorsMainProps> = ({ selectedLead }) => {
  const [activeCalculator, setActiveCalculator] = useState<string>('bmi');
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    bmi: null,
    healthRisk: null,
    npv: null,
    prequalification: null
  });

  const calculators = [
    {
      id: 'bmi',
      name: 'BMI Calculator',
      icon: '⚖️',
      description: 'Calculate BMI and weight category',
      component: BMICalculator
    },
    {
      id: 'health-risk',
      name: 'Life Insurance Assessment',
      icon: '🏥',
      description: 'Insurability analysis & coverage calculator',
      component: HealthRiskAssessment
    },
    {
      id: 'npv',
      name: 'NPV Calculator',
      icon: '💰',
      description: 'Calculate adjusted NPV with health factors',
      component: NPVCalculator
    },
    {
      id: 'prequalification',
      name: 'Pre-qualification Engine',
      icon: '🎯',
      description: 'Determine Fasano submission recommendation',
      component: PrequalificationEngine
    }
  ];

  const activeCalc = calculators.find(calc => calc.id === activeCalculator);
  const ActiveComponent = activeCalc?.component;

  const handleDataUpdate = (calculatorId: keyof CalculatorData, data: BMIResult | LifeInsuranceResult | NPVResult | PrequalificationResult) => {
    setCalculatorData(prev => ({
      ...prev,
      [calculatorId]: data
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🧮</span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Health & NPV Calculators</h3>
            <p className="text-xs text-gray-500">Pre-qualification Assessment Tools</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Calculator Navigation */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Available Tools</h4>
            <div className="space-y-2">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                    activeCalculator === calc.id
                      ? 'bg-purple-50 border-purple-200 text-purple-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-sm mt-0.5">{calc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs">{calc.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{calc.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cost Savings Alert */}
          <div className="mx-3 mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-red-600 text-sm">💰</span>
              <span className="text-xs font-medium text-red-800">Cost Alert</span>
            </div>
            <p className="text-xs text-red-600">Each Fasano submission costs $200. Use these tools to pre-qualify candidates.</p>
          </div>

          {/* Data Summary */}
          <div className="mt-auto p-3 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Assessment Summary</h4>
            <div className="space-y-2 text-xs">
              {calculatorData.bmi && (
                <div className="flex justify-between">
                  <span className="text-gray-500">BMI:</span>
                  <span className="font-medium">{calculatorData.bmi.value}</span>
                </div>
              )}
              {calculatorData.healthRisk && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Risk Score:</span>
                  <span className="font-medium">{calculatorData.healthRisk.score}%</span>
                </div>
              )}
              {calculatorData.prequalification && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Recommendation:</span>
                  <span className={`font-medium ${
                    calculatorData.prequalification.recommendation === 'approve' ? 'text-green-600' :
                    calculatorData.prequalification.recommendation === 'review' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {calculatorData.prequalification.recommendation?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calculator Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {ActiveComponent && (
            <ActiveComponent
              selectedLead={selectedLead}
              calculatorData={calculatorData}
              onDataUpdate={(data: any) => handleDataUpdate(activeCalculator as keyof CalculatorData, data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorsMain;
