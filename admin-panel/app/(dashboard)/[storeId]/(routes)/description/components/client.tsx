'use client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, DescriptionsColumn } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';

interface DescriptionsClientProps {
  data: DescriptionsColumn[];
}

export const DescriptionsClient: React.FC<DescriptionsClientProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Descrições (${data.length})`}
          description="Gerencie sua loja com as descrições"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/description/new`)}
        >
          <Plus className="mr-2 h-2 w-4" /> Adicionar novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Chamadas da api para as descrições" />
      <Separator />
      <ApiList entityIdName="descriptions" entityName="descriptionId" />
    </>
  );
};
