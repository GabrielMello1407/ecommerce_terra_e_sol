'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface BillboardClientProps {
  data: Billboard[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Painel de controle (${data.length})`}
          description="Gerencie sua loja com o painel de controle"
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/painel-de-controle/novo`)
          }
        >
          <Plus className="mr-2 h-2 w-4" />
        </Button>
      </div>
      <Separator />
    </>
  );
};
