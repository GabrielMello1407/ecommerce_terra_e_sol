import { cn } from '@/lib/utils';
import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function MainNav({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();

  const routes = [
    { href: `/`, label: 'Ínicio', active: pathname === `/` },
    { href: `/produtos`, label: 'Produtos', active: pathname === `/produtos` },
    {
      href: `/orcamentos`,
      label: 'Monte seu Modelo',
      active: pathname === `/orcamentos`,
    },
    {
      href: `/sobre`,
      label: 'Sobre',
      active: pathname === `/sobre`,
    },
    {
      href: `/contato`,
      label: 'Contato',
      active: pathname === `/contato`,
    },
  ];

  return (
    <nav
      className={cn(
        'flex flex-col lg:flex-row lg:justify-center items-center lg:space-x-12 space-y-4 lg:space-y-0 mb-2',
        className,
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium relative transition-colors',
            route.active
              ? 'text-[#025213] font-bold'
              : 'text-[#14812C] hover:text-[#025213]',
          )}
          style={{ textDecoration: 'none' }}
        >
          {route.label}
          <span
            className="absolute left-1/2 bottom-0 h-[2px] bg-[#025213] transition-all duration-300 ease-in-out transform -translate-x-1/2 origin-center"
            style={{
              width: route.active ? '100%' : '0',
            }}
          />
        </Link>
      ))}
      {isSignedIn && (
        <button
          className="text-sm font-medium relative transition-color text-[#025213] font-bold text-[#14812C] hover:text-#025213"
          onClick={() => signOut({ redirectUrl: '/' })}
        >
          Sair
        </button>
      )}
    </nav>
  );
}
