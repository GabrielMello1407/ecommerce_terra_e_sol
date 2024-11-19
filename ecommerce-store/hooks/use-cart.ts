import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { CartProduct } from '@/types';

interface CartStore {
  items: CartProduct[];
  addItem: (data: CartProduct) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartProduct) => {
        // Verifica se o item já existe
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast('Item já está no carrinho.');
        }

        set({ items: [...get().items, data] });
        toast.success('Item adicionado ao carrinho.');
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success('Item removido do carrinho.');
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
