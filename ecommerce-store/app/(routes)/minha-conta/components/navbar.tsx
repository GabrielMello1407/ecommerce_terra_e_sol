'use client';

import { useState } from 'react';
import NavbarMenu from './navbar-menu';
import SectionContent from './section-content';

const NavbarAccount: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('Minha Conta');

  return (
    <div className="flex mt-5 mb-5">
      <NavbarMenu
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 bg-[#41A156] bg-opacity-40 p-6 rounded-lg">
        <SectionContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default NavbarAccount;
