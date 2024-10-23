'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type DetailsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<DetailsColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Tipo Tecido ou material',
  },
  {
    accessorKey: 'value',
    header: 'Detalhes',
  },
  {
    accessorKey: 'createdAt',
    header: 'Data',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
