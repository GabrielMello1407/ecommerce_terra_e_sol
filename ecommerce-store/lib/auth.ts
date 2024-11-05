import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new NextResponse('Token não fornecido', { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // Retorna o payload decodificado se o token for válido
  } catch (error) {
    console.error('Token inválido', error);
    return null;
  }
}
