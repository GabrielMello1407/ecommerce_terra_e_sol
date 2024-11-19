'use client';

import React, { useState } from 'react';
import { Color, Product, Size } from '@/types';
import Currency from './ui/currency';
import Button from './ui/button';
import { ShoppingCart } from 'lucide-react';
import Decorator from './ui/decorator';
import useCart from '@/hooks/use-cart';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

interface InfoProps {
  data: Product;
}
interface CartItem extends Product {
  selectedColor: Color | null;
  selectedSize: Size | null;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const { isSignedIn } = useUser();

  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const onAdd = () => {
    if (!isSignedIn) {
      toast('Você precisa estar logado para adicionar os itens ao carrinho.');
      return;
    }

    if (selectedColor && selectedSize) {
      const cartItem: CartItem = {
        ...data,
        selectedColor,
        selectedSize,
      };
      cart.addItem(cartItem);
    } else {
      toast('Por favor, selecione um tamanho e uma cor.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Informações principais do produto */}
      <div className="flex items-center gap-x-2">
        <Decorator width={5} height={25} />
        <h1 className="text-3xl font-bold text-[#025213] font-roboto">
          {data.name}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex text-green-700">★★★★☆</div>
        <p className="text-sm text-gray-500 font-roboto">(150)</p>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-bold text-[#025213] font-roboto">
          <Currency value={data.price} />
        </p>
      </div>

      <div className="flex items-center gap-x-4">
        <div className="text-gray-600 font-roboto">
          {data.description?.value}
        </div>
      </div>

      <h3 className="font-bold text-black font-roboto">
        {data.description?.name}
      </h3>

      {/* Seção de tamanhos */}
      <div className="mt-4">
        <h3 className="font-semibold text-black font-roboto">Tamanhos</h3>
        <div className="flex gap-2 mt-2">
          {data.sizes?.map((size) => (
            <div
              key={size.id}
              className={`border p-2 rounded text-center w-10 h-10 cursor-pointer ${
                selectedSize?.id === size.id ? 'bg-green-200' : ''
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size.value}
            </div>
          )) || 'Nenhum tamanho disponível'}
        </div>
      </div>

      {/* Seção de cores */}
      <div className="mt-4">
        <h3 className="font-semibold text-black font-roboto">Cores</h3>
        <div className="flex gap-2 mt-2">
          {data.color?.map((colors) => (
            <div
              key={colors.id}
              className={`h-6 w-6 rounded-md border border-gray-400 cursor-pointer ${
                selectedColor?.id === colors.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: colors.value }}
              onClick={() => setSelectedColor(colors)}
            />
          )) || 'Nenhuma cor disponível'}
        </div>
      </div>

      {/* Botão de adicionar ao carrinho */}
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
