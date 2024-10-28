import NavbarServer from '@/components/navbar-server';
import prismadb from '@/lib/prismadb';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();
  console.log('User ID:', userId);
  if (!userId) {
    redirect('/sign-in');
  }
  console.log('User ID:', userId);

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
    <>
      <NavbarServer />
      {children}
    </>
  );
}
