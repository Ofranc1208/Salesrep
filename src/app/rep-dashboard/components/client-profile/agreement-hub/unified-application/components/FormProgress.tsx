'use client';

import React from 'react';

interface Section {
  id: number;
  name: string;
}

interface FormProgressProps {
  sections: Section[];
  currentSection: number;
  onSectionClick: (sectionId: number) => void;
  formData: any;
}

const FormProgress: React.FC<FormProgressProps> = ({ 
  sections, 
  currentSection, 
  onSectionClick,
  formData 
}) => {
  const getSectionStatus = (sectionId: number) => {
    if (sectionId < currentSection) return 'completed';
    if (sectionId === currentSection) return 'current';
    return 'pending';
  };

  const getSectionColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white border-green-500';
      case 'current': return 'bg-blue-500 text-white border-blue-500';
      default: return 'bg-gray-200 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
      <div className="flex">
        {sections.map((section, index) => (
          <div key={section.id} className="flex-1 flex items-center">
            <div className="flex-1 flex justify-center">
              <button
                onClick={() => onSectionClick(section.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-105 ${
                  getSectionColor(getSectionStatus(section.id))
                }`}
              >
                {getSectionStatus(section.id) === 'completed' ? '✓' : section.id}
              </button>
            </div>
            
            {index < sections.length - 1 && (
              <div className={`w-6 h-px ${
                getSectionStatus(section.id) === 'completed' ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Section Labels */}
      <div className="flex mt-1">
        {sections.map((section, index) => (
          <div key={`label-${section.id}`} className="flex-1 flex items-center">
            <div className="flex-1 text-center">
              <span className={`text-xs ${
                getSectionStatus(section.id) === 'current' 
                  ? 'text-blue-600 font-medium' 
                  : getSectionStatus(section.id) === 'completed'
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`} style={{ fontSize: '10px' }}>
                {section.name}
              </span>
            </div>
            
            {index < sections.length - 1 && (
              <div className="w-6"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;
