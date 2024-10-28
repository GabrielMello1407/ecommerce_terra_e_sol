import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId) {
      return new NextResponse('Id do produto é obrigatório', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        details: true,
        sizes: true,
        color: true,
        description: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      descriptionId,
      detailsId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
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
    if (!colorId || !colorId.length) {
      return new NextResponse('Cor é obrigatório', { status: 400 });
    }
    if (!sizeId || !sizeId.length) {
      return new NextResponse('Tamanho é obrigatório', { status: 400 });
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

    if (!params.productId) {
      return new NextResponse('Id do produto é obrigatório', {
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        descriptionId,
        detailsId,
        storeId: params.storeId,
        sizes: {
          set: [],
          connect: sizeId.map((sizeId: string) => ({ id: sizeId })),
        },
        color: {
          set: [],
          connect: colorId.map((colorId: string) => ({ id: colorId })),
        },
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse(
        'Id do painel de controle da loja é obrigatório',
        { status: 400 },
      );
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
