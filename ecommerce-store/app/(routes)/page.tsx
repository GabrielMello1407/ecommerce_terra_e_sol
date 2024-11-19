import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import Billboard from '@/components/billboard';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

export const revalidate = 0;

const Homepage = async () => {
  const products = await getProducts({ isFeatured: true });

  const billboard = await getBillboard('b7e66668-13cc-4994-ad43-7e95354f1935');

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} title="Compre Agora" link="/produtos" />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Últimos produtos" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default Homepage;
