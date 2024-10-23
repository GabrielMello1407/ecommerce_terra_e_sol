import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { detailsId: string } },
) {
  try {
    if (!params.detailsId) {
      return new NextResponse(
        'Id do painel de controle da loja é obrigatório',
        { status: 400 },
      );
    }

    const details = await prismadb.details.findUnique({
      where: {
        id: params.detailsId,
      },
    });

    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; detailsId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Nome é obrigatório', { status: 400 });
    }
    if (!value) {
      return new NextResponse('Valor é obrigatório', { status: 400 });
    }

    if (!params.detailsId) {
      return new NextResponse('Id do painel da loja é obrigatório', {
        status: 400,
      });
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

    const details = await prismadb.details.updateMany({
      where: {
        id: params.detailsId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; detailsId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.detailsId) {
      return new NextResponse('Id do tamanho é obrigatório', { status: 400 });
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

    const details = await prismadb.details.deleteMany({
      where: {
        id: params.detailsId,
      },
    });

    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
