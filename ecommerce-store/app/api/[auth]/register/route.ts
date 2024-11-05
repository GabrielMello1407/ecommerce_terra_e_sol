import prismadb from '@/lib/prismadb';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const userSchema = z.object({
  fullName: z.string().min(1, { message: 'Nome completo é obrigatório' }),
  cpf: z
    .string()
    .refine((cpf) => cpfValidator.isValid(cpf), { message: 'CPF inválido' }),
  email: z.string().email({ message: 'Formato de e-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha precisa ter pelo menos 6 caracteres' }),
  address: z.string().min(1, { message: 'Endereço é obrigatório' }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validação dos dados usando Zod
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      const errorMessages = validation.error.errors.map((err) => err.message);
      return new NextResponse(JSON.stringify({ errors: errorMessages }), {
        status: 400,
      });
    }

    const { fullName, cpf, email, password, address } = validation.data;

    // Verifica se o email já está em uso no banco de usuários
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new NextResponse('Email já está em uso', { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário no banco de dados de usuários
    const newUser = await prismadb.user.create({
      data: {
        fullName,
        cpf,
        email,
        password: hashedPassword,
        address,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log('[REGISTER_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
