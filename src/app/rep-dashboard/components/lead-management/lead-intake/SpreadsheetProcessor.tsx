'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

interface SpreadsheetProcessorProps {
  onDataProcessed: (data: any[]) => void;
  isProcessing: boolean;
}

export default function SpreadsheetProcessor({
  onDataProcessed,
  isProcessing
}: SpreadsheetProcessorProps) {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [previewData, setPreviewData] = useState<any[]>([]);

  const processFile = useCallback(async (file: File) => {
    setUploadStatus('processing');
    setErrorMessage('');

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      
      // Get first worksheet
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      
      // Convert to JSON with header row
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: 'Not Available' // Default value for empty cells
      });

      if (jsonData.length < 2) {
        throw new Error('Spreadsheet must contain at least a header row and one data row');
      }

      // First row is headers, rest is data
      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1) as any[][];

      // Convert to objects
      const processedData = rows.map((row, index) => {
        const leadData: any = { rowIndex: index + 2 }; // +2 because we skip header and 0-index
        
        headers.forEach((header, colIndex) => {
          const value = row[colIndex];
          leadData[header] = value !== undefined && value !== null && value !== '' 
            ? value 
            : 'Not Available';
        });

        return leadData;
      });

      setPreviewData(processedData.slice(0, 5)); // Show first 5 rows for preview
      setUploadStatus('success');
      onDataProcessed(processedData);

    } catch (error) {
      console.error('File processing error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process file');
      setUploadStatus('error');
    }
  }, [onDataProcessed]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : uploadStatus === 'success'
            ? 'border-green-400 bg-green-50'
            : uploadStatus === 'error'
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          {uploadStatus === 'processing' ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-blue-600 font-medium">Processing spreadsheet...</p>
            </>
          ) : uploadStatus === 'success' ? (
            <>
              <div className="text-green-600 text-4xl">✅</div>
              <p className="text-green-600 font-medium">Spreadsheet processed successfully!</p>
              <p className="text-sm text-gray-600">
                {previewData.length} leads detected. Click "Validate Data" to continue.
              </p>
            </>
          ) : uploadStatus === 'error' ? (
            <>
              <div className="text-red-600 text-4xl">❌</div>
              <p className="text-red-600 font-medium">Processing failed</p>
              <p className="text-sm text-red-600">{errorMessage}</p>
              <p className="text-sm text-gray-600">Try uploading a different file</p>
            </>
          ) : (
            <>
              <div className="text-gray-400 text-4xl">📊</div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? 'Drop your spreadsheet here' : 'Upload Lead Spreadsheet'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Drag and drop your Excel (.xlsx, .xls) or CSV file here, or click to browse
                </p>
              </div>
              <div className="text-xs text-gray-500">
                Supported formats: .xlsx, .xls, .csv • Max file size: 10MB
              </div>
            </>
          )}
        </div>
      </div>

      {/* Preview Data */}
      {previewData.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Data Preview (First 5 Rows)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(previewData[0] || {}).filter(key => key !== 'rowIndex').slice(0, 6).map((header) => (
                    <th key={header} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                  {Object.keys(previewData[0] || {}).length > 6 && (
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ... +{Object.keys(previewData[0] || {}).length - 6} more columns
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previewData.map((row, index) => (
                  <tr key={index}>
                    {Object.entries(row).filter(([key]) => key !== 'rowIndex').slice(0, 6).map(([key, value]) => (
                      <td key={key} className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                        {String(value).length > 20 ? `${String(value).substring(0, 20)}...` : String(value)}
                      </td>
                    ))}
                    {Object.keys(row).length > 6 && (
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                        ...
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">📋 Spreadsheet Requirements</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• First row must contain column headers</li>
          <li>• Include client name, phone numbers, SSN, DOB</li>
          <li>• Payment information: amounts, dates, insurance company</li>
          <li>• NPV and offer details</li>
          <li>• Empty cells will be marked as "Not Available"</li>
          <li>• System will adapt to any additional columns you include</li>
        </ul>
      </div>
    </div>
  );
}
