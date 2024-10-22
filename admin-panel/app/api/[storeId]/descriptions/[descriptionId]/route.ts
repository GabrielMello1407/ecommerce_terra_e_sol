import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { descriptionId: string } },
) {
  try {
    if (!params.descriptionId) {
      return new NextResponse(
        'Id do painel de controle da loja é obrigatório',
        { status: 400 },
      );
    }

    const description = await prismadb.description.findUnique({
      where: {
        id: params.descriptionId,
      },
    });

    return NextResponse.json(description);
  } catch (error) {
    console.log('[DESCRIPTION_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; descriptionId: string } },
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

    if (!params.descriptionId) {
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

    const description = await prismadb.description.updateMany({
      where: {
        id: params.descriptionId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(description);
  } catch (error) {
    console.log('[DESCRIPTION_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; descriptionId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.descriptionId) {
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

    const description = await prismadb.description.deleteMany({
      where: {
        id: params.descriptionId,
      },
    });

    return NextResponse.json(description);
  } catch (error) {
    console.log('[DESCRIPTION_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
