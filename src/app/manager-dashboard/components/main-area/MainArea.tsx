'use client';

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Lead, mockSalesReps, mockMessageTemplates, MessageTemplate } from '../../utils/mock-data';

interface MainAreaProps {
  leads: Lead[];
  rowSelection: { [key: string]: boolean };
  setRowSelection: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  messageTemplates: MessageTemplate[];
}

const MainArea: React.FC<MainAreaProps> = ({ leads, rowSelection, setRowSelection, messageTemplates }) => {

  const [fromRange, setFromRange] = useState('');
  const [toRange, setToRange] = useState('');

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
    <main className="flex-1 p-6 overflow-y-auto flex flex-col">
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Master Lead List</h2>
        <div className="flex items-center space-x-4">
            <input type="number" placeholder="From" value={fromRange} onChange={(e) => setFromRange(e.target.value)} className="p-2 border rounded-md w-24" />
            <input type="number" placeholder="To" value={toRange} onChange={(e) => setToRange(e.target.value)} className="p-2 border rounded-md w-24" />
            <button onClick={handleBatchSelect} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Select Range</button>
            <span className="text-sm font-medium text-gray-600">{selectedRowCount} leads selected</span>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-auto flex-grow">
        <table className="min-w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* The modal is no longer needed here, it will be controlled from the parent */}
    </main>
  );
};

export default MainArea;
