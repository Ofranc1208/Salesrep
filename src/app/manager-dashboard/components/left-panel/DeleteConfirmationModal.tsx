'use client';

import React from 'react';

interface DeleteConfirmationProps {
  isOpen: boolean;
  listId: string;
  listName: string;
  warning?: string;
  isActiveList?: boolean;
}

interface DeleteConfirmationModalProps {
  deleteConfirmation: DeleteConfirmationProps;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export default function DeleteConfirmationModal({
  deleteConfirmation,
  onConfirmDelete,
  onCancelDelete
}: DeleteConfirmationModalProps) {

  if (!deleteConfirmation.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          {/* Modal Header */}
          <h3 className={`text-lg font-semibold leading-6 ${
            deleteConfirmation.isActiveList ? 'text-red-600' : 'text-gray-900'
          }`}>
            {deleteConfirmation.isActiveList ? '⚠️ Delete Active List' : 'Confirm Deletion'}
          </h3>
          
          {/* Modal Content */}
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {deleteConfirmation.warning || 
               `Are you sure you want to delete the list "${deleteConfirmation.listName}"? This action cannot be undone.`}
            </p>
          </div>
          
          {/* Modal Actions */}
          <div className="items-center px-4 py-3 space-y-2">
            {/* Delete Button */}
            <button
              onClick={onConfirmDelete}
              className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                deleteConfirmation.isActiveList 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                  : 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              }`}
            >
              {deleteConfirmation.isActiveList ? 'Delete Active List' : 'Delete'}
            </button>
            
            {/* Cancel Button */}
            <button
              onClick={onCancelDelete}
              className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
