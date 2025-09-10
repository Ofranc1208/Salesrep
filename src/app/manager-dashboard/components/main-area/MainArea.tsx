'use client';

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Lead, mockSalesReps, mockMessageTemplates, MessageTemplate } from '../../utils/mock-data';
import ManagerTestComponent from '../../../shared/ManagerTestComponent';

interface MainAreaProps {
  leads: Lead[];
  rowSelection: { [key: string]: boolean };
  setRowSelection: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  messageTemplates: MessageTemplate[];
}

const MainArea: React.FC<MainAreaProps> = ({ leads, rowSelection, setRowSelection, messageTemplates }) => {

  const [fromRange, setFromRange] = useState('');
  const [toRange, setToRange] = useState('');
  const [showTestView, setShowTestView] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const columns = useMemo<ColumnDef<Lead>[]>(() => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            {...{
              checked: table.getIsAllRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        id: 'rowNumber',
        header: '#',
        cell: ({ row }) => row.index + 1,
      },
      { accessorKey: 'paymentType', header: 'Payment Type' },
      { accessorKey: 'CBSI', header: 'CRM ID' },
      { accessorKey: 'repFirstName', header: 'Rep First Name' },
      { accessorKey: 'clientFirstName', header: 'Client First Name' },
      { accessorKey: 'clientLastName', header: 'Client Last Name' },
      { accessorKey: 'insuranceCompany', header: 'Insurance Co.' },
      { accessorKey: 'paymentStrtDate', header: 'Payment Start Dt' },
      { accessorKey: 'paymentEndDate', header: 'Payment End Dt' },
      { 
        accessorKey: 'payment100', 
        header: 'Payment (100%)',
        cell: ({ row }) => formatCurrency(row.original.payment100)
      },
      { 
        accessorKey: 'payment50', 
        header: 'Payment (50%)',
        cell: ({ row }) => formatCurrency(row.original.payment50)
      },
      { 
        accessorKey: 'offerAt100Low', 
        header: 'Offer 100% Low',
        cell: ({ row }) => formatCurrency(row.original.offerAt100Low)
      },
      { 
        accessorKey: 'offerAt100High', 
        header: 'Offer 100% High',
        cell: ({ row }) => formatCurrency(row.original.offerAt100High)
      },
      { 
        accessorKey: 'offerAt50Low', 
        header: 'Offer 50% Low',
        cell: ({ row }) => formatCurrency(row.original.offerAt50Low)
      },
      { 
        accessorKey: 'offerAt50High', 
        header: 'Offer 50% High',
        cell: ({ row }) => formatCurrency(row.original.offerAt50High)
      },
      { 
        accessorKey: 'lifeInsurancePayment100', 
        header: 'Life Ins Pay 100%',
        cell: ({ row }) => formatCurrency(row.original.lifeInsurancePayment100)
      },
      { 
        accessorKey: 'lifeInsurancePayment50', 
        header: 'Life Ins Pay 50%',
        cell: ({ row }) => formatCurrency(row.original.lifeInsurancePayment50)
      },
      { accessorKey: 'phone1', header: 'Phone 1' },
      { accessorKey: 'phone2', header: 'Phone 2' },
      { accessorKey: 'phone3', header: 'Phone 3' },
      { accessorKey: 'status', header: 'Status' },
    ],
    []
  );

  const table = useReactTable({
    data: leads,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleBatchSelect = () => {
    const from = parseInt(fromRange, 10);
    const to = parseInt(toRange, 10);
    if (!isNaN(from) && !isNaN(to) && from <= to) {
      const newSelection: { [key: string]: boolean } = {};
      for (let i = from - 1; i < to; i++) {
        if (table.getRow(i.toString())) {
          newSelection[i.toString()] = true;
        }
      }
      setRowSelection(newSelection);
    }
  };

  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <main className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Content Header */}
      <div className="bg-white border-b border-gray-200 p-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Master Lead List</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and assign leads to sales representatives
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTestView(!showTestView)}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
              title="Toggle between main lead list and data flow testing interface"
            >
              {showTestView ? '📋 Show Lead List' : '🧪 Test Data Flow'}
            </button>
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Quick Select:</span>
              <input 
                type="number" 
                placeholder="From" 
                value={fromRange} 
                onChange={(e) => setFromRange(e.target.value)} 
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
              />
              <span className="text-gray-400">to</span>
              <input 
                type="number" 
                placeholder="To" 
                value={toRange} 
                onChange={(e) => setToRange(e.target.value)} 
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
              />
              <button 
                onClick={handleBatchSelect} 
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Select
              </button>
            </div>
            <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <span className="text-sm font-medium">{selectedRowCount} selected</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Table Container */}
      <div className="flex-1 p-6 overflow-hidden">
        {showTestView ? (
          /* Phase 2 Data Flow Test View */
          <div className="h-full overflow-y-auto">
            <ManagerTestComponent />
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 h-full flex flex-col overflow-hidden">
          {leads.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leads available</h3>
              <p className="text-sm text-gray-600 mb-4">Upload a CSV file or select a lead list to get started</p>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => {
                        // Define column widths based on content
                        let colWidth = "min-w-24";
                        if (index === 0) colWidth = "w-16"; // Checkbox column
                        else if (index === 1) colWidth = "w-16"; // Row number
                        else if (index === 2) colWidth = "w-24"; // Payment Type
                        else if (index === 3) colWidth = "w-32"; // CRM ID
                        else if (index >= 4 && index <= 6) colWidth = "w-32"; // Names
                        else colWidth = "w-28"; // Other columns
                        
                        return (
                          <th key={header.id} className={`${colWidth} px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200`}>
                            <div className="truncate">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <tr key={row.id} className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      {row.getVisibleCells().map((cell, cellIndex) => {
                        // Apply same width classes as headers
                        let colWidth = "min-w-24";
                        if (cellIndex === 0) colWidth = "w-16";
                        else if (cellIndex === 1) colWidth = "w-16";
                        else if (cellIndex === 2) colWidth = "w-24";
                        else if (cellIndex === 3) colWidth = "w-32";
                        else if (cellIndex >= 4 && cellIndex <= 6) colWidth = "w-32";
                        else colWidth = "w-28";
                        
                        return (
                          <td key={cell.id} className={`${colWidth} px-3 py-3 text-sm text-gray-900`}>
                            <div className="truncate">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        )}
      </div>
    </main>
  );
};

export default MainArea;
