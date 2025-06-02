# User Manager Frontend

Este é um projeto frontend desenvolvido com React, TypeScript, Vite e Tailwind CSS.  
Ele serve como uma interface para gerenciamento de usuários.

---

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)  
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

> **Nota:** Este projeto utiliza o `pnpm` como gerenciador de pacotes.  
> Se você ainda não o possui, instale-o globalmente com o comando:

```bash
npm install -g pnpm
```

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ecassano/user-manager-frontend.git
cd user-manager-frontend
```

2. Instale as dependências:

```bash
pnpm install
```

3. Crie o arquivo `.env` na raiz do projeto com a seguinte variável de ambiente:

```env
VITE_API_URL=http://localhost:3333
```

---

## Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou na porta especificada pelo Vite).

---

## Scripts Disponíveis

- `pnpm dev` — Inicia o servidor de desenvolvimento com Vite.  
- `pnpm build` — Gera a versão de produção na pasta `dist/`.  
- `pnpm preview` — Serve a build de produção localmente para testes.

---

## Tecnologias Utilizadas

- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Vite](https://vitejs.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [pnpm](https://pnpm.io/)

---

## Estrutura do Projeto

```plaintext
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
```

---

## Contribuindo

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir issues ou pull requests.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Se precisar de ajuda ou quiser fazer melhorias, é só abrir uma issue ou me chamar!
EADME.md…]()

- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

> **Nota:** Este projeto utiliza o `pnpm` como gerenciador de pacotes.  
> Se você ainda não o possui, instale-o globalmente com o comando:

```bash
npm install -g pnpm
