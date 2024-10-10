'use client';
import { cn } from '@/lib/utlis';
import { Category } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MainNavProps {
  data: Category[];
}
const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/categorias/${route.id}`,
    label: route.name,
    active: pathname === `/categorias/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:black',
            route.active ? 'text-black' : 'text-neutral-500',
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
