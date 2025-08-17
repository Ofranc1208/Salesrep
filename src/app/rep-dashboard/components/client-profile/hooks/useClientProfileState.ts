import { useState } from 'react';
import { SectionKey, ExpandedSections } from '../types';

export const useClientProfileState = () => {
  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    clientProfile: false,
    attorney: false,
    court: false,
    annuity: false,
    offer: false,
    notes: false,
    messageHistory: false,
    cashAdvance: false,
    settlementSummary: false,
    phoneManagement: false
  });

  // Document Hub state
  const [showDocumentHub, setShowDocumentHub] = useState(false);

  // Deal Management Hub state
  const [showDealManagementHub, setShowDealManagementHub] = useState(false);

  // Agreement Hub state
  const [showAgreementHub, setShowAgreementHub] = useState(false);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      clientProfile: true,
      attorney: true,
      court: true,
      annuity: true,
      offer: true,
      notes: true,
      messageHistory: true,
      cashAdvance: true,
      settlementSummary: true,
      phoneManagement: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      clientProfile: false,
      attorney: false,
      court: false,
      annuity: false,
      offer: false,
      notes: false,
      messageHistory: false,
      cashAdvance: false,
      settlementSummary: false,
      phoneManagement: false
    });
  };

  return {
    expandedSections,
    showDocumentHub,
    setShowDocumentHub,
    showDealManagementHub,
    setShowDealManagementHub,
    showAgreementHub,
    setShowAgreementHub,
    toggleSection,
    expandAll,
    collapseAll
  };
};
