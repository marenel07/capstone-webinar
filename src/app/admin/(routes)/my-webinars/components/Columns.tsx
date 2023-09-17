'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './CellAction';

export type ParticipantColumn = {
  id: string;
  name: string;
  email: string;
  number: number;
  age: number;
  address: string;
  occupation: string;
  company: string;
  createdAt: string;
};

export const columns: ColumnDef<ParticipantColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email address',
  },
  {
    accessorKey: 'number',
    header: 'Phone number',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'occupation',
    header: 'Occupation',
  },
  {
    accessorKey: 'company',
    header: 'Company/Institution',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
