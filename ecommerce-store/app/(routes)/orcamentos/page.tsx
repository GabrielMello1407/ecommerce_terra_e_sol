'use client';
import Button from '@/components/ui/button';
import Link from 'next/link';

export default function MonteSeuModelo() {
  return (
    <div className="p-6 bg-gray-100 text-gray-800">
      <div className="text-center py-6 bg-white border-b border-green-600">
        <h1 className="text-3xl font-bold text-[#025213] font-kadwa underline">
          Monte Seu Modelo
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Siga os passos para personalizar seu modelo e solicitar um orçamento.
        </p>
      </div>

      <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-[#025213] mb-4">
          Passo a Passo
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <strong>Crie sua Conta:</strong> Acesse o menu e clique em
            &quot;Entrar&quot; para criar uma conta
          </li>
          <li>
            <strong>Procure seu modelo desejado:</strong>Selecione o modelo que
            você deseja montar
          </li>
          <li>
            <strong>Personalize seu Modelo:</strong> Escolha as cores, tamanhos
            e outras especificações no simulador abaixo.
          </li>
          <li>
            <strong>Envie o Modelo para Cotação:</strong> Após finalizar, clique
            em &quot;Solicitar Orçamento&quot; para falar conosco pelo WhatsApp.
          </li>
        </ol>
      </div>

      <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Simulador de Modelos
        </h2>
        <p className="text-gray-700">
          Use o simulador abaixo para personalizar seu modelo.
        </p>
        <div className="mt-4 aspect-w-16 aspect-h-9">
          <Link
            href="https://www.jumptec.com.br/simulador/"
            className="w-full h-full border-none"
            target="_blank"
          >
            <Button className="bg-[#025213] hover:bg-green-700 text-white text-lg py-3 px-6 rounded-md shadow-md">
              Monte o seu modelo!
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-[#025213] hover:bg-green-700 text-white text-lg py-3 px-6 rounded-md shadow-md">
          <Link
            href="https://api.whatsapp.com/send?phone=+5543991277048&text=Olá! Gostaria de solicitar um orçamento para meu modelo personalizado."
            target="_blank"
          >
            Solicitar Orçamento via WhatsApp
          </Link>
        </Button>
      </div>
    </div>
  );
}
