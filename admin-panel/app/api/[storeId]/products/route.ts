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
      detailsId,
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
    if (!colorId || !Array.isArray(colorId) || !colorId.length) {
      return new NextResponse('Id da cor é obrigatório', { status: 400 });
    }
    if (!sizeId || !Array.isArray(sizeId) || !sizeId.length) {
      return new NextResponse('Id do tamanho é obrigatório', { status: 400 });
    }
    if (!descriptionId) {
      return new NextResponse('Id da descrição é obrigatório', { status: 400 });
    }
    if (!detailsId) {
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
        detailsId,

        storeId: params.storeId,
        sizes: {
          connect: sizeId.map((id) => ({ id })),
        },
        color: {
          connect: colorId.map((id) => ({ id })),
        },
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
    const detailsId = searchParams.get('detailsId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Id da loja é obrigatório', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        color: colorId ? { some: { id: colorId } } : undefined,
        sizes: sizeId ? { some: { id: sizeId } } : undefined,
        descriptionId,
        detailsId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        description: true,
        details: true,
        sizes: true,
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
