'use client';

import React from 'react';

interface ExpandCollapseControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

const ExpandCollapseControls: React.FC<ExpandCollapseControlsProps> = ({
  onExpandAll,
  onCollapseAll
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-4">
        <button
          onClick={onExpandAll}
          className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          📖 Expand All Sections
        </button>
        <button
          onClick={onCollapseAll}
          className="px-6 py-3 bg-gray-600 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors shadow-lg"
        >
          📚 Collapse All Sections
        </button>
      </div>
    </div>
  );
};

export default ExpandCollapseControls;
