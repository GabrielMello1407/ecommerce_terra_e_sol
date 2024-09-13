import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/painel-de-controle/(.*)', // Mantém o painel de controle
    '/dashboard/:storeId/(.*)', // Rota específica da storeId
    '/dashboard/(.*)', // Rotas do dashboard de forma geral
    '/app/:path*', // Outras rotas da aplicação que precisam de autenticação
  ],
};
