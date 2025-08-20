'use client';

import React, { useState } from 'react';
import { Metric, PerformanceMetricsProps } from './types';

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ selectedPriority }) => {
  const [metrics] = useState<Metric[]>([
    {
      id: '1',
      name: 'Response Time',
      value: 2.3,
      target: 1.0,
      unit: 'hours',
      trend: 'down',
      change: -15,
      priority: 'hot'
    },
    {
      id: '2',
      name: 'Conversion Rate',
      value: 45,
      target: 40,
      unit: '%',
      trend: 'up',
      change: 12,
      priority: 'hot'
    },
    {
      id: '3',
      name: 'Document Completion',
      value: 78,
      target: 85,
      unit: '%',
      trend: 'up',
      change: 8,
      priority: 'active'
    },
    {
      id: '4',
      name: 'Court Success Rate',
      value: 92,
      target: 90,
      unit: '%',
      trend: 'stable',
      change: 0,
      priority: 'active'
    },
    {
      id: '5',
      name: 'Engagement Rate',
      value: 67,
      target: 70,
      unit: '%',
      trend: 'up',
      change: 5,
      priority: 'warm'
    },
    {
      id: '6',
      name: 'Follow-up Frequency',
      value: 4,
      target: 3,
      unit: 'days',
      trend: 'down',
      change: -20,
      priority: 'warm'
    },
    {
      id: '7',
      name: 'Contact Success Rate',
      value: 22,
      target: 25,
      unit: '%',
      trend: 'up',
      change: 10,
      priority: 'prospect'
    },
    {
      id: '8',
      name: 'Data Quality',
      value: 85,
      target: 90,
      unit: '%',
      trend: 'stable',
      change: 2,
      priority: 'prospect'
    }
  ]);

  // Filter metrics based on selected priority
  const filteredMetrics = selectedPriority 
    ? metrics.filter(m => m.priority === selectedPriority)
    : metrics.slice(0, 4); // Show top 4 overall metrics

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getTrendColor = (trend: string, isPositive: boolean) => {
    if (trend === 'stable') return 'text-gray-600';
    if (isPositive) return 'text-green-600';
    return 'text-red-600';
  };

  const getPerformanceColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const calculatePerformance = (value: number, target: number) => {
    return Math.round((value / target) * 100);
  };

  const overallScore = Math.round(
    filteredMetrics.reduce((acc, metric) => 
      acc + calculatePerformance(metric.value, metric.target), 0
    ) / filteredMetrics.length
  );

  return (
    <div className="space-y-2">
      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{overallScore}%</div>
          <div className="text-xs text-blue-700">
            {selectedPriority ? `${selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1)} Performance` : 'Overall Performance'}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
        {filteredMetrics.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-xs">
            {selectedPriority ? `No metrics for ${selectedPriority} list` : 'No metrics available'}
          </div>
        ) : (
          filteredMetrics.map((metric) => {
            const performance = calculatePerformance(metric.value, metric.target);
            const isPositiveChange = metric.change > 0;
            
            return (
              <div
                key={metric.id}
                className="p-2 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-xs font-medium text-gray-900 truncate">
                    {metric.name}
                  </h5>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                    getPerformanceColor(metric.value, metric.target)
                  }`}>
                    {performance}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-900">
                      {metric.value}{metric.unit}
                    </span>
                    <span className="text-xs text-gray-500">
                      / {metric.target}{metric.unit}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">{getTrendIcon(metric.trend)}</span>
                    <span className={`text-xs font-medium ${
                      getTrendColor(metric.trend, isPositiveChange)
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      performance >= 100 ? 'bg-green-500' :
                      performance >= 80 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(performance, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2 pt-2 border-t border-gray-100">
        <button className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium">
          Full Report
        </button>
        <button className="flex-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors font-medium">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
