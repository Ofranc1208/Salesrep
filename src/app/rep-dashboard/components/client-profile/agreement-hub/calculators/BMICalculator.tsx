'use client';

import React, { useState, useEffect } from 'react';
import { Lead } from '../../../../types';

interface BMICalculatorProps {
  selectedLead: Lead | null;
  calculatorData: any;
  onDataUpdate: (data: any) => void;
}

interface BMIResult {
  value: number;
  category: string;
  riskFactor: number;
  mortalityRating: number;
  lifeExpectancyReduction: number;
  rateAdjustment: number;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ 
  selectedLead, 
  calculatorData, 
  onDataUpdate 
}) => {
  // Get height and weight from application data (mock data for now)
  const applicationData = {
    height: { feet: 5, inches: 10 }, // This would come from the application form
    weight: 180 // This would come from the application form
  };
  
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  const calculateBMI = (weightLbs: number, heightFeet: number, heightInches: number): BMIResult => {
    const totalInches = (heightFeet * 12) + heightInches;
    const bmi = (weightLbs * 703) / (totalInches * totalInches);
    
    let category = '';
    let riskFactor = 0;
    let mortalityRating = 100;
    let lifeExpectancyReduction = 0;
    let rateAdjustment = 0;

    if (bmi < 18.5) {
      category = 'Underweight';
      riskFactor = 0.015;
      mortalityRating = 110;
      lifeExpectancyReduction = 1;
      rateAdjustment = 1.5;
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
      riskFactor = 0;
      mortalityRating = 100;
      lifeExpectancyReduction = 0;
      rateAdjustment = 0;
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      riskFactor = 0.03;
      mortalityRating = 120;
      lifeExpectancyReduction = 2;
      rateAdjustment = 3.0;
    } else if (bmi >= 30 && bmi < 35) {
      category = 'Obese Class I';
      riskFactor = 0.06;
      mortalityRating = 150;
      lifeExpectancyReduction = 4;
      rateAdjustment = 6.0;
    } else if (bmi >= 35 && bmi < 40) {
      category = 'Obese Class II';
      riskFactor = 0.09;
      mortalityRating = 200;
      lifeExpectancyReduction = 6;
      rateAdjustment = 9.0;
    } else {
      category = 'Obese Class III';
      riskFactor = 0.12;
      mortalityRating = 300;
      lifeExpectancyReduction = 10;
      rateAdjustment = 12.0;
    }

    return {
      value: Math.round(bmi * 10) / 10,
      category,
      riskFactor,
      mortalityRating,
      lifeExpectancyReduction,
      rateAdjustment
    };
  };

  useEffect(() => {
    const result = calculateBMI(applicationData.weight, applicationData.height.feet, applicationData.height.inches);
    setBmiResult(result);
    onDataUpdate(result);
  }, [applicationData, onDataUpdate]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Normal Weight': return 'text-green-600 bg-green-50 border-green-200';
      case 'Underweight': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Overweight': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Obese Class I': return 'text-red-600 bg-red-50 border-red-200';
      case 'Obese Class II': return 'text-red-700 bg-red-100 border-red-300';
      case 'Obese Class III': return 'text-red-800 bg-red-200 border-red-400';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">BMI Risk Assessment</h2>
          <p className="text-sm text-gray-600">Body Mass Index analysis from application data</p>
        </div>

        {/* Application Data Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">📋 From Application Form</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-blue-900">{applicationData.height.feet}'{applicationData.height.inches}"</div>
              <div className="text-blue-600">Height</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-900">{applicationData.weight} lbs</div>
              <div className="text-blue-600">Weight</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-900">{bmiResult?.value || '--'}</div>
              <div className="text-blue-600">BMI</div>
            </div>
          </div>
        </div>

        {bmiResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* BMI Classification */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Classification</h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">{bmiResult.value}</div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(bmiResult.category)}`}>
                  {bmiResult.category}
                </div>
              </div>

              {/* BMI Scale Reference */}
              <div className="space-y-2 text-xs">
                {[
                  { range: '< 18.5', label: 'Underweight', current: bmiResult.value < 18.5 },
                  { range: '18.5 - 24.9', label: 'Normal Weight', current: bmiResult.value >= 18.5 && bmiResult.value < 25 },
                  { range: '25.0 - 29.9', label: 'Overweight', current: bmiResult.value >= 25 && bmiResult.value < 30 },
                  { range: '30.0 - 34.9', label: 'Obese Class I', current: bmiResult.value >= 30 && bmiResult.value < 35 },
                  { range: '35.0 - 39.9', label: 'Obese Class II', current: bmiResult.value >= 35 && bmiResult.value < 40 },
                  { range: '≥ 40.0', label: 'Obese Class III', current: bmiResult.value >= 40 }
                ].map((item, index) => (
                  <div key={index} className={`flex justify-between items-center py-2 px-3 rounded ${
                    item.current ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
                  }`}>
                    <span className={item.current ? 'font-medium text-purple-900' : 'text-gray-700'}>{item.label}</span>
                    <span className={item.current ? 'text-purple-600' : 'text-gray-500'}>{item.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mortality Risk Impact</h3>
              
              {/* Risk Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-600">{bmiResult.mortalityRating}%</div>
                  <div className="text-xs text-blue-600">Mortality Rating</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-orange-600">+{bmiResult.rateAdjustment}%</div>
                  <div className="text-xs text-orange-600">Rate Adjustment</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-red-600">{bmiResult.lifeExpectancyReduction}</div>
                  <div className="text-xs text-red-600">Years Reduction</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-600">{(bmiResult.riskFactor * 100).toFixed(1)}%</div>
                  <div className="text-xs text-purple-600">Risk Factor</div>
                </div>
              </div>

              {/* Risk Explanation */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Impact Summary</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Mortality rating: {bmiResult.mortalityRating}% of standard</p>
                  <p>• Discount rate increase: +{bmiResult.rateAdjustment}%</p>
                  <p>• Life expectancy reduction: {bmiResult.lifeExpectancyReduction} years</p>
                  {bmiResult.mortalityRating > 150 && (
                    <p className="text-red-600 font-medium">⚠️ High risk - consider additional underwriting</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
