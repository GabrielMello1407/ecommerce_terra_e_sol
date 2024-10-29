import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import Filter from './components/filter';
import MobileFilters from './components/mobile-filter';
import ProductCard from '@/components/ui/product-card';
import getCategories from '@/actions/get-categories';

export const revalidate = 0;

interface CategoryPageProps {
  searchParams: {
    colorId: string;
    sizeId: string;
    categoryId: string;
  };
}

const ProdutoPage: React.FC<CategoryPageProps> = async ({ searchParams }) => {
  const products = await getProducts({
    categoryId: searchParams.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const categories = await getCategories();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex justify-start">
            <h3
              className={`font-bold text-3xl text-[#025213] underline font-kadwa`}
            >
              Coleções
            </h3>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <h2
            className="font-bold text-2xl text-[#025213]
          font-kadwa mb-3"
          >
            Filtros
          </h2>
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters
              sizes={sizes}
              colors={colors}
              categories={categories}
            />
            <div className="hidden lg:block">
              <Filter
                valueKey="categoryId"
                name="Categorias"
                data={categories}
              />
              <Filter valueKey="sizeId" name="Tamanhos" data={sizes} />
              <Filter valueKey="colorId" name="Cores" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProdutoPage;
