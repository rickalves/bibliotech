const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const livroRoutes = require('./routes/livroRoutes')

const app = express(); // Cria uma instância do Express
app.use(express.json()); // Permite a manipulação de JSON no corpo das requisições
app.use(cors()); // Habilita CORS para requisições de diferentes origens


// Definir rotas de autenticação
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);


// Definir rotas de livros
app.use('/api/livros', livroRoutes);

module.exports = app; // Exporta a instância do Express