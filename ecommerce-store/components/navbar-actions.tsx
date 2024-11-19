'use client';

import { CircleUserIcon, ShoppingBag } from 'lucide-react';
import Button from './ui/button';
import { useEffect, useState } from 'react';
import useCart from '@/hooks/use-cart';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserButton, useUser } from '@clerk/nextjs';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  const { isSignedIn } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) {
    return null;
  }
  const routes = isSignedIn
    ? []
    : [
        {
          href: `/login`,
          label: 'Login',
          active: pathname === `/login`,
        },
        {
          href: `/cadastro`,
          label: 'Cadastrar',
          active: pathname === `/cadastro`,
        },
      ];

  return (
    <div className="ml-auto flex items-center gap-x-4">
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
        <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Minha conta"
                labelIcon={<CircleUserIcon className="h-4 w-4" />}
                href="/minha-conta"
              />
              <UserButton.Action label="manageAccount" />
              <UserButton.Action label="signOut" />
            </UserButton.MenuItems>
          </UserButton>

          <Link href="/carrinho">
            <Button className="flex items-center rounded-full bg-[#025213] px-4 py-2">
              <ShoppingBag size={20} color="white" />
              <span className="ml-2 text-sm font-medium text-white">
                {cart.items.length}
              </span>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarActions;
