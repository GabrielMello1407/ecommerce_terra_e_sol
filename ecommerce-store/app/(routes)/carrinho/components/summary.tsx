import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Summary = () => {
  const items = useCart((state) => state.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const searchParams = useSearchParams();
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('sucess')) {
      toast.success('Pagamento concluído.');
      removeAll();
    }
    if (searchParams.get('canceled')) {
      toast.error('Algo está errado.');
    }
  }, [searchParams, removeAll]);

  useEffect(() => {
    const total = items.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
    setTotalPrice(total);
  }, [items]);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      },
    );
    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-500">Pedido</h2>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <span className="text-base font-medium text-gray-900">Subtotal:</span>
          <span className="text-base font-medium text-gray-900">
            R$ {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-base font-medium text-gray-900">Frete:</span>
          <span className="text-base font-medium text-gray-900">R$</span>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-4">
          <span className="text-lg font-semibold text-gray-900">
            Valor Total:
          </span>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        className="w-full mt-6 rounded-md bg-[#025213]"
        onClick={onCheckout}
      >
        FINALIZAR COMPRA
      </Button>
    </div>
  );
};

export default Summary;
