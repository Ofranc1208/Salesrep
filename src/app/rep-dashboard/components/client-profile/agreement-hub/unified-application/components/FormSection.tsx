'use client';

import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  description, 
  children, 
  icon 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-1">
          {icon && <span className="text-lg">{icon}</span>}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {description && (
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default FormSection;
