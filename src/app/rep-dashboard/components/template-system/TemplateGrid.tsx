'use client';

import React from 'react';
import { MessageTemplate } from '../../../shared/TemplateService';

interface TemplateGridProps {
  templates: MessageTemplate[];
  selectedTemplate: MessageTemplate | null;
  suggestedNext: number;
  onTemplateSelect: (template: MessageTemplate) => void;
}

export default function TemplateGrid({
  templates,
  selectedTemplate,
  suggestedNext,
  onTemplateSelect
}: TemplateGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onTemplateSelect(template)}
          className={`p-2 border rounded text-left transition-all ${
            selectedTemplate?.id === template.id
              ? 'border-blue-500 bg-blue-50'
              : template.sequence === suggestedNext
              ? 'border-green-400 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-900">
              T{template.sequence}
            </span>
            {template.sequence === suggestedNext && (
              <span className="text-xs bg-green-500 text-white px-1 py-0.5 rounded">
                ✓
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-1">
            {template.name.includes(':') ? template.name.split(': ')[1] : template.name}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            {template.content.substring(0, 40)}...
          </p>
        </button>
      ))}
    </div>
  );
}
