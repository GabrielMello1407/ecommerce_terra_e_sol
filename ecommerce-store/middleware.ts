import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/minha-conta(.*)',
  '/carrinho(.*)',
]);
const isPublicRoute = createRouteMatcher(['/login(.*)', '/register(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);

  // Verifique se a rota é protegida e se o parâmetro `paymentStatus` está ausente
  if (
    isProtectedRoute(req) &&
    !isPublicRoute(req) &&
    !url.searchParams.has('paymentStatus')
  ) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
