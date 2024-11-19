## E-commerce em Next.js
Este é um projeto avançado de E-commerce, que está dividido em dois aplicativos distintos:

# Painel Administrativo: 
Onde o administrador da loja pode gerenciar produtos, categorias, pedidos, etc.
# Loja do Cliente: 
Interface onde os clientes podem visualizar os produtos e realizar compras.
O projeto está em desenvolvimento avançado e utiliza tecnologias modernas para oferecer uma experiência robusta e performática.

# Tecnologias Utilizadas
Frontend
Next.js: Framework React para renderização híbrida (SSR/SSG).
ShadCN UI: Biblioteca de componentes estilizados com base no Radix UI.
Tailwind CSS: Framework para estilização.
Radix UI: Acessibilidade e pop-ups.
Zod: Validação de dados e formulários.
React Hook Form: Gerenciamento de formulários.
react-hot-toast: Mensagens e notificações personalizadas.
zustand: Gerenciamento de estado.
recharts: Gráficos interativos para painéis administrativos.
query-string: Manipulação de parâmetros de consulta.
headlessui: Componentes acessíveis.
Backend
Prisma: ORM para o banco de dados.
PostgreSQL: Banco de dados relacional.
Supabase: Backend como serviço para banco de dados e autenticação.
Axios: Para realizar requisições HTTP.
Cloudinary: Armazenamento e manipulação de imagens.
EmailJS: Serviço para envio de emails.
Stripe: Processamento de pagamentos.

# Estrutura do Banco de Dados
![image](https://github.com/user-attachments/assets/1d577331-5f20-46d9-8ec9-972f5b5140a6)

O modelo de banco de dados foi definido com Prisma ORM. Abaixo está o esquema principal:
Store: Loja com informações e relações (categorias, produtos, banners, etc.).
Billboard: Banners publicitários.
Category: Categorias de produtos.
Product: Produtos com informações detalhadas, tamanhos, cores, preços e imagens.
Order: Pedidos feitos pelos clientes.
OrderItem: Itens individuais de um pedido.
Size e Color: Detalhes adicionais para os produtos.
Description e Details: Informações extras sobre os produtos.
Image: Imagens associadas aos produtos.
Veja o modelo completo no arquivo prisma/schema.prisma.

# Como Rodar o Projeto
Pré-requisitos
Node.js (versão 18 ou superior)
PostgreSQL configurado
Variáveis de ambiente (.env)
Configuração
1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
2. Instalar as dependências
npm install
3. Configurar o banco de dados
Execute as migrações do Prisma:
npx prisma generate
npx prisma dbpush
5. Configurar as variáveis de ambiente
Crie um arquivo .env na raiz do projeto para cada aplicação (Painel Administrativo e Loja). Insira os valores das variáveis de ambiente mencionados no final deste README.
6. Rodar o servidor
# Para o Painel Administrativo:
npm run dev
# Para a Loja do Cliente:
npm run dev 
O painel administrativo estará acessível em: http://localhost:3000
A loja estará acessível em: http://localhost:3001
