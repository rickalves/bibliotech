
---

# Bibliotech - Sistema de Empréstimo de Livros 📖🏫🔖

O Bibliotech é um sistema de gerenciamento de empréstimo de livros para bibliotecas, desenvolvido para atender instituições de ensino por meio de uma API robusta e segura. Este projeto é inteiramente focado no back-end, utilizando Node.js, Express e TypeScript. 🔄🛠️💡

## Funcionalidades ✅📘🔍

- **Autenticação e Autorização:**
  - Registro e login de usuários utilizando JSON Web Tokens (JWT).
  - Gerenciamento de blacklist de tokens para logout seguro.
- **CRUD de Livros:**
  - Criação, listagem, atualização e exclusão de livros.
- **Gerenciamento de Usuários:**
  - Cadastro e atualização de perfis.
- **Reservas e Empréstimos:**
  - Sistema para reservas e controle de empréstimos de livros.
- **Dashboards Administrativos:**
  - Monitoramento e estatísticas dos empréstimos e reservas (em desenvolvimento).📊📈📑

## Tecnologias Utilizadas 🖥️🛠️🔧

- **Backend:** Node.js, Express e TypeScript
- **Bancos de Dados:**
  - PostgreSQL para armazenamento dos dados principais.
  - MongoDB para gerenciamento da blacklist de tokens.
- **Autenticação:** JWT e Bcrypt para criptografia de senhas.
- **Arquitetura:** MVC (Model-View-Controller)
- **Gerenciamento de Dependências:** npm 📦📂💾

## Estrutura do Projeto 📂🗂️🔍

A estrutura de pastas segue uma organização modular e escalável:

```
bibliotech/
├── src/
│   ├── config/       # Configurações gerais (banco de dados, variáveis de ambiente, etc.)
│   ├── controllers/  # Lógica dos endpoints da API
│   ├── middlewares/  # Funções de middleware (autenticação, validações, etc.)
│   ├── models/       # Modelos e esquemas dos dados
│   ├── routes/       # Definição das rotas da API
│   ├── services/     # Regras de negócio e integrações com os modelos
│   └── utils/        # Funções utilitárias
├── server.ts         # Ponto de entrada da aplicação
├── package.json      # Dependências e scripts do projeto
├── tsconfig.json     # Configurações do TypeScript
├── nodemon.json      # Configurações do Nodemon para desenvolvimento
└── .gitignore        # Arquivos e pastas ignorados pelo Git
```

## Instalação e Execução 🚀🛠️⚙️

### Pré-requisitos 📝✅📌

- **Node.js:** Versão 18 ou superior.
- **Bancos de Dados:** PostgreSQL e MongoDB instalados e em execução.

### Configuração do Ambiente ⚡🔧🔍

1. **Clonar o Repositório:**

   ```bash
   git clone https://github.com/rickalves/bibliotech.git
   cd bibliotech
   ```

2. **Configurar Variáveis de Ambiente:**

   Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

   ```dotenv
   POSTGRES_URI=postgres://seu_usuario:senha@localhost:5432/bibliotech_db
   MONGO_URI=mongodb://localhost:27017/bibliotech_blacklist
   JWT_SECRET=sua_chave_secreta
   ```

3. **Instalar Dependências:**

   ```bash
   npm install
   ```

4. **Executar o Projeto:**

   - Para desenvolvimento (com monitoramento de alterações via Nodemon):

     ```bash
     npm run dev
     ```

   - Para produção:

     ```bash
     npm start
     ```

   O servidor iniciará e ficará disponível em [http://localhost:5000](http://localhost:5000) (ou conforme configuração definida). 🌐🚀🔗

## Rotas da API 🔀📡💻

### Autenticação 🔑🛡️🔄

- `POST /api/auth/register` — Registrar novo usuário
- `POST /api/auth/login` — Autenticar usuário
- `POST /api/auth/logout` — Logout e invalidação do token
- `POST /api/auth/password-recovery` — Solicitar recuperação de senha
- `POST /api/auth/verify-code` — Verificar código
- `POST /api/auth/reset-password` — Resetar senha

### Usuários 👤📂🔄

- `GET /api/user/me` — Recuperar perfil do usuário
- `PUT /api/user/update` — Atualizar informações do usuário

### Livros 📚📖📦

- `GET /api/books` — Listar todos os livros
- `POST /api/books` — Adicionar novo livro *(restrito a administradores)*
- `PUT /api/books/:id` — Atualizar informações de um livro *(restrito a administradores)*
- `DELETE /api/books/:id` — Remover um livro *(restrito a administradores)*

## Roadmap 🛣️📍📌

- Implementação de notificações para devolução de livros.
- Desenvolvimento de dashboards com estatísticas e relatórios.
- Aperfeiçoamentos na segurança e performance da API. 📊⚡🔍

## Contribuição 🤝🚀🌎

Contribuições são sempre bem-vindas! Para colaborar:

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Realize as modificações necessárias e faça os commits.
4. Envie um Pull Request descrevendo suas alterações. ✅📩🔧

## Licença 📜⚖️🔓

Este projeto está licenciado sob a [Licença MIT](LICENSE).

