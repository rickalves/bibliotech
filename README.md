# 📚 Bibliotech - Sistema de Empréstimo de Livros

O **Bibliotech** é um sistema de gerenciamento de empréstimos de livros para escolas, permitindo que alunos e professores realizem empréstimos, reservas e interação com a biblioteca digitalmente.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: React Native (Aplicativo Mobile)
- **Banco de Dados**: PostgreSQL + Sequelize (dados principais) & MongoDB + Mongoose (blacklist de JWTs)
- **Autenticação**: JSON Web Token (JWT) + Bcrypt
- **Arquitetura**: MVC (Model-View-Controller)
- **Gerenciamento de Versão**: Git & GitHub

---

## 📂 Estrutura do Projeto

### 📦 Backend (Node.js + Express)
```
📦 bibliotech-backend
 ┣ 📂 src
 ┃ ┣ 📂 config
 ┃ ┣ 📂 models
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 services
 ┃ ┣ 📂 middlewares
 ┃ ┣ 📂 utils
 ┃ ┣ 📂 database
 ┃ ┣ 📜 app.js
 ┃ ┣ 📜 server.js
 ┣ 📂 tests
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 🎯 Funcionalidades Principais

✅ **Autenticação JWT** com blacklist (MongoDB)  
✅ **CRUD de Livros** (Adicionar, Editar, Excluir, Listar)  
✅ **Gerenciamento de Usuários** (Cadastro, Perfil)  
✅ **Histórico de Leitura & Favoritos**  
✅ **Reservas de Livros**  
✅ **Diferentes Níveis de Acesso (Leitores e Administradores)**  
✅ **Dashboards Personalizados para cada Tipo de Usuário**  
✅ **Integração com Frontend React Native via API REST**  

---

## 🛠️ Como Rodar o Projeto

### 1️⃣ **Pré-requisitos**
- **Node.js** instalado (versão 18+ recomendada)
- **PostgreSQL** e **MongoDB** rodando
- **React Native** configurado no ambiente de desenvolvimento

### 2️⃣ **Configuração do Backend**
1. **Crie um banco no PostgreSQL** chamado `bibliotech_db`
2. **Crie um arquivo `.env`** na raiz do projeto e configure as variáveis:
   ```
   POSTGRES_URI=postgres://seu_usuario:senha@localhost:5432/bibliotech_db
   MONGO_URI=mongodb://localhost:27017/bibliotech_blacklist
   JWT_SECRET=sua_chave_secreta
   ```
3. **Instalar Dependências**
```bash
npm install
```
4. **Rodar as Migrations**
```bash
npx sequelize db:migrate
```
5. **Executar o Servidor**
```bash
npm start
```
O backend rodará em **http://localhost:5000** 🚀

### 3️⃣ **Configuração do Frontend**
1. **Navegar até a pasta do frontend**
```bash
cd bibliotech-frontend
```
2. **Instalar dependências**
```bash
npm install
```
3. **Executar o aplicativo**
```bash
npx expo start
```

---

## 📌 Rotas da API

### 🔑 **Autenticação**
- `POST /api/auth/register` → Criar conta
- `POST /api/auth/login` → Fazer login
- `POST /api/auth/logout` → Logout e blacklist de token

### 👤 **Usuário**
- `GET /api/user/me` → Obter perfil
- `PUT /api/user/update` → Atualizar perfil

### 📚 **Livros**
- `GET /api/books` → Listar livros
- `POST /api/books` → Adicionar livro (admin)
- `PUT /api/books/:id` → Editar livro (admin)
- `DELETE /api/books/:id` → Remover livro (admin)

### 📊 **Dashboards**
- `GET /api/dashboard/user` → Dados do dashboard para leitores
- `GET /api/dashboard/admin` → Dados do dashboard para administradores

---

## 🔥 Próximos Passos
- 📌 Implementar notificações para devolução de livros
- 📌 Criar dashboard para acompanhar estatísticas de empréstimos
- 📌 Desenvolver mais funcionalidades no aplicativo React Native

---

## 🤝 Contribuição

Quer contribuir? Sinta-se à vontade para abrir **issues** ou enviar um **pull request**. 💡

---

## 📜 Licença

Este projeto está sob a licença **MIT**.
