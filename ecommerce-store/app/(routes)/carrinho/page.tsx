'use client';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import CartItem from './components/cart-item';
import Summary from './components/summary';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  console.log('Success:', success);
  console.log('Canceled:', canceled);

  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  if (success === 'true') {
    return (
      <div>
        <h1>Pagamento bem-sucedido!</h1>
        <p>Seu pagamento foi realizado com sucesso. Obrigado pela compra.</p>
      </div>
    );
  }

  if (canceled === '1') {
    return (
      <div>
        <h1>Pagamento cancelado</h1>
        <p>
          Seu pagamento foi cancelado. Tente novamente mais tarde ou entre em
          contato.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold underline text-[#025213] font-kadwa">
            Carrinho
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">
                  {' '}
                  Nenhum produto adicionado no carrinho
                </p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
