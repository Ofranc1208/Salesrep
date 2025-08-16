'use client';

import React from 'react';
import { documentCategories, mockDocuments } from '../utils/documentData';

interface DocumentSidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const DocumentSidebar: React.FC<DocumentSidebarProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
      case 'green': return 'border-green-200 bg-green-50 hover:bg-green-100';
      case 'purple': return 'border-purple-200 bg-purple-50 hover:bg-purple-100';
      case 'orange': return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
      case 'indigo': return 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100';
      default: return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  return (
    <div className="w-72 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
        <span>📂</span>
        <span>Document Categories</span>
      </h3>
      <div className="space-y-2">
        {Object.entries(documentCategories).map(([key, category]) => {
          const categoryDocs = mockDocuments.filter(doc => doc.category === key);
          const requiredDocs = category.types.filter(type => type.required).length;
          const uploadedRequired = category.types.filter(type => 
            type.required && categoryDocs.some(doc => doc.type === type.name)
          ).length;
          
          return (
            <button
              key={key}
              onClick={() => onCategoryChange(key)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                activeCategory === key 
                  ? `${getCategoryColor(category.color)} border-${category.color}-300 shadow-sm` 
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">
                      {categoryDocs.length} documents
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-gray-600">
                    {uploadedRequired}/{requiredDocs}
                  </div>
                  <div className="text-xs text-gray-400">required</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    uploadedRequired === requiredDocs ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${requiredDocs > 0 ? (uploadedRequired / requiredDocs) * 100 : 0}%` }}
                ></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentSidebar;
