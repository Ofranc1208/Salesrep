'use client';

import { useState, useCallback } from 'react';

interface FormData {
  personalDetails: any;
  maritalStatus: any;
  employment: any;
  settlementDetails: any;
  financialTransaction: any;
  medicalHistory: any;
  medicalProviders: any;
  legalCriminal: any;
  educationActivities: any;
}

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    personalDetails: {},
    maritalStatus: {},
    employment: {},
    settlementDetails: {},
    financialTransaction: {},
    medicalHistory: {},
    medicalProviders: {},
    legalCriminal: {},
    educationActivities: {}
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const updateFormData = useCallback((section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData],
        [field]: value
      }
    }));

    // Clear validation error for this field if it exists
    setValidationErrors(prev => {
      const sectionErrors = prev[section] || [];
      const updatedErrors = sectionErrors.filter(error => !error.includes(field));
      return {
        ...prev,
        [section]: updatedErrors
      };
    });
  }, []);

  const validateSection = useCallback(async (sectionId: number): Promise<boolean> => {
    const sectionKeys = [
      'personalDetails',
      'maritalStatus', 
      'employment',
      'settlementDetails',
      'financialTransaction',
      'medicalHistory',
      'medicalProviders',
      'legalCriminal',
      'educationActivities'
    ];

    const sectionKey = sectionKeys[sectionId - 1];
    const sectionData = formData[sectionKey as keyof FormData];
    const errors: string[] = [];

    // Basic validation rules for each section
    switch (sectionId) {
      case 1: // Personal Details
        if (!sectionData.fullName) errors.push('Full Legal Name is required');
        if (!sectionData.dateOfBirth) errors.push('Date of Birth is required');
        if (!sectionData.ssn) errors.push('Social Security Number is required');
        if (!sectionData.gender) errors.push('Gender is required');
        if (!sectionData.primaryPhone) errors.push('Primary Phone is required');
        if (!sectionData.email) errors.push('Email Address is required');
        if (!sectionData.streetAddress) errors.push('Street Address is required');
        if (!sectionData.city) errors.push('City is required');
        if (!sectionData.state) errors.push('State is required');
        if (!sectionData.zipCode) errors.push('Zip Code is required');
        break;

      case 2: // Marital Status
        if (!sectionData.maritalStatus) errors.push('Marital Status is required');
        break;

      case 3: // Employment
        if (sectionData.currentlyWorking === undefined) errors.push('Employment status is required');
        break;

      case 4: // Settlement Details
        if (!sectionData.reasonForSettlement) errors.push('Reason for Settlement is required');
        if (!sectionData.natureOfInjury) errors.push('Nature of Injury is required');
        break;

      case 5: // Financial Transaction
        if (!sectionData.reasonForTransaction) errors.push('Reason for Transaction is required');
        if (!sectionData.amountNeeded) errors.push('Amount Needed is required');
        break;

      // Sections 6-9 are mostly optional or have conditional validation
    }

    setValidationErrors(prev => ({
      ...prev,
      [sectionKey]: errors
    }));

    return errors.length === 0;
  }, [formData]);

  const getFormProgress = useCallback((): number => {
    const sections = Object.keys(formData);
    let totalFields = 0;
    let completedFields = 0;

    sections.forEach(sectionKey => {
      const sectionData = formData[sectionKey as keyof FormData];
      const fields = Object.keys(sectionData);
      totalFields += fields.length;
      
      fields.forEach(field => {
        const value = sectionData[field];
        if (value !== null && value !== undefined && value !== '') {
          completedFields++;
        }
      });
    });

    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
  }, [formData]);

  const saveForm = useCallback(async () => {
    try {
      // Here you would typically save to a backend API
      // For now, we'll just save to localStorage as a backup
      localStorage.setItem('agreementHubFormData', JSON.stringify({
        formData,
        timestamp: new Date().toISOString()
      }));
      
      setLastSaved(new Date());
      console.log('Form auto-saved successfully');
    } catch (error) {
      console.error('Error saving form:', error);
    }
  }, [formData]);

  const loadSavedForm = useCallback(() => {
    try {
      const saved = localStorage.getItem('agreementHubFormData');
      if (saved) {
        const { formData: savedFormData, timestamp } = JSON.parse(saved);
        setFormData(savedFormData);
        setLastSaved(new Date(timestamp));
        return true;
      }
    } catch (error) {
      console.error('Error loading saved form:', error);
    }
    return false;
  }, []);

  const clearForm = useCallback(() => {
    setFormData({
      personalDetails: {},
      maritalStatus: {},
      employment: {},
      settlementDetails: {},
      financialTransaction: {},
      medicalHistory: {},
      medicalProviders: {},
      legalCriminal: {},
      educationActivities: {}
    });
    setValidationErrors({});
    setLastSaved(null);
    localStorage.removeItem('agreementHubFormData');
  }, []);

  return {
    formData,
    validationErrors,
    lastSaved,
    updateFormData,
    validateSection,
    getFormProgress,
    saveForm,
    loadSavedForm,
    clearForm
  };
};
