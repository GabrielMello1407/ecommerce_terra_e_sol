import { User, Package, Heart, MapPin, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const routes = [
  { label: 'Minha Conta', icon: <User /> },
  { label: 'Meus Pedidos', icon: <Package /> },
  { label: 'Meus Favoritos', icon: <Heart /> },
  { label: 'Endereços', icon: <MapPin /> },
  { label: 'Meus dados', icon: <Settings /> },
];
interface NavBarMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}
const NavbarMenu: React.FC<NavBarMenuProps> = ({
  activeSection,
  setActiveSection,
}) => {
  return (
    <div className="border-r-2 p-4  mr-8">
      <nav>
        {routes.map((route) => (
          <button
            key={route.label}
            onClick={() => setActiveSection(route.label)}
            className={cn(
              'flex items-center p-2 rounded-md transition-colors w-full text-left',
              activeSection === route.label
                ? 'bg-gray-100 text-gray-400'
                : 'text-gray-400 hover:bg-gray-200 hover:text-gray-400',
            )}
          >
            <span className="text-[#025213] mr-3">{route.icon}</span>
            <span className="text-sm font-medium">{route.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavbarMenu;
