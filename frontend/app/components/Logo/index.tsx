import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  imagePath: string;
}

const Logo: React.FC<LogoProps> = ({ imagePath }) => {
  return (
    <Link href="/">
      <Image src={imagePath} alt="Logo" width={100} height={100} />
    </Link>
  );
};

export default Logo;
