'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Lead } from '../../utils/mock-data';

interface FileUploadSectionProps {
  onFileUpload: (leads: Lead[], fileName: string) => void;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  setUploadStatus: (status: 'idle' | 'uploading' | 'success' | 'error') => void;
  uploadMessage: string;
  setUploadMessage: (message: string) => void;
  uploadedFileName: string | null;
  setUploadedFileName: (fileName: string | null) => void;
}

export default function FileUploadSection({
  onFileUpload,
  uploadStatus,
  setUploadStatus,
  uploadMessage,
  setUploadMessage,
  uploadedFileName,
  setUploadedFileName
}: FileUploadSectionProps) {

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset status and show uploading
    setUploadStatus('uploading');
    setUploadMessage('Processing file...');
    setUploadedFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const leads: Lead[] = results.data.map((row: any, index: number) => ({
            paymentType: (row.paymentType || 'LCP') as 'LCP' | 'Guaranteed',
            CBSI: parseInt(row.CBSI) || index + 1,
            repFirstName: row.repFirstName || 'Unassigned',
            clientFirstName: row.clientFirstName || row.firstName || row.name || `Client${index + 1}`,
            clientLastName: row.clientLastName || row.lastName || 'Unknown',
            insuranceCompany: row.insuranceCompany || 'Unknown Insurance',
            paymentStrtDate: row.paymentStrtDate || '2024-01-01',
            paymentEndDate: row.paymentEndDate || '2044-01-01',
            payment100: parseFloat(row.payment100) || 1000,
            payment50: parseFloat(row.payment50) || 500,
            offerAt100Low: parseFloat(row.offerAt100Low) || 15000,
            offerAt100High: parseFloat(row.offerAt100High) || 25000,
            offerAt50Low: parseFloat(row.offerAt50Low) || 7500,
            offerAt50High: parseFloat(row.offerAt50High) || 12500,
            lifeInsurancePayment100: parseFloat(row.lifeInsurancePayment100) || 0,
            lifeInsurancePayment50: parseFloat(row.lifeInsurancePayment50) || 0,
            phone1: row.phone1 || row.phone || row.phoneNumber || `555-000-${String(index + 1).padStart(4, '0')}`,
            phone2: row.phone2 || undefined,
            phone3: row.phone3 || undefined,
            phone4: row.phone4 || undefined,
            SSN: row.SSN || undefined,
            DOB: row.DOB || undefined,
            email: row.email || row.Email || undefined,
            mailingAddress1: row.mailingAddress1 || undefined,
            mailingAddress2: row.mailingAddress2 || undefined,
            mailingCity: row.mailingCity || undefined,
            mailingState: row.mailingState || undefined,
            mailingZipCode: row.mailingZipCode || undefined,
            physicalAddress1: row.physicalAddress1 || undefined,
            physicalAddress2: row.physicalAddress2 || undefined,
            physicalCity: row.physicalCity || undefined,
            physicalState: row.physicalState || undefined,
            physicalZipCode: row.physicalZipCode || undefined,
            status: 'New' as 'New' | 'Assigned' | 'Contacted',
            dateAdded: new Date().toLocaleDateString(),
            assignedTo: undefined,
            assignedDate: null
          }));

          onFileUpload(leads, file.name);
          setUploadStatus('success');
          setUploadMessage(`Successfully uploaded ${leads.length} leads from "${file.name}"`);
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setUploadStatus('idle');
            setUploadMessage('');
          }, 3000);

        } catch (error) {
          console.error('Error parsing CSV:', error);
          setUploadStatus('error');
          setUploadMessage('Error parsing CSV file. Please check the file format.');
        }
      },
      error: (error) => {
        console.error('Papa Parse error:', error);
        setUploadStatus('error');
        setUploadMessage('Error reading file. Please try again.');
      }
    });

    // Reset file input
    event.target.value = '';
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Upload Lead List</h3>
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={uploadStatus === 'uploading'}
        />
      </div>
      
      {/* Upload Status Messages */}
      {uploadStatus !== 'idle' && (
        <div className={`p-3 rounded-md mb-4 ${
          uploadStatus === 'success' ? 'bg-green-50 border border-green-200' :
          uploadStatus === 'error' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center">
            {uploadStatus === 'uploading' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            )}
            {uploadStatus === 'success' && (
              <span className="text-green-600 mr-2">✅</span>
            )}
            {uploadStatus === 'error' && (
              <span className="text-red-600 mr-2">❌</span>
            )}
            <p className={`text-sm ${
              uploadStatus === 'success' ? 'text-green-800' :
              uploadStatus === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {uploadMessage}
            </p>
          </div>
        </div>
      )}

      {uploadedFileName && uploadStatus === 'idle' && (
        <div className="mb-4 p-2 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-700">
            <strong>Last uploaded:</strong> {uploadedFileName}
          </p>
        </div>
      )}
      
      <p className="text-xs text-gray-600 mb-4">
        Upload a CSV file with columns: clientFirstName, clientLastName, phone1, insuranceCompany, payment100, etc.
      </p>
    </div>
  );
}
