import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Nome é obrigatório', { status: 400 });
    }
    if (!value) {
      return new NextResponse('Valor é obrigatório', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Id da loja é obrigatório', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse('Não autorizado!', { status: 403 });
    }

    const details = await prismadb.details.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Id da loja é obrigatório', { status: 400 });
    }

    const details = await prismadb.details.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
