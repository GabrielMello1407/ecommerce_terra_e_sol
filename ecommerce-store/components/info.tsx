'use client';

import { Product } from '@/types';
import Currency from './ui/currency';
import Button from './ui/button';
import { ShoppingCart } from 'lucide-react';
import Decorator from './ui/decorator';
import useCart from '@/hooks/use-cart';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAdd = () => {
    cart.addItem(data);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-2">
        <Decorator />
        <h1 className="text-3xl font-bold text-[#025213] font-roboto">
          {data.name}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex text-green-700">
          {/* Session  assessment*/}
          ★★★★☆
        </div>
        <p className="text-sm text-gray-500 font-roboto">(150)</p>
      </div>

      {/* Session Price */}
      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-bold text-[#025213] font-roboto">
          <Currency value={data?.price} />
        </p>
      </div>

      {/* Session description */}
      <div className="flex items-center gap-x-4">
        <div className="text-gray-600 font-roboto">
          {data?.description?.value}
        </div>
      </div>
      <h3 className="font-bold text-black font-roboto">
        {data?.description.name}
      </h3>

      {/* Session size */}
      <div className="mt-4">
        <h3 className="font-semibold text-black font-roboto">Tamanho</h3>
        <div className="flex gap-2 mt-2">
          <div className="border p-2 rounded text-center w-10 h-10">
            {data?.size.value}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-black font-roboto">Cor</h3>

        <div className="mt-2">
          <div
            className="h-6 w-6 rounded-md border border-gray-400"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2 rounded-md bg-[#025213] font-roboto"
          onClick={onAdd}
        >
          ADICIONAR AO CARRINHO
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
