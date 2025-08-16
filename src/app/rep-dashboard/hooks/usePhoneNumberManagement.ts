import { PhoneNumber } from '../types';

export function usePhoneNumberManagement(leads: any[], setLeads: any, repName: string) {
  
  const updatePhoneNumberStatus = (leadId: string, phoneNumber: string, newStatus: string) => {
    console.log(`Updating phone ${phoneNumber} status to ${newStatus} for lead ${leadId}`);
    
    setLeads((prevLeads: any[]) => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map((phone: any) => 
                phone.number === phoneNumber 
                  ? { 
                      ...phone, 
                      status: newStatus,
                      auditTrail: [
                        ...(phone.auditTrail || []),
                        {
                          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                          field: 'status',
                          oldValue: phone.status,
                          newValue: newStatus,
                          editedBy: repName,
                          editedAt: new Date().toISOString()
                        }
                      ]
                    }
                  : phone
              )
            }
          : lead
      )
    );
  };

  const updatePhoneNumberType = (leadId: string, phoneNumber: string, newType: string) => {
    console.log(`Updating phone ${phoneNumber} type to ${newType} for lead ${leadId}`);
    
    setLeads((prevLeads: any[]) => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map((phone: any) => 
                phone.number === phoneNumber 
                  ? { 
                      ...phone, 
                      type: newType,
                      auditTrail: [
                        ...(phone.auditTrail || []),
                        {
                          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                          field: 'type',
                          oldValue: phone.type,
                          newValue: newType,
                          editedBy: repName,
                          editedAt: new Date().toISOString()
                        }
                      ]
                    }
                  : phone
              )
            }
          : lead
      )
    );
  };

  const updatePhoneNumberRelationship = (leadId: string, phoneNumber: string, newRelationship: string) => {
    console.log(`Updating phone ${phoneNumber} relationship to ${newRelationship} for lead ${leadId}`);
    
    setLeads((prevLeads: any[]) => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map((phone: any) => 
                phone.number === phoneNumber 
                  ? { 
                      ...phone, 
                      relationship: newRelationship,
                      auditTrail: [
                        ...(phone.auditTrail || []),
                        {
                          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                          field: 'relationship',
                          oldValue: phone.relationship,
                          newValue: newRelationship,
                          editedBy: repName,
                          editedAt: new Date().toISOString()
                        }
                      ]
                    }
                  : phone
              )
            }
          : lead
      )
    );
  };

  const updatePhoneNumberNotes = (leadId: string, phoneNumber: string, newNotes: string) => {
    console.log(`Updating phone ${phoneNumber} notes to ${newNotes} for lead ${leadId}`);
    
    setLeads((prevLeads: any[]) => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map((phone: any) => 
                phone.number === phoneNumber 
                  ? { 
                      ...phone, 
                      notes: newNotes,
                      auditTrail: [
                        ...(phone.auditTrail || []),
                        {
                          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                          field: 'notes',
                          oldValue: phone.notes || '',
                          newValue: newNotes,
                          editedBy: repName,
                          editedAt: new Date().toISOString()
                        }
                      ]
                    }
                  : phone
              )
            }
          : lead
      )
    );
  };

  const addPhoneNumberToLead = (leadId: string, newPhoneNumber: PhoneNumber) => {
    console.log(`Adding new phone number ${newPhoneNumber.number} to lead ${leadId}`);
    
    // Add audit trail for the new phone number
    const phoneWithAudit = {
      ...newPhoneNumber,
      auditTrail: [{
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        field: 'created',
        oldValue: '',
        newValue: 'Phone number added',
        editedBy: repName,
        editedAt: new Date().toISOString()
      }]
    };
    
    setLeads((prevLeads: any[]) => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: [...lead.phoneNumbers, phoneWithAudit]
            }
          : lead
      )
    );
  };

  return {
    updatePhoneNumberStatus,
    updatePhoneNumberType,
    updatePhoneNumberRelationship,
    updatePhoneNumberNotes,
    addPhoneNumberToLead
  };
}
