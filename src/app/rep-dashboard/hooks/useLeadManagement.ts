import { useState, useEffect } from 'react';
import { Lead, PhoneNumber } from '../types';
import { mockLeads } from '../utils/mock-data/index';

export function useLeadManagement() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState<string>('');
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0);

  const generateMessage = (lead: Lead, phoneNumber: string, messageType: 'initial' | 'follow-up' = 'initial') => {
    if (messageType === 'initial') {
      return `Hey ${lead.clientName}, It's Scott with Smarter Payouts. Your ${lead.insuranceCompany} payments allow you to take advantage of our Early payout program to buy a house, start a business, pay off debt and a lot more. Would you like to see how much you might be entitled to with zero obligation?`;
    } else {
      const details = lead.structuredSettlementDetails;
      return `Hey ${lead.clientName}, It's Scott hope all is well. Ins Company ${lead.insuranceCompany} Early Payout ${details.offerAmount}. ${details.monthlyPayment} monthly. ${details.startDate} till ${details.endDate}. Family Protection ${details.totalValue}. Hurry offer expires soon. Funding as quick as in 30 days`;
    }
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    const primaryWorking = lead.phoneNumbers.find((p) => p.isPrimary && p.status === 'working');
    const workingNumber = primaryWorking || lead.phoneNumbers.find((p) => p.status === 'working');
    const selectedNumber = workingNumber?.number || lead.phoneNumbers[0]?.number || '';
    setSelectedPhoneNumber(selectedNumber);
    setCopiedMessage(generateMessage(lead, selectedNumber));
    
    // Update current lead index
    const index = leads.findIndex(l => l.id === lead.id);
    if (index !== -1) {
      setCurrentLeadIndex(index);
    }
  };

  const handlePhoneNumberSelect = (phoneNumber: string) => {
    if (selectedLead) {
      setSelectedPhoneNumber(phoneNumber);
      setCopiedMessage(generateMessage(selectedLead, phoneNumber));
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(copiedMessage);
      const button = document.getElementById('copyButton');
      if (button) {
        button.textContent = 'Copied! ✓';
        button.className = 'px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium';
        
        setTimeout(() => {
          button.textContent = 'Copy Message';
          button.className = 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium';
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to copy message:', err);
      alert('Failed to copy message. Please copy manually.');
    }
  };

  const updatePhoneNumbersProcessed = (leadId: string, count: number) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, phoneNumbersProcessed: Math.min(count, lead.phoneNumbers.length) }
          : lead
      )
    );
  };

  const handleLeadComplete = (leadId: string) => {
    // Mark current lead as processed
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, processed: true, phoneNumbersProcessed: lead.phoneNumbers.length }
          : lead
      )
    );

    // Auto-advance to next lead
    const nextIndex = currentLeadIndex + 1;
    if (nextIndex < leads.length) {
      const nextLead = leads[nextIndex];
      setCurrentLeadIndex(nextIndex);
      handleLeadSelect(nextLead);
    } else {
      // All leads processed
      setSelectedLead(null);
      setSelectedPhoneNumber('');
      setCopiedMessage('');
      setCurrentLeadIndex(0);
    }
  };

  const handleNextPhoneNumber = () => {
    if (!selectedLead) return;
    
    const currentIndex = selectedLead.phoneNumbers.findIndex((p) => p.number === selectedPhoneNumber);
    if (currentIndex !== -1 && currentIndex < selectedLead.phoneNumbers.length - 1) {
      const nextPhoneNumber = selectedLead.phoneNumbers[currentIndex + 1].number;
      setSelectedPhoneNumber(nextPhoneNumber);
      setCopiedMessage(generateMessage(selectedLead, nextPhoneNumber));
      
      // Update phone numbers processed count
      updatePhoneNumbersProcessed(selectedLead.id, currentIndex + 2);
    } else if (currentIndex === selectedLead.phoneNumbers.length - 1) {
      // All phone numbers processed for this lead, move to next lead
      handleLeadComplete(selectedLead.id);
    }
  };

  const handlePreviousPhoneNumber = () => {
    if (!selectedLead) return;
    
    const currentIndex = selectedLead.phoneNumbers.findIndex((p) => p.number === selectedPhoneNumber);
    if (currentIndex > 0) {
      const previousPhoneNumber = selectedLead.phoneNumbers[currentIndex - 1].number;
      setSelectedPhoneNumber(previousPhoneNumber);
      setCopiedMessage(generateMessage(selectedLead, previousPhoneNumber));
      
      // Update phone numbers processed count
      updatePhoneNumbersProcessed(selectedLead.id, currentIndex);
    } else if (currentIndex === 0) {
      const lastPhoneNumber = selectedLead.phoneNumbers[selectedLead.phoneNumbers.length - 1].number;
      setSelectedPhoneNumber(lastPhoneNumber);
      setCopiedMessage(generateMessage(selectedLead, lastPhoneNumber));
      
      // Update phone numbers processed count
      updatePhoneNumbersProcessed(selectedLead.id, selectedLead.phoneNumbers.length);
    }
  };

  const markLeadComplete = (leadId: string) => {
    handleLeadComplete(leadId);
  };

  // Auto-select first lead on component mount
  useEffect(() => {
    if (leads.length > 0 && !selectedLead) {
      handleLeadSelect(leads[0]);
    }
  }, [leads.length, selectedLead]);

  return {
    // State
    leads,
    selectedLead,
    selectedPhoneNumber,
    copiedMessage,
    currentLeadIndex,
    
    // Actions
    handleLeadSelect,
    handlePhoneNumberSelect,
    handleCopyMessage,
    handleNextPhoneNumber,
    handlePreviousPhoneNumber,
    markLeadComplete,
    generateMessage,
    
    // Internal methods
    setLeads,
    setCopiedMessage
  };
}
