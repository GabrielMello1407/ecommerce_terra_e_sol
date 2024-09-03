import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {
  ClerkProvider,
  SignedOut,
  SignInButton,
  UserButton,
  SignedIn,
  SignOutButton,
} from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Painel Administrador',
  description: 'Painel Administrador',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
