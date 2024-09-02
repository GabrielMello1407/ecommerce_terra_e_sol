import Link from 'next/link';
import Logo from '../Logo';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full py-4 pb-6 px-8  z-50 bg-white border-b-2 border-current-[#F2F2F2]">
      <ul className=" flex items-center justify-between px ">
        <li>
          <Link href="/" className="">
            <Logo imagePath="/terra_e_sol_logo.png" />
          </Link>
        </li>

        <li>
          <Link href="" className="nav">
            Início
          </Link>
        </li>
        <li>
          <Link href="" className="nav">
            Produtos
          </Link>
        </li>
        <li>
          <Link href="" className="nav">
            Orçamentos
          </Link>
        </li>
        <li>
          <Link href="" className="nav">
            Sobre
          </Link>
        </li>
        <li>
          <Link href="" className="nav">
            Contato
          </Link>
        </li>

        <div className="flex space-x-4">
          <Link
            href={''}
            className=" p-2 rounded-md hover:bg-[#f2f2f2] transition duration-500 "
          >
            <Image
              width={30}
              height={30}
              alt="Search icon"
              src={'/search_icon.svg'}
            />
          </Link>
          <Link
            href={''}
            className=" p-2 rounded-md hover:bg-[#f2f2f2] transition duration-300 "
          >
            <Image
              width={25}
              height={25}
              alt="Account icon"
              src={'/account_icon.svg'}
            />
          </Link>

          <Link
            href={''}
            className=" p-2 rounded-md hover:bg-[#f2f2f2] transition duration-300 "
          >
            <Image
              width={30}
              height={30}
              alt="Cart Icon"
              src={'/cart_icon.svg'}
            />
          </Link>
        </div>

        <div className="-mr-2 flex md:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#f2f2f2]  focus:outline-none focus:bg-[#f2f2f2] focus:text-[#026116] transition duration-300 ease-in-out"
            aria-label="Menu"
            aria-expanded="false"
          >
            <Image width={30} height={30} alt="menu" src={'/menu.svg'} />
          </button>
        </div>
      </ul>
    </nav>
  );
}
