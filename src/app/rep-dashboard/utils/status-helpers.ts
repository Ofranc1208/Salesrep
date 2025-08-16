// Status helper functions for the Rep Dashboard

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'completed': return 'Completed';
    case 'in-progress': return 'In Progress';
    case 'pending': return 'Pending';
    default: return 'Unknown';
  }
};

export const getPhoneStatusColor = (status: string) => {
  switch (status) {
    case 'working': return 'bg-green-500';
    case 'disconnected': return 'bg-red-500';
    case 'voicemail': return 'bg-purple-500';
    case 'busy': return 'bg-orange-500';
    case 'bad': return 'bg-red-600';
    case 'invalid': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

export const getPhoneStatusTextColor = (status: string) => {
  switch (status) {
    case 'working': return 'text-green-700 bg-green-50';
    case 'disconnected': return 'text-red-700 bg-red-50';
    case 'voicemail': return 'text-purple-700 bg-purple-50';
    case 'busy': return 'text-orange-700 bg-orange-50';
    case 'bad': return 'text-red-800 bg-red-50';
    case 'invalid': return 'text-yellow-700 bg-yellow-50';
    default: return 'text-gray-700 bg-gray-50';
  }
};

export const getPhoneStatusText = (status: string) => {
  switch (status) {
    case 'working': return 'Working';
    case 'disconnected': return 'Disc.';
    case 'voicemail': return 'Voicemail';
    case 'busy': return 'Busy';
    case 'bad': return 'Bad';
    case 'invalid': return 'Invalid';
    default: return 'Unknown';
  }
};

export const getRelationshipText = (relationship: string) => {
  switch (relationship) {
    case 'primary': return 'Primary';
    case 'home': return 'Home';
    case 'work': return 'Work';
    case 'alternate': return 'Alternate';
    default: return 'Unknown';
  }
};

export const getNextStatus = (currentStatus: string) => {
  switch (currentStatus) {
    case 'working': return 'disconnected';
    case 'disconnected': return 'working';
    case 'voicemail': return 'working';
    case 'busy': return 'working';
    case 'bad': return 'working';
    case 'invalid': return 'working';
    default: return 'working';
  }
};
