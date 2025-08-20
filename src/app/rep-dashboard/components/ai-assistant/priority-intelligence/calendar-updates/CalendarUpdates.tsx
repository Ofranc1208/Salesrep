'use client';

import React, { useState } from 'react';
import { CalendarEvent, CalendarUpdatesProps } from './types';

const CalendarUpdates: React.FC<CalendarUpdatesProps> = ({ selectedPriority }) => {
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Follow-up Call - Sarah Williams',
      type: 'follow-up',
      time: '2:00 PM',
      date: 'Today',
      priority: 'hot',
      status: 'overdue',
      client: 'Sarah Williams'
    },
    {
      id: '2',
      title: 'Court Hearing - Michael Johnson',
      type: 'court',
      time: '10:30 AM',
      date: 'Mar 15',
      priority: 'active',
      status: 'upcoming',
      client: 'Michael Johnson'
    },
    {
      id: '3',
      title: 'Document Review Meeting',
      type: 'meeting',
      time: '3:30 PM',
      date: 'Tomorrow',
      priority: 'active',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Prospect Outreach - New Leads',
      type: 'call',
      time: '11:00 AM',
      date: 'Mar 12',
      priority: 'prospect',
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Jennifer Davis - Nurture Call',
      type: 'follow-up',
      time: '1:00 PM',
      date: 'Mar 13',
      priority: 'warm',
      status: 'upcoming',
      client: 'Jennifer Davis'
    }
  ]);

  // Filter events based on selected priority
  const filteredEvents = selectedPriority 
    ? events.filter(e => e.priority === selectedPriority)
    : events;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '👥';
      case 'deadline': return '⏰';
      case 'follow-up': return '📞';
      case 'court': return '⚖️';
      case 'call': return '☎️';
      default: return '📅';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'hot': return 'border-l-red-500';
      case 'active': return 'border-l-green-500';
      case 'warm': return 'border-l-orange-500';
      case 'prospect': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming').length;
  const overdueEvents = filteredEvents.filter(e => e.status === 'overdue').length;

  return (
    <div className="space-y-2">
      {/* Calendar Summary */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-blue-50 p-2 rounded-md">
          <div className="text-lg font-bold text-blue-600">{upcomingEvents}</div>
          <div className="text-xs text-blue-700">Upcoming</div>
        </div>
        <div className="bg-red-50 p-2 rounded-md">
          <div className="text-lg font-bold text-red-600">{overdueEvents}</div>
          <div className="text-xs text-red-700">Overdue</div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-xs">
            {selectedPriority ? `No events for ${selectedPriority} list` : 'No upcoming events'}
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`p-2 border-l-4 rounded-r-md transition-all hover:shadow-sm bg-white ${
                getPriorityColor(event.priority)
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2 flex-1">
                  <span className="text-sm">{getEventIcon(event.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-medium text-gray-900 truncate">
                        {event.title}
                      </h5>
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(event.status)
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-600">{event.date}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{event.time}</span>
                    </div>
                    {event.client && (
                      <div className="text-xs text-blue-600 mt-1">
                        Client: {event.client}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2 pt-2 border-t border-gray-100">
        <button className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium">
          Add Event
        </button>
        <button className="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium">
          View Calendar
        </button>
      </div>
    </div>
  );
};

export default CalendarUpdates;
