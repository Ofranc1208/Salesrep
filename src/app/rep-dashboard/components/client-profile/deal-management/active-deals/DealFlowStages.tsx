'use client';

import React from 'react';

interface Task {
  name: string;
  completed: boolean;
}

interface Stage {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  completedDate: string | null;
  targetDate: string;
  tasks: Task[];
}

interface DealFlowStagesProps {
  stages: [string, Stage][];
  currentStage: string;
  dealType: 'LCP' | 'GP';
}

const DealFlowStages: React.FC<DealFlowStagesProps> = ({ 
  stages, 
  currentStage, 
  dealType 
}) => {
  const getStageColor = (status: string, isCurrentStage: boolean) => {
    if (isCurrentStage) {
      return 'border-blue-300 bg-blue-50';
    }
    switch (status) {
      case 'completed':
        return 'border-green-300 bg-green-50';
      case 'in-progress':
        return 'border-orange-300 bg-orange-50';
      case 'pending':
        return 'border-gray-300 bg-gray-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getStageIcon = (status: string, isCurrentStage: boolean) => {
    if (isCurrentStage) {
      return '🔄';
    }
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '⏳';
      case 'pending':
        return '⏸️';
      default:
        return '⏸️';
    }
  };

  const getTaskProgress = (tasks: Task[]) => {
    const completed = tasks.filter(task => task.completed).length;
    return { completed, total: tasks.length, percentage: (completed / tasks.length) * 100 };
  };

  return (
    <div className="space-y-6">
      {stages.map(([stageKey, stage], index) => {
        const isCurrentStage = stageKey === currentStage;
        const taskProgress = getTaskProgress(stage.tasks);
        const isLastStage = index === stages.length - 1;

        return (
          <div key={stageKey} className="relative">
            {/* Stage Card */}
            <div className={`border-2 rounded-lg p-4 transition-all duration-200 ${getStageColor(stage.status, isCurrentStage)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getStageIcon(stage.status, isCurrentStage)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{stage.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>Target: {stage.targetDate}</span>
                      {stage.completedDate && (
                        <span className="text-green-600">Completed: {stage.completedDate}</span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                        stage.status === 'in-progress' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {stage.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {taskProgress.completed}/{taskProgress.total} Tasks
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        taskProgress.percentage === 100 ? 'bg-green-500' : 
                        taskProgress.percentage > 0 ? 'bg-orange-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${taskProgress.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {stage.tasks.map((task, taskIndex) => (
                  <div 
                    key={taskIndex}
                    className={`flex items-center space-x-2 p-2 rounded text-sm ${
                      task.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {task.completed ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                    </div>
                    <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
                  </div>
                ))}
              </div>

              {/* Stage-specific Notes */}
              {isCurrentStage && (
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-blue-600 font-medium text-sm">Current Stage Actions:</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    {stageKey === 'k-pack-process' && 'Waiting for notary documents and disclosures to be completed.'}
                    {stageKey === 'bh-questionnaire' && 'Health questionnaire and pricing review in progress.'}
                    {stageKey === 'quote-id' && 'Quote ID processing and value setup underway.'}
                    {stageKey === 'file-processing' && 'File sent for pre-funding verification.'}
                    {stageKey === 'final-steps' && 'Final bonus calculation and admin approval pending.'}
                  </p>
                </div>
              )}
            </div>

            {/* Connection Arrow */}
            {!isLastStage && (
              <div className="flex justify-center my-4">
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span className="text-xs text-gray-500 mt-1">Next Stage</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Deal Type Notice */}
      <div className={`mt-6 p-4 rounded-lg border-2 border-dashed ${
        dealType === 'LCP' 
          ? 'border-orange-300 bg-orange-50' 
          : 'border-green-300 bg-green-50'
      }`}>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{dealType === 'LCP' ? '🏥' : '✅'}</span>
          <span className="font-medium text-gray-900">
            {dealType === 'LCP' ? 'Life Contingent Deal' : 'Guaranteed Payment Deal'}
          </span>
        </div>
        <p className="text-sm text-gray-700">
          {dealType === 'LCP' 
            ? 'This deal requires medical review and additional verification steps. Timeline may vary based on health assessment results.'
            : 'This is a guaranteed payment deal with a simplified process. No medical review required.'
          }
        </p>
      </div>
    </div>
  );
};

export default DealFlowStages;
