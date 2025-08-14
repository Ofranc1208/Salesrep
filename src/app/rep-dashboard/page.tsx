'use client';

import React, { useState, useEffect } from 'react';
import LeadList from './components/LeadList';
import LeadManagement from './components/LeadManagement';
import { mockLeads, campaignInfo } from './utils/mock-data';
import {
  getStatusColor,
  getStatusText,
  getPhoneStatusColor,
  getPhoneStatusTextColor,
  getPhoneStatusText,
  getRelationshipText,
  getNextStatus
} from './utils/status-helpers';
import { Lead, TabType, PhoneNumber } from './types';

export default function RepDashboard() {
  const [repName] = useState('Client Relations Rep One');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState<string>('');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
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

  const updatePhoneNumbersProcessed = (leadId: number, count: number) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, phoneNumbersProcessed: Math.min(count, lead.phoneNumbers.length) }
          : lead
      )
    );
  };

  const handleLeadComplete = (leadId: number) => {
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

  const markLeadComplete = (leadId: number) => {
    handleLeadComplete(leadId);
  };

  const updatePhoneNumberStatus = (leadId: number, phoneNumber: string, newStatus: string) => {
    console.log(`Updating phone ${phoneNumber} status to ${newStatus} for lead ${leadId}`);
    
    // Update the lead's phone numbers
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map(phone => 
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

  const updatePhoneNumberType = (leadId: number, phoneNumber: string, newType: string) => {
    console.log(`Updating phone ${phoneNumber} type to ${newType} for lead ${leadId}`);
    
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map(phone => 
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

  const updatePhoneNumberRelationship = (leadId: number, phoneNumber: string, newRelationship: string) => {
    console.log(`Updating phone ${phoneNumber} relationship to ${newRelationship} for lead ${leadId}`);
    
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map(phone => 
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

  const updatePhoneNumberNotes = (leadId: number, phoneNumber: string, newNotes: string) => {
    console.log(`Updating phone ${phoneNumber} notes to ${newNotes} for lead ${leadId}`);
    
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? {
              ...lead,
              phoneNumbers: lead.phoneNumbers.map(phone => 
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

  const addPhoneNumberToLead = (leadId: number, newPhoneNumber: PhoneNumber) => {
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
    
    setLeads(prevLeads => 
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

  // Auto-select first lead on component mount
  useEffect(() => {
    if (leads.length > 0 && !selectedLead) {
      handleLeadSelect(leads[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sales Rep Dashboard</h1>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-sm text-gray-600">Welcome, <span className="font-medium text-gray-900">{repName}</span></p>
                  <span className="text-gray-300">•</span>
                  <p className="text-sm text-blue-600 font-medium">Structured Settlement Buyouts</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Pending</div>
                <div className="text-xl font-semibold text-orange-600">{leads.filter(l => l.status === 'pending').length}</div>
              </div>
              <a 
                href="/manager-dashboard" 
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Manager Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Lead List */}
          <div className="space-y-4">
            <LeadList
              leads={leads}
              selectedLead={selectedLead}
              onLeadSelect={handleLeadSelect}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              campaignInfo={campaignInfo}
            />
          </div>

          {/* Right Side - Lead Management */}
          <div className="space-y-4">
            <LeadManagement
              selectedLead={selectedLead}
              activeTab={activeTab}
              selectedPhoneNumber={selectedPhoneNumber}
              copiedMessage={copiedMessage}
              onTabChange={setActiveTab}
              onCopyMessage={handleCopyMessage}
              onGenerateFollowUp={() => {
                if (selectedLead) {
                  setCopiedMessage(generateMessage(selectedLead, selectedPhoneNumber, 'follow-up'));
                }
              }}
              onMarkComplete={() => selectedLead && markLeadComplete(selectedLead.id)}
              onNextPhoneNumber={handleNextPhoneNumber}
              onPreviousPhoneNumber={handlePreviousPhoneNumber}
              onPhoneNumberSelect={handlePhoneNumberSelect}
              onUpdateStatus={(phoneNumber, newStatus) => {
                if (selectedLead) {
                  updatePhoneNumberStatus(selectedLead.id, phoneNumber, newStatus);
                }
              }}
              onUpdateType={(phoneNumber, newType) => {
                if (selectedLead) {
                  updatePhoneNumberType(selectedLead.id, phoneNumber, newType);
                }
              }}
              onUpdateRelationship={(phoneNumber, newRelationship) => {
                if (selectedLead) {
                  updatePhoneNumberRelationship(selectedLead.id, phoneNumber, newRelationship);
                }
              }}
              onUpdateNotes={(phoneNumber, newNotes) => {
                if (selectedLead) {
                  updatePhoneNumberNotes(selectedLead.id, phoneNumber, newNotes);
                }
              }}
              onAddPhoneNumber={(newPhoneNumber) => {
                if (selectedLead) {
                  addPhoneNumberToLead(selectedLead.id, newPhoneNumber);
                }
              }}
              getPhoneStatusColor={getPhoneStatusColor}
              getPhoneStatusTextColor={getPhoneStatusTextColor}
              getPhoneStatusText={getPhoneStatusText}
              getRelationshipText={getRelationshipText}
              getNextStatus={getNextStatus}
              currentLeadProgress={currentLeadIndex + 1}
              totalLeads={leads.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
