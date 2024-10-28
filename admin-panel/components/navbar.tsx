'use client';

import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import { ModeToggle } from './theme-toggle';
import { useTheme } from 'next-themes';

interface Store {
  stores: any;
}

const NavbarClient: React.FC<Store> = ({ stores }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="border-b flex h-16 items-center justify-between px-4">
      {/* Botão do menu que só aparece em telas pequenas */}
      <button
        className="lg:hidden border border-gray-800 px-3 py-1 mr-6 rounded hover:opacity-60 transition duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-icons">Menu</span>
      </button>

      <StoreSwitcher items={stores} />

      <MainNav className="hidden lg:flex flex-1 ml-4" />

      {/* Painel lateral */}
      <div
        className={`fixed inset-0 z-30 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800 bg-opacity-75'}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 h-full w-64 p-4 shadow-lg transition-transform transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <button className="text-right mb-4" onClick={() => setIsOpen(false)}>
            <span className="material-icons">Fechar</span>
          </button>
          <MainNav className="flex flex-col space-y-3" />
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default NavbarClient;
