import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ModalProvider from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

const font = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Terra e Sol',
  description: 'Fazemos a sua moda!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR} signInUrl="/login" signUpUrl="/cadastro">
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
