'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Description } from '@prisma/client';
import { Trash } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { AlertModal } from '@/components/modals/alert-modal';

import ImageUpload from '@/components/ui/image-upload';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(1, 'O nome precisa pelo menos 1 caracter.'),
  value: z.string().min(1, 'Valor inválido'),
});

type DescriptionFormValues = z.infer<typeof formSchema>;

interface DescriptionFormProps {
  initialData: Description | null;
}

export const DescriptionsForm: React.FC<DescriptionFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Editar descrição' : 'Criar descrição';
  const description = initialData ? 'Editar tamanhos' : 'Adicionar descrição';
  const toastMessage = initialData
    ? 'Descrição atualizada'
    : 'Descrição criada com sucesso.';
  const action = initialData ? ' Salvar mudanças' : 'Criar';

  const form = useForm<DescriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: DescriptionFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/descriptions/${params.descriptionId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/descriptions`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/description`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Algo está errado.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/descriptions/${params.descriptionId}`,
      );
      router.refresh();
      router.push(`/${params.storeId}/descriptions`);
      toast.success('Tamanho deletado com sucesso!');
    } catch (error) {
      toast.error(
        'Tenha certeza que removeu todos os produtos usando o tamanhos primeiro.',
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={'destructive'}
            disabled={loading}
            size={'icon'}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nome do tamanho"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do produto</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Descrição para o produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};