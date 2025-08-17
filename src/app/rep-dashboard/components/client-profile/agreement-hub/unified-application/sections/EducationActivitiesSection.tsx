'use client';

import React from 'react';
import { Lead } from '../../../../../types';
import FormField from '../components/FormField';
import FormSection from '../components/FormSection';

interface EducationActivitiesSectionProps {
  formData: any;
  updateFormData: (section: string, field: string, value: any) => void;
  selectedLead: Lead | null;
}

const EducationActivitiesSection: React.FC<EducationActivitiesSectionProps> = ({ 
  formData, 
  updateFormData, 
  selectedLead 
}) => {
  const educationData = formData.educationActivities || {};

  const handleFieldChange = (field: string, value: any) => {
    updateFormData('educationActivities', field, value);
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Section 9: Education & Activities"
        description="This final section gathers information on education and lifestyle activities."
        icon="🎓"
      >
        <div className="space-y-8">
          {/* Education */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Education</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Do you have a high school diploma? If yes, from which school/state?"
                type="text"
                value={educationData.highSchool || ''}
                onChange={(value) => handleFieldChange('highSchool', value)}
                placeholder="Enter school name and state or 'No'"
              />

              <FormField
                label="Do you have a college degree? If yes, which degree and from which college?"
                type="text"
                value={educationData.collegeDegree || ''}
                onChange={(value) => handleFieldChange('collegeDegree', value)}
                placeholder="Enter degree and college or 'No'"
              />

              <FormField
                label="Do you have a graduate degree? If yes, which one?"
                type="text"
                value={educationData.graduateDegree || ''}
                onChange={(value) => handleFieldChange('graduateDegree', value)}
                placeholder="Enter graduate degree or 'No'"
              />

              <FormField
                label="Please list any other professional certificates or licenses you hold"
                type="textarea"
                value={educationData.certificates || ''}
                onChange={(value) => handleFieldChange('certificates', value)}
                placeholder="List certificates and licenses or 'None'"
                rows={2}
              />
            </div>
          </div>

          {/* Activities and Travel */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Activities & Travel</h4>
            <div className="space-y-6">
              <FormField
                label="In the last 5 years, have you flown as a pilot or crew member on any aircraft, or do you intend to?"
                type="radio"
                value={educationData.pilotActivity || ''}
                onChange={(value) => handleFieldChange('pilotActivity', value)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
              />

              <FormField
                label="In the last 2 years, have you participated in hang gliding, auto racing, scuba diving, or skydiving, or do you plan to in the future?"
                type="radio"
                value={educationData.hazardousActivities || ''}
                onChange={(value) => handleFieldChange('hazardousActivities', value)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
              />

              <FormField
                label="In the next 2 years, do you plan to travel or reside outside of the United States for more than 4 consecutive weeks (excluding vacations)?"
                type="radio"
                value={educationData.internationalTravel || ''}
                onChange={(value) => handleFieldChange('internationalTravel', value)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ]}
              />
            </div>
          </div>

          {/* Final Acknowledgment */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-blue-900 mb-4">Application Completion</h4>
            <div className="space-y-4">
              <FormField
                label="I certify that all information provided in this application is true and complete to the best of my knowledge"
                type="checkbox"
                value={educationData.certificationAgreement || false}
                onChange={(value) => handleFieldChange('certificationAgreement', value)}
              />

              <FormField
                label="I understand that this information will be used for underwriting purposes and may be shared with third parties as necessary"
                type="checkbox"
                value={educationData.informationSharingAgreement || false}
                onChange={(value) => handleFieldChange('informationSharingAgreement', value)}
              />

              <FormField
                label="I agree to electronic signature and document processing through DocuSign or similar services"
                type="checkbox"
                value={educationData.electronicSignatureAgreement || false}
                onChange={(value) => handleFieldChange('electronicSignatureAgreement', value)}
              />
            </div>

            <div className="mt-6 p-4 bg-white rounded border">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Digital Signature:</strong> By completing this form and clicking "Submit Application", 
                you are providing your electronic signature and agreeing to all terms and conditions.
              </p>
              <p className="text-xs text-gray-500">
                Date: {new Date().toLocaleDateString()} | 
                Applicant: {formData.personalDetails?.fullName || selectedLead?.clientName || 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default EducationActivitiesSection;
