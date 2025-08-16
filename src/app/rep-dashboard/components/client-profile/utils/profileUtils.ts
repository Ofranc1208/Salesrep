// Get visible sections based on lead type
export const getVisibleSections = (leadType: 'prospect' | 'hot' | 'warm' | 'active') => {
  switch(leadType) {
    case 'prospect':
      return ['clientProfile', 'notes'];
    case 'hot':
      return ['clientProfile', 'annuity', 'notes', 'messageHistory'];
    case 'warm':
      return ['clientProfile', 'annuity', 'offer', 'notes', 'messageHistory', 'phoneManagement'];
    case 'active':
      return ['clientProfile', 'attorney', 'court', 'annuity', 'offer', 'notes', 'messageHistory', 'cashAdvance', 'settlementSummary', 'phoneManagement'];
    default:
      return ['clientProfile', 'notes'];
  }
};

// Handle adding new activity
export const handleAddActivity = (newActivity: { type: string; content: string }) => {
  const activity = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    salesRep: 'Client Relations Rep One', // Current user
    type: newActivity.type as any,
    content: newActivity.content
  };
  
  // TODO: In real app, this would call an API to save the activity
  console.log('New activity added:', activity);
  
  // For now, just show confirmation. In a real app, you'd update state or call an API
  alert(`Activity added: ${newActivity.type.toUpperCase()} - ${newActivity.content.substring(0, 50)}...`);
};
