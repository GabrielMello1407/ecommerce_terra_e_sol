import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse('Email e senha são obrigatórios', {
        status: 400,
      });
    }

    const user = await prismadb.user.findUnique({
      where: { email },
    });
    if (!user) {
      return new NextResponse('Email ou senha inválidos', { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse('Email ou senha inválidos', { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return new NextResponse('Erro de configuração do servidor', {
        status: 500,
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.log('[LOGIN_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
