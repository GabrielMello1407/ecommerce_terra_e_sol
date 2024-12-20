'use client';

import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import Filter from './filter';
import { Category, Color, Size } from '@/types';

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
  categories: Category[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors,
  categories,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden bg-[#025213] text-white"
      >
        Filtros
        <Plus size={20} className="text-white" />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* background */}
        <div className="fixed inset-0  bg-opacity-25" />
        {/* dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            {/* render the filter */}

            <div className="p-4">
              <Filter
                valueKey="categoryId"
                name="Categoria"
                data={categories}
              />
              <Filter valueKey="sizeId" name="Tamanhos" data={sizes} />
              <Filter valueKey="colorId" name="Cores" data={colors} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
