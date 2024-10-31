'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-10 flex flex-col lg:flex-row justify-between text-green-900 px-4 lg:px-8">
        <div className="mb-8 lg:mb-0">
          <h2 className="text-lg font-bold mb-4">Empresa</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade">
                Política de privacidade
              </Link>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4 text-green-900">
            <Link
              href={'https://www.instagram.com/terraesolconfeccoes/'}
              target="_blank"
            >
              <Image
                alt="Instagram"
                src={'/instagram.svg'}
                height={30}
                width={30}
              />
            </Link>
            <Link
              href={'https://www.facebook.com/terra.sol.906'}
              target="_blank"
            >
              <Image
                alt="Facebook"
                src={'/facebook.svg'}
                height={30}
                width={30}
              />
            </Link>
            <Link
              href={'https://www.tiktok.com/@terra_e_sol_confeccoes'}
              target="_blank"
            >
              <Image alt="TikTok" src={'/tiktok.svg'} height={30} width={30} />
            </Link>
            <Link
              href={
                'https://api.whatsapp.com/send/?phone=%2B554391277048&text&type=phone_number&app_absent=0'
              }
              target="_blank"
            >
              <Image
                alt="Whatsapp"
                src={'/whatsapp.svg'}
                height={30}
                width={30}
              />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Contato</h2>
          <p>terraesolmoda@yahoo.com.br</p>
          <p>+55 (43) 99679-8007</p>
          <p>+55 (43) 3527-1249</p>
          <p>Rua Paraná - 454, Centro, Jacarezinho - PR</p>
          <p>CNPJ: 72.217.573-0001-82</p>

          {/* Formulário de Newsletter */}
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Assine nosso newsletter"
              className="p-2 border border-gray-300 rounded-l-md text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-900 text-white font-semibold rounded-r-md text-sm"
            >
              INSCREVER
            </button>
          </form>
        </div>
      </div>

      <div className="bg-green-50 py-4">
        <p className="text-center text-xs text-green-900">
          2024 Todos direitos reservados ©. Desenvolvido por{' '}
          <Link
            href="https://github.com/GabrielMello1407"
            className="underline"
          >
            Gabriel Mello
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
