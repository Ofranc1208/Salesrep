'use client';

import React, { useState } from 'react';
import { Lead } from '../../../../types';

interface ActiveDealsProps {
  selectedLead: Lead | null;
  searchTerm: string;
}

const ActiveDeals: React.FC<ActiveDealsProps> = ({ selectedLead, searchTerm }) => {
  const [expandedStage, setExpandedStage] = useState<string | null>('k-pack-process');

  // Mock deal data - simplified and cleaner
  const dealData = {
    dealType: 'LCP', // LCP = Life Contingent, GP = Guaranteed Payment
    currentStage: 'k-pack-process',
    progress: 65,
    stages: [
      {
        id: 'bh-questionnaire',
        name: 'BH Questionnaire',
        status: 'completed',
        completedDate: '2024-01-08',
        targetDate: '2024-01-10',
        completedTasks: 5,
        totalTasks: 5,
        tasks: [
          { name: 'BH Questionnaire Submitted', completed: true },
          { name: 'BH Questionnaire Completed', completed: true },
          { name: 'Health Rating Received', completed: true },
          { name: 'Sent Out for Pricing', completed: true },
          { name: 'Pricing Bid Received', completed: true }
        ]
      },
      {
        id: 'quote-id',
        name: 'Quote ID Process',
        status: 'completed',
        completedDate: '2024-01-08',
        targetDate: '2024-01-10',
        completedTasks: 3,
        totalTasks: 3,
        tasks: [
          { name: 'Quote ID App Submitted', completed: true },
          { name: 'T-Value Setup', completed: true },
          { name: 'EVO Request', completed: true }
        ]
      },
      {
        id: 'k-pack-process',
        name: 'K-Pack Process',
        status: 'in-progress',
        completedDate: null,
        targetDate: '2024-01-10',
        completedTasks: 2,
        totalTasks: 5,
        tasks: [
          { name: 'K-Pack Sent', completed: true },
          { name: 'App Application Letter', completed: true },
          { name: 'Cap Now Disclosures', completed: false },
          { name: 'Sent Docs to Notary', completed: false },
          { name: 'Notary Docs Received', completed: false }
        ]
      },
      {
        id: 'file-processing',
        name: 'File Processing',
        status: 'locked',
        completedDate: null,
        targetDate: '2024-01-08',
        completedTasks: 0,
        totalTasks: 3,
        tasks: [
          { name: 'File Sent to OC', completed: false },
          { name: 'Pre-funding Check list', completed: false },
          { name: 'Verified by Admin', completed: false }
        ]
      },
      {
        id: 'final-steps',
        name: 'Final Steps',
        status: 'locked',
        completedDate: null,
        targetDate: '2024-01-10',
        completedTasks: 0,
        totalTasks: 3,
        tasks: [
          { name: 'Final Bonus Amount', completed: false },
          { name: 'Complete Pre-funding', completed: false },
          { name: 'Check Okayed by Admin', completed: false }
        ]
      }
    ]
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'locked': return '⏸️';
      default: return '⏸️';
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'in-progress': return 'bg-blue-50 border-blue-200';
      case 'locked': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStageTextColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-700';
      case 'in-progress': return 'text-blue-700';
      case 'locked': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Clean Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Deal Flow Progress</h3>
        <p className="text-sm text-gray-500 mt-1">Life Contingent Deal - Full Process Overview</p>
      </div>

      {/* Clean Flow Container */}
      <div className="flex-1 p-6">
        {/* Clean Progress Bar */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            {dealData.stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  stage.status === 'completed' ? 'bg-green-500 text-white' : 
                  stage.status === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < dealData.stages.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${
                    stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stage Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {dealData.stages.map((stage, index) => (
            <div 
              key={stage.id}
              className={`bg-white border rounded-lg p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
                stage.status === 'completed' ? 'border-green-200 bg-green-50' :
                stage.status === 'in-progress' ? 'border-blue-200 bg-blue-50' : 
                'border-gray-200 bg-gray-50'
              } ${stage.status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={() => stage.status !== 'locked' ? setExpandedStage(expandedStage === stage.id ? null : stage.id) : null}
            >
              {/* Clean Stage Header */}
              <div className="text-center mb-3">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium mb-2 ${
                  stage.status === 'completed' ? 'bg-green-500' : 
                  stage.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  {stage.status === 'completed' ? '✓' : index + 1}
                </div>
                <h4 className={`font-medium text-sm ${
                  stage.status === 'completed' ? 'text-green-800' :
                  stage.status === 'in-progress' ? 'text-blue-800' : 'text-gray-600'
                }`}>
                  {stage.name}
                </h4>
              </div>

              {/* Clean Progress Bar & Percentage */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{stage.completedTasks}/{stage.totalTasks} Tasks</span>
                  <span className="font-medium">{Math.round((stage.completedTasks / stage.totalTasks) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      stage.status === 'completed' ? 'bg-green-500' : 
                      stage.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${(stage.completedTasks / stage.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Expanded Task List (Only when clicked) */}
              {expandedStage === stage.id && stage.status !== 'locked' && (
                <div className="space-y-2 border-t border-gray-200 pt-3">
                  {stage.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        task.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={`text-xs ${
                        task.completed ? 'text-gray-600 line-through' : 'text-gray-700'
                      }`}>
                        {task.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Click to Expand Indicator */}
              {stage.status !== 'locked' && (
                <div className="flex justify-center mt-3">
                  <div className="text-xs text-gray-400">
                    {expandedStage === stage.id ? 'Click to collapse' : 'Click to expand'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Clean Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Pending</span>
            </div>
          </div>
          
          <div className="text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            Life Contingent - Medical review required
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveDeals;
