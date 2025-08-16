export type SectionKey = 
  | 'clientProfile' 
  | 'attorney' 
  | 'court' 
  | 'annuity' 
  | 'offer' 
  | 'notes' 
  | 'messageHistory' 
  | 'cashAdvance' 
  | 'settlementSummary' 
  | 'phoneManagement';

export type ExpandedSections = Record<SectionKey, boolean>;
