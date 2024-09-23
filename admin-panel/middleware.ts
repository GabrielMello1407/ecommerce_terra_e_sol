import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicApiRoute = createRouteMatcher(['/api/:path*']);

export default clerkMiddleware((auth, req) => {});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
