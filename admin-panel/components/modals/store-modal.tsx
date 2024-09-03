'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Criar loja"
      description="Adicione uma nova loja para gerenciar seus produtos e categorias"
      isOpen={storeModal.isOpen}
      onClose={() => {
        storeModal.OnClose;
      }}
    >
      Formulario futuro de criação
    </Modal>
  );
};
