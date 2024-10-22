'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type DescriptionsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<DescriptionsColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Tipo Tecido ou material',
  },
  {
    accessorKey: 'value',
    header: 'Descrição',
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
