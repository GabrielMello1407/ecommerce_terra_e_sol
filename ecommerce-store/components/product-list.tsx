import { Product } from '@/types';
import NoResults from './ui/no-results';
import ProductCard from './ui/product-card';

interface ProductListProps {
  title?: string;
  titletwo?: string;
  items: Product[];
}
const ProductList: React.FC<ProductListProps> = ({
  title,
  titletwo,
  items,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <h3
          className={`font-bold text-3xl text-[#025213] underline font-kadwa`}
        >
          {title}
        </h3>
      </div>
      <div className="flex w-full">
        <h3
          className={`font-bold text-3xl text-[#025213] underline font-kadwa`}
        >
          {titletwo}
        </h3>
      </div>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
