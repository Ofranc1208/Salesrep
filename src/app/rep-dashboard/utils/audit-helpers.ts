// Audit trail utilities for phone number management

import { PhoneNumberAudit } from '../types';

export const createAuditEntry = (
  field: string,
  oldValue: string,
  newValue: string,
  editedBy: string,
  reason?: string
): PhoneNumberAudit => {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    field,
    oldValue,
    newValue,
    editedBy,
    editedAt: new Date().toISOString(),
    reason
  };
};

export const addAuditEntry = (
  phoneNumber: any,
  field: string,
  oldValue: string,
  newValue: string,
  editedBy: string,
  reason?: string
) => {
  const auditEntry = createAuditEntry(field, oldValue, newValue, editedBy, reason);
  
  if (!phoneNumber.auditTrail) {
    phoneNumber.auditTrail = [];
  }
  
  phoneNumber.auditTrail.push(auditEntry);
  
  // Keep only last 10 audit entries to prevent memory bloat
  if (phoneNumber.auditTrail.length > 10) {
    phoneNumber.auditTrail = phoneNumber.auditTrail.slice(-10);
  }
  
  return phoneNumber;
};

export const getAuditSummary = (phoneNumber: any): string => {
  if (!phoneNumber.auditTrail || phoneNumber.auditTrail.length === 0) {
    return 'No edits';
  }
  
  const lastEdit = phoneNumber.auditTrail[phoneNumber.auditTrail.length - 1];
  const editDate = new Date(lastEdit.editedAt).toLocaleDateString();
  
  return `Last edited ${lastEdit.field} on ${editDate} by ${lastEdit.editedBy}`;
};

export const formatAuditTrail = (auditTrail: PhoneNumberAudit[]): string => {
  if (!auditTrail || auditTrail.length === 0) {
    return 'No edit history';
  }
  
  return auditTrail
    .slice(-5) // Show last 5 edits
    .reverse() // Most recent first
    .map(entry => {
      const date = new Date(entry.editedAt).toLocaleDateString();
      const time = new Date(entry.editedAt).toLocaleTimeString();
      return `${entry.field}: "${entry.oldValue}" → "${entry.newValue}" (${entry.editedBy} on ${date} at ${time})`;
    })
    .join('\n');
};
