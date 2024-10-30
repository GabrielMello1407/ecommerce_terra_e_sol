// contato.js

import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <div className="bg-white py-10 px-6 lg:px-32 flex flex-col lg:flex-row gap-8">
      {/* Seção de Localização e Informações de Contato */}
      <div className="w-full lg:w-1/3 bg-green-100 p-6 rounded">
        <h2 className="text-xl font-bold text-green-900 mb-4">Localização</h2>
        <p>Rua Paraná, 454 - Centro, Jacarezinho - PR</p>

        <h2 className="text-xl font-bold text-green-900 mt-6 mb-4">
          Ligue para nós
        </h2>
        <p>+55 (43) 99127-7048</p>
        <p>+55 (43) 3527-1249</p>

        <h2 className="text-xl font-bold text-green-900 mt-6 mb-4">
          Horário Comercial
        </h2>
        <p>Seg - Sex: 9h - 11:30, 13:00 - 18:00</p>
        <p>Sáb, Dom: Fechado</p>
      </div>

      {/* Formulário de Contato */}
      <div className="w-full lg:w-2/3 p-6">
        <h2 className="text-xl font-bold text-green-900 mb-6">
          Entre em Contato
        </h2>

        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Digite seu nome"
            className="border border-gray-300 rounded p-2"
          />
          <Input
            type="email"
            placeholder="Digite seu email"
            className="border border-gray-300 rounded p-2"
          />
          <Textarea
            placeholder="Como podemos ajudar?"
            className="border border-gray-300 rounded p-2 h-32"
          />

          <Button
            type="submit"
            className="bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </Button>
        </form>

        {/* Newsletter */}
        <h2 className="text-xl font-bold text-green-900 mt-8">
          Assine nosso newsletter
        </h2>

        <form className="flex mt-2">
          <Input
            type="email"
            placeholder="Digite seu email"
            className="border border-gray-300 rounded-none rounded-l p-6 w-full"
          />
          <Button
            type="submit"
            className="bg-green-900 text-white font-bold px-4 rounded-l"
          >
            Inscrever
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
