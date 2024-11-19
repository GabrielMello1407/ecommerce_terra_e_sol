/* eslint-disable @next/next/no-img-element */
import { Billboard as BillboardType } from '@/types';
import Link from 'next/link';

interface BillboardProps {
  data: BillboardType;
  title: string;
  link: string;
}

const Billboard: React.FC<BillboardProps> = ({ data, title, link }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative overflow-hidden"
        style={{ height: '400px' }}
      >
        <img
          src={data?.imageUrl || '/path/to/default.jpg'}
          alt={data?.label || 'Título padrão'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white">
            {data?.label || 'Título padrão'}
          </div>
          <h3 className="font-bold text-xl sm:text-4xl lg:text-4xl sm:max-w-xl max-w-xs line-through text-white">
            <Link
              href={link}
              className="hover:text-gray-200 transition-colors duration-300"
            >
              {title}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
