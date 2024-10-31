import Image from 'next/image';

interface DecoratorProps {
  width: number;
  height: number;
}

const Decorator: React.FC<DecoratorProps> = ({ width, height }) => {
  return (
    <div>
      <Image
        alt="Decorator"
        src="/decorator.svg"
        width={width}
        height={height}
      />
    </div>
  );
};

export default Decorator;
