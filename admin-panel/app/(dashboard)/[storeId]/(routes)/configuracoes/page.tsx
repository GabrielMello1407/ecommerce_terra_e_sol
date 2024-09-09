import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ConfigForm } from './components/config-form';

interface ConfigPageProps {
  params: {
    storeId: string;
  };
}

const ConfigPage: React.FC<ConfigPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ConfigForm initialData={store} />
      </div>
    </div>
  );
};

export default ConfigPage;
