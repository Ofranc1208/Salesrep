'use client';

import React, { useState, useEffect } from 'react';
import { Lead } from '../../../../types';
import FormProgress from './components/FormProgress';
import PersonalDetailsSection from './sections/PersonalDetailsSection';
import MaritalStatusSection from './sections/MaritalStatusSection';
import EmploymentSection from './sections/EmploymentSection';
import SettlementDetailsSection from './sections/SettlementDetailsSection';
import FinancialTransactionSection from './sections/FinancialTransactionSection';
import MedicalHistorySection from './sections/MedicalHistorySection';
import MedicalProvidersSection from './sections/MedicalProvidersSection';
import LegalCriminalSection from './sections/LegalCriminalSection';
import EducationActivitiesSection from './sections/EducationActivitiesSection';
import { useApplicationForm } from './hooks/useApplicationForm';

interface UnifiedApplicationFormProps {
  selectedLead: Lead | null;
  onProgressUpdate: (progress: number) => void;
}

const UnifiedApplicationForm: React.FC<UnifiedApplicationFormProps> = ({ 
  selectedLead, 
  onProgressUpdate 
}) => {
  const [currentSection, setCurrentSection] = useState(1);
  const { formData, updateFormData, validateSection, getFormProgress, saveForm } = useApplicationForm();

  const sections = [
    { id: 1, name: 'Personal', component: PersonalDetailsSection },
    { id: 2, name: 'Marital', component: MaritalStatusSection },
    { id: 3, name: 'Employment', component: EmploymentSection },
    { id: 4, name: 'Settlement', component: SettlementDetailsSection },
    { id: 5, name: 'Financial', component: FinancialTransactionSection },
    { id: 6, name: 'Medical', component: MedicalHistorySection },
    { id: 7, name: 'Providers', component: MedicalProvidersSection },
    { id: 8, name: 'Legal', component: LegalCriminalSection },
    { id: 9, name: 'Education', component: EducationActivitiesSection }
  ];

  const currentSectionData = sections.find(s => s.id === currentSection);
  const CurrentSectionComponent = currentSectionData?.component;

  // Update progress when form data changes
  useEffect(() => {
    const progress = getFormProgress();
    onProgressUpdate(progress);
  }, [formData, onProgressUpdate, getFormProgress]);

  const handleNext = async () => {
    const isValid = await validateSection(currentSection);
    if (isValid && currentSection < sections.length) {
      setCurrentSection(currentSection + 1);
      await saveForm(); // Auto-save on section change
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSectionJump = async (sectionId: number) => {
    // Allow jumping to any section, but validate current section first
    if (sectionId !== currentSection) {
      await validateSection(currentSection);
      setCurrentSection(sectionId);
    }
  };

  const handleSubmit = async () => {
    // Validate all sections before final submission
    let allValid = true;
    for (let i = 1; i <= sections.length; i++) {
      const isValid = await validateSection(i);
      if (!isValid) {
        allValid = false;
        setCurrentSection(i); // Jump to first invalid section
        break;
      }
    }

    if (allValid) {
      await saveForm();
      // Here you would typically submit to DocuSign or other services
      console.log('Form submitted successfully!', formData);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Form Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Unified Application Form</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Section {currentSection} of {sections.length}: {currentSectionData?.name}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={saveForm}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              💾 Auto-Save
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <FormProgress 
        sections={sections}
        currentSection={currentSection}
        onSectionClick={handleSectionJump}
        formData={formData}
      />

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {CurrentSectionComponent && (
          <CurrentSectionComponent
            formData={formData}
            updateFormData={updateFormData}
            selectedLead={selectedLead}
          />
        )}
      </div>

      {/* Navigation Footer */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 1}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentSection === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← Previous
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {currentSection} of {sections.length} sections
            </span>
          </div>

          {currentSection === sections.length ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Submit Application
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedApplicationForm;
