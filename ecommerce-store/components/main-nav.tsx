import { cn } from '@/lib/utlis';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function MainNav({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    { href: `/`, label: 'Ínicio', active: pathname === `/` },
    { href: `/produtos`, label: 'Produtos', active: pathname === `/produtos` },
    {
      href: `/orcamentos`,
      label: 'Orçamentos',
      active: pathname === `/orcamentos`,
    },
    {
      href: `/sobre`,
      label: 'Sobre',
      active: pathname === `/${params.storeId}/sobre`,
    },
    {
      href: `/contato`,
      label: 'Contato',
      active: pathname === `/${params.storeId}/contato`,
    },
  ];

  return (
    <nav
      className={cn(
        'flex flex-col lg:flex-row lg:justify-center items-center lg:space-x-12 space-y-4 lg:space-y-0',
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
    </nav>
  );
}
