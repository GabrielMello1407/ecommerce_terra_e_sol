'use client';

import { Product } from '@/types';
import Image from 'next/image';
import IconButton from './icon-button';
import { Expand } from 'lucide-react';
import Currency from './currency';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import usePreviewModal from '@/hooks/use-preview-modal';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  // const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  // const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   event.stopPropagation();
  //   cart.addItem(data);
  // };
  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* {images and actions} */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          alt="Image"
          src={data?.images?.[0]?.url}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand className="text-gray-600" size={20} />}
            />
          </div>
        </div>
      </div>
      {/* {Description} */}
      <div>
        <p className="font-semibold text-lg font-roboto text-[#025213]">
          {data.name}
        </p>
        <p className="text-sm text-gray-500 text-[#14812C]">
          {data.category.name}
        </p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between text-[#14812C]">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
