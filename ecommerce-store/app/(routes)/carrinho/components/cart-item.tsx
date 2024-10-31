'use client';

import Currency from '@/components/ui/currency';
import Decorator from '@/components/ui/decorator';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import { Product, Color, Size } from '@/types';
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface CartItemProps {
  data: Product & {
    selectedColor: Color | null;
    selectedSize: Size | null;
  };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0]?.url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<Trash2Icon size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <div className="flex justify-center">
              <Decorator width={4} height={6} />
              <p className="ml-1 text-lg font-semibold text-[#025213]">
                {data.name}
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col text-sm space-y-1">
            <Currency value={data.price} />
            <p className="text-gray-500">
              Cor: {data.selectedColor?.name || 'Nenhuma cor selecionada'}
            </p>
            <p className="text-gray-500">
              Tamanho: {data.selectedSize?.name || 'Nenhum tamanho selecionado'}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
