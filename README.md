User Manager Frontend
Este é um projeto frontend desenvolvido com React, TypeScript, Vite e Tailwind CSS. Ele serve como uma interface para gerenciamento de usuários.

Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

Node.js (versão 18 ou superior)

pnpm (gerenciador de pacotes)

Nota: Este projeto utiliza o pnpm como gerenciador de pacotes. Se você ainda não o possui, instale-o globalmente com o comando:

bash
Copiar
Editar
npm install -g pnpm
Instalação
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/ecassano/user-manager-frontend.git
cd user-manager-frontend
Instale as dependências:

bash
Copiar
Editar
pnpm install
Executando o Projeto
Inicie o servidor de desenvolvimento:

bash
Copiar
Editar
pnpm dev
O aplicativo estará disponível em http://localhost:5173 (ou na porta especificada pelo Vite).

Scripts Disponíveis
pnpm dev — Inicia o servidor de desenvolvimento com Vite.

pnpm build — Gera a versão de produção na pasta dist/.

pnpm preview — Serve a build de produção localmente para testes.

Tecnologias Utilizadas
React

TypeScript

Vite

Tailwind CSS

pnpm

Estrutura do Projeto
A estrutura principal do projeto é a seguinte:

pgsql
Copiar
Editar
user-manager-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
└── vite.config.ts
Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

Licença
Este projeto está licenciado sob a MIT License.

Este README fornece instruções claras para que qualquer pessoa possa rodar o projeto localmente. Certifique-se de substituir [LICENSE] pelo link correto para o arquivo de licença, caso exista.

Se precisar de mais alguma coisa ou ajustes adicionais, estou à disposição para ajudar!
