'use client';

import React, { useState, useEffect } from 'react';
import { Lead } from '../../../../types';

interface PrequalificationEngineProps {
  selectedLead: Lead | null;
  calculatorData: any;
  onDataUpdate: (data: any) => void;
}

interface PrequalificationResult {
  recommendation: 'approve' | 'review' | 'decline';
  riskScore: number;
  costSavings: number;
  reasons: string[];
  confidence: number;
}

const PrequalificationEngine: React.FC<PrequalificationEngineProps> = ({ 
  selectedLead, 
  calculatorData, 
  onDataUpdate 
}) => {
  const [result, setResult] = useState<PrequalificationResult | null>(null);

  const calculatePrequalification = (): PrequalificationResult => {
    let riskScore = 100; // Base score
    const reasons: string[] = [];
    let costSavings = 0;

    // BMI Assessment
    if (calculatorData.bmi) {
      const bmi = calculatorData.bmi;
      if (bmi.mortalityRating > 300) {
        riskScore += 200;
        reasons.push(`High BMI risk: ${bmi.category} (${bmi.value})`);
      } else if (bmi.mortalityRating > 150) {
        riskScore += 100;
        reasons.push(`Moderate BMI risk: ${bmi.category}`);
      }
    }

    // Health Risk Assessment
    if (calculatorData.healthRisk) {
      const healthScore = calculatorData.healthRisk.score;
      if (healthScore > 400) {
        riskScore += 300;
        reasons.push(`Multiple high-risk medical conditions`);
      } else if (healthScore > 200) {
        riskScore += 150;
        reasons.push(`Moderate medical risk factors`);
      }
    }

    // Determine recommendation
    let recommendation: 'approve' | 'review' | 'decline';
    let confidence: number;

    if (riskScore <= 150) {
      recommendation = 'approve';
      confidence = 85;
      reasons.push('Low risk profile suitable for Fasano submission');
    } else if (riskScore <= 300) {
      recommendation = 'review';
      confidence = 70;
      reasons.push('Moderate risk - manual review recommended');
    } else {
      recommendation = 'decline';
      confidence = 90;
      costSavings = 200; // Save the $200 Fasano fee
      reasons.push('High risk profile - not suitable for Fasano submission');
    }

    return {
      recommendation,
      riskScore,
      costSavings,
      reasons,
      confidence
    };
  };

  useEffect(() => {
    const prequalResult = calculatePrequalification();
    setResult(prequalResult);
    onDataUpdate(prequalResult);
  }, [calculatorData, onDataUpdate]);

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'approve': return 'text-green-600 bg-green-50 border-green-200';
      case 'review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'decline': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'approve': return '✅';
      case 'review': return '⚠️';
      case 'decline': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pre-qualification Decision Engine</h2>
          <p className="text-sm text-gray-600">Automated assessment for Fasano submission recommendation</p>
        </div>

        {result ? (
          <div className="space-y-6">
            {/* Main Recommendation */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{getRecommendationIcon(result.recommendation)}</div>
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold border-2 ${getRecommendationColor(result.recommendation)}`}>
                  {result.recommendation.toUpperCase()}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Confidence: {result.confidence}%
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{result.riskScore}</div>
                  <div className="text-xs text-blue-600">Risk Score</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{result.confidence}%</div>
                  <div className="text-xs text-purple-600">Confidence</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">${result.costSavings}</div>
                  <div className="text-xs text-green-600">Potential Savings</div>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Assessment Reasoning</h4>
                <div className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400 text-sm mt-0.5">•</span>
                      <span className="text-sm text-gray-600">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Recommendations */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
              
              {result.recommendation === 'approve' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-800 mb-2">✅ Proceed with Fasano Submission</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Complete all required application sections</li>
                    <li>• Gather supporting medical documentation</li>
                    <li>• Submit to Fasano for life expectancy evaluation</li>
                    <li>• Expected approval probability: High</li>
                  </ul>
                </div>
              )}

              {result.recommendation === 'review' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">⚠️ Manual Review Required</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Escalate to senior underwriter for review</li>
                    <li>• Consider additional medical records</li>
                    <li>• Evaluate risk vs. potential commission</li>
                    <li>• Proceed with caution if approved by reviewer</li>
                  </ul>
                </div>
              )}

              {result.recommendation === 'decline' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-red-800 mb-2">❌ Do Not Submit to Fasano</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• High probability of rejection</li>
                    <li>• Save $200 Fasano submission fee</li>
                    <li>• Consider alternative products or decline case</li>
                    <li>• Document decision for future reference</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Cost-Benefit Analysis */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost-Benefit Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Submission Costs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fasano Fee:</span>
                      <span className="font-medium">$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium">2-3 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Probability:</span>
                      <span className={`font-medium ${
                        result.recommendation === 'approve' ? 'text-green-600' :
                        result.recommendation === 'review' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {result.recommendation === 'approve' ? '85%' :
                         result.recommendation === 'review' ? '50%' : '15%'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Potential Savings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avoided Fees:</span>
                      <span className="font-medium text-green-600">${result.costSavings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Saved:</span>
                      <span className="font-medium">
                        {result.recommendation === 'decline' ? '2-3 weeks' : '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resource Efficiency:</span>
                      <span className="font-medium text-blue-600">
                        {result.recommendation === 'decline' ? 'High' : 'Standard'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-gray-500 mb-4">
              <div className="text-4xl mb-2">🧮</div>
              <h3 className="text-lg font-medium">Waiting for Assessment Data</h3>
              <p className="text-sm">Complete BMI and Health Risk assessments to generate recommendation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrequalificationEngine;
