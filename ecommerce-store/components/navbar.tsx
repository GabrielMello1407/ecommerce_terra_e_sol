'use client';
import React, { useState } from 'react';
import Container from './ui/container';
import Link from 'next/link';
import MainNav from './main-nav';
import NavbarActions from './navbar-actions';
import Image from 'next/image';
import { MenuIcon } from 'lucide-react';

export const revalidate = 0;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between relative">
          <Link href={'/'} className="flex gap-x-2">
            <Image alt="Logo" src={'/logo.svg'} height={40} width={40} />
          </Link>

          <button
            className="lg:hidden absolute left-1/2 transform -translate-x-1/2 flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon color="#025213" />
          </button>

          <div className="hidden lg:flex flex-1 justify-center">
            <MainNav />
          </div>

          <div className="ml-auto">
            <NavbarActions />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden flex flex-col mt-2">
            <MainNav />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
