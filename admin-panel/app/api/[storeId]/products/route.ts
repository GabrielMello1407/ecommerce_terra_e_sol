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

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      descriptionId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Não autorizado', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Nome é obrigatório', { status: 400 });
    }
    if (!price) {
      return new NextResponse('Preço é obrigatório', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('Id da categoria é obrigatório', { status: 400 });
    }
    if (!colorId) {
      return new NextResponse('Id da cor é obrigatório', { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse('Id do tamanho é obrigatório', { status: 400 });
    }
    if (!descriptionId) {
      return new NextResponse('Id da descrição é obrigatório', { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse('Imagem é obrigatório', { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        descriptionId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const descriptionId = searchParams.get('descriptionId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Id da loja é obrigatório', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        descriptionId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        description: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
