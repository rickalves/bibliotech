const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express(); // Cria uma instância do Express
app.use(express.json()); // Permite a manipulação de JSON no corpo das requisições
app.use(cors()); // Habilita CORS para requisições de diferentes origens


// Definição das rotas de autenticação
app.use('/api/auth', authRoutes);
// Rota protegida para testar autenticação
app.use('/api/protected', protectedRoutes);

module.exports = app; // Exporta a instância do Express