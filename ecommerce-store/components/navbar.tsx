import React from 'react';
import Container from './ui/container';
import Link from 'next/link';
import MainNav from './main-nav';
import NavbarActions from './navbar-actions';
import Image from 'next/image';

export const revalidate = 0;

const Navbar = async () => {
  return (
    <div className="border-b">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo alinhada à esquerda */}
          <Link href={'/'} className="flex gap-x-2">
            <Image alt="Logo" src={'/logo.svg'} height={60} width={60} />
          </Link>

          {/* Menu de navegação centralizado */}
          <div className="flex-1 flex justify-center">
            <MainNav />
          </div>

          {/* Ícone de ações alinhado à direita */}
          <div className="ml-auto">
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
