// sobre.js

import Image from 'next/image';

const About = () => {
  return (
    <div className="bg-white py-10 px-6 lg:px-32">
      <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">
        Sobre nós
      </h1>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="w-full lg:w-1/3 flex justify-center">
          <Image
            src="/mara.png"
            alt="Foto de fundadora"
            width={300}
            height={400}
            className="rounded"
          />
        </div>

        <div className="w-full lg:w-2/3 text-green-900">
          <div className="mb-4">
            <h2 className="font-semibold">Quem somos?</h2>
            <p>
              A Terra & Sol Confecções é uma empresa especializada na produção
              de uniformes personalizados e padronizados, atendendo as
              necessidades de empresas de diversos setores e marcas de todos os
              tamanhos.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold">Como surgiu nosso negócio?</h2>
            <p>
              Fundada em 1993, a Terra & Sol Confecções nasceu do desejo de
              criar uniformes que fossem mais do que simples peças de
              vestuário...
            </p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold">
              Por que escolhemos este tipo de produto?
            </h2>
            <p>
              Optamos por trabalhar com uniformes porque acreditamos no poder de
              um vestuário bem projetado para reforçar a identidade de uma
              marca.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold">
              Há quanto tempo vendemos este tipo de produto?
            </h2>
            <p>Estamos no mercado há mais de três décadas, desde 1993...</p>
          </div>

          <div>
            <h2 className="font-semibold">
              Quem faz parte do time por trás da nossa marca?
            </h2>
            <p>
              Nosso time é composto por profissionais dedicados e experientes...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
