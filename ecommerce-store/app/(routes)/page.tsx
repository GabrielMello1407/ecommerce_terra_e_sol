import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import Billboard from '@/components/billboard';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

export const revalidate = 0;

const Homepage = async () => {
  const products = await getProducts({ isFeatured: true });

  const billboard = await getBillboard('0acc947c-968e-4ad8-a642-c80f4851b23a');

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Últimos produtos" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default Homepage;
