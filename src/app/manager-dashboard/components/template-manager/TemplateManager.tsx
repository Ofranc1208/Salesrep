'use client';

import React, { useState } from 'react';
import { MessageTemplate } from '../../utils/mock-data';

interface TemplateManagerProps {
  templates: MessageTemplate[];
  onTemplatesChange: (templates: MessageTemplate[]) => void;
  onClose: () => void;
}

const TemplateManager: React.FC<TemplateManagerProps> = ({ 
  templates, 
  onTemplatesChange, 
  onClose 
}) => {
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    content: ''
  });

  const availableKeywords = [
    { key: '{{clientFirstName}}', description: 'Client\'s first name' },
    { key: '{{clientLastName}}', description: 'Client\'s last name' },
    { key: '{{repFirstName}}', description: 'Sales rep\'s first name' },
    { key: '{{payment100}}', description: '100% payment amount' },
    { key: '{{payment50}}', description: '50% payment amount' },
    { key: '{{offerAt100Low}}', description: '100% offer low amount' },
    { key: '{{offerAt100High}}', description: '100% offer high amount' },
    { key: '{{offerAt50Low}}', description: '50% offer low amount' },
    { key: '{{offerAt50High}}', description: '50% offer high amount' },
    { key: '{{lifeInsurancePayment100}}', description: '100% life insurance payment' },
    { key: '{{lifeInsurancePayment50}}', description: '50% life insurance payment' },
    { key: '{{paymentStrtDate}}', description: 'Payment start date' },
    { key: '{{paymentEndDate}}', description: 'Payment end date' },
    { key: '{{insuranceCompany}}', description: 'Insurance company name' }
  ];

  const handleCreateTemplate = () => {
    if (newTemplate.name.trim() && newTemplate.content.trim()) {
      const template: MessageTemplate = {
        id: Date.now().toString(),
        name: newTemplate.name.trim(),
        content: newTemplate.content.trim()
      };
      
      onTemplatesChange([...templates, template]);
      setNewTemplate({ name: '', content: '' });
      setIsCreating(false);
    }
  };

  const handleUpdateTemplate = () => {
    if (editingTemplate && editingTemplate.name.trim() && editingTemplate.content.trim()) {
      const updatedTemplates = templates.map(t => 
        t.id === editingTemplate.id ? editingTemplate : t
      );
      onTemplatesChange(updatedTemplates);
      setEditingTemplate(null);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      const filteredTemplates = templates.filter(t => t.id !== id);
      onTemplatesChange(filteredTemplates);
    }
  };

  const insertKeyword = (keyword: string, target: 'new' | 'edit') => {
    if (target === 'new') {
      setNewTemplate(prev => ({
        ...prev,
        content: prev.content + keyword
      }));
    } else if (editingTemplate) {
      setEditingTemplate(prev => prev ? {
        ...prev,
        content: prev.content + keyword
      } : null);
    }
  };

  const previewTemplate = (template: MessageTemplate) => {
    // This would be replaced with actual lead data in production
    const sampleData = {
      clientFirstName: 'John',
      clientLastName: 'Doe',
      repFirstName: 'Scott',
      payment100: 7000.00,
      payment50: 3500.00,
      offerAt100Low: 541880.21,
      offerAt100High: 684188.75,
      offerAt50Low: 289504.70,
      offerAt50High: 324193.38,
      lifeInsurancePayment100: 860000.00,
      lifeInsurancePayment50: 430000.00,
      paymentStrtDate: '5/1/2024',
      paymentEndDate: '7/24/2048',
      insuranceCompany: 'Takon'
    };

    let preview = template.content;
    Object.entries(sampleData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      preview = preview.replace(new RegExp(placeholder, 'g'), String(value));
    });

    return preview;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Message Templates</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Available Keywords */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Available Keywords</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableKeywords.map((keyword) => (
              <div key={keyword.key} className="flex items-center space-x-2">
                <button
                  onClick={() => insertKeyword(keyword.key, isCreating ? 'new' : 'edit')}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded hover:bg-blue-200"
                >
                  {keyword.key}
                </button>
                <span className="text-xs text-gray-600">{keyword.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Create New Template */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">
              {isCreating ? 'Create New Template' : 'Templates'}
            </h3>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isCreating 
                  ? 'bg-gray-500 text-white hover:bg-gray-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isCreating ? 'Cancel' : 'Create New'}
            </button>
          </div>

          {isCreating && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Template Name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Template Content (use keywords like {{clientFirstName}})"
                value={newTemplate.content}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleCreateTemplate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Create Template
              </button>
            </div>
          )}
        </div>

        {/* Existing Templates */}
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4">
              {editingTemplate?.id === template.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full p-2 border border-gray-300 rounded-md font-semibold"
                  />
                  <textarea
                    value={editingTemplate.content}
                    onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, content: e.target.value } : null)}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateTemplate}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingTemplate(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">{template.name}</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingTemplate(template)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">Template:</p>
                    <p className="text-gray-800 bg-gray-50 p-2 rounded">{template.content}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Preview with sample data:</p>
                    <p className="text-gray-800 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                      {previewTemplate(template)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {templates.length === 0 && !isCreating && (
          <div className="text-center py-8 text-gray-500">
            <p>No templates created yet. Click "Create New" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateManager;
