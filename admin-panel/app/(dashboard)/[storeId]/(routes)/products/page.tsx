import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; //
import { ProductClient } from './components/client';
import prismadb from '@/lib/prismadb';
import { ProductColumn } from './components/columns';
import { formatter } from '@/lib/utils';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      sizes: true,
      color: true,
      description: true,
      details: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    description: item.description.name,
    details: item.details.name,
    size: item.sizes.map((size) => size.name).join(', '),
    color: item.color.map((color) => color.value).join(', '),
    createdAt: format(item.createdAt, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
