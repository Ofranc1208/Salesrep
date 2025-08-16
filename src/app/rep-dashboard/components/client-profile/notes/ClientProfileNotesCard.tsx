'use client';

import React, { useState } from 'react';

interface ActivityEntry {
  id: string;
  date: string;
  time: string;
  salesRep: string;
  type: 'note' | 'call' | 'email' | 'meeting' | 'follow-up' | 'status-change';
  content: string;
}

interface ActivityLogCardProps {
  notes: ActivityEntry[];
  onAddActivity?: (activity: Omit<ActivityEntry, 'id' | 'date' | 'time' | 'salesRep'>) => void;
}

const ClientProfileNotesCard: React.FC<ActivityLogCardProps> = ({ notes, onAddActivity }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'note' as ActivityEntry['type'],
    content: ''
  });

  const getActivityIcon = (type: ActivityEntry['type']) => {
    switch (type) {
      case 'call': return '📞';
      case 'email': return '📧';
      case 'meeting': return '🤝';
      case 'follow-up': return '🔄';
      case 'status-change': return '🔄';
      case 'note':
      default: return '📝';
    }
  };

  const getActivityColor = (type: ActivityEntry['type']) => {
    switch (type) {
      case 'call': return 'border-green-400 bg-green-50';
      case 'email': return 'border-blue-400 bg-blue-50';
      case 'meeting': return 'border-purple-400 bg-purple-50';
      case 'follow-up': return 'border-orange-400 bg-orange-50';
      case 'status-change': return 'border-yellow-400 bg-yellow-50';
      case 'note':
      default: return 'border-indigo-400 bg-indigo-50';
    }
  };

  const handleAddActivity = () => {
    if (!newActivity.content.trim()) {
      alert('Please enter activity content');
      return;
    }

    if (onAddActivity) {
      onAddActivity(newActivity);
    }

    // Reset form
    setNewActivity({
      type: 'note',
      content: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-3">
      {/* Add Activity Button */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          {notes.length} Activity Entr{notes.length !== 1 ? 'ies' : 'y'}
        </span>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Activity</span>
        </button>
      </div>

      {/* Add Activity Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-3 rounded-md border">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Add Activity Entry</h4>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Activity Type</label>
            <select 
              value={newActivity.type}
              onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value as ActivityEntry['type'] }))}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="note">Note</option>
              <option value="call">Phone Call</option>
              <option value="email">Email</option>
              <option value="meeting">Meeting</option>
              <option value="follow-up">Follow-up</option>
              <option value="status-change">Status Change</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Activity Details</label>
            <textarea
              placeholder="Enter activity details..."
              rows={3}
              value={newActivity.content}
              onChange={(e) => setNewActivity(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddActivity}
              className="flex-1 bg-indigo-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-indigo-700 transition-colors"
            >
              Add Activity
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewActivity({ type: 'note', content: '' });
              }}
              className="flex-1 bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Activity Entries */}
      <div className="space-y-2">
        {notes.slice(0, 5).map((activity, index) => (
          <div key={activity.id || index} className={`border-l-4 pl-3 py-2 rounded-r-md ${getActivityColor(activity.type)}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm">{getActivityIcon(activity.type)}</span>
                <span className="text-xs font-medium text-gray-900">{activity.date}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                {activity.salesRep}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {activity.content.length > 120 ? `${activity.content.substring(0, 120)}...` : activity.content}
            </p>
          </div>
        ))}
      </div>
      
      {notes.length > 5 && (
        <div className="pt-3 border-t border-gray-200 text-center">
          <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
            View All {notes.length} Activities
          </button>
        </div>
      )}

      {notes.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">No activity entries yet</p>
          <p className="text-xs text-gray-400">Click "Add Activity" to get started</p>
        </div>
      )}
    </div>
  );
};

export default ClientProfileNotesCard;
