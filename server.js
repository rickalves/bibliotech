require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/config/database');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const { authenticateJWT } = require('./src/middlewares/authMiddleware');

const app = express();
app.use(express.json()); // Permite a manipulação de JSON no corpo das requisições
app.use(cors()); // Habilita CORS para requisições de diferentes origens

// Conectar ao PostgreSQL e sincronizar modelos

sequelize.authenticate()
  .then(()=> console.log('✅ Conectado ao PostgreSQL🐘')) 
  .catch(err => console.error('❌ Erro ao conectar PostgreSQL:', err));


sequelize.sync({force:true})
  .then(() => console.log('🔄 PostgreSQL sincronizado'))
  .catch(err => console.error('❌ Erro ao sicronizar PostgreSQL:', err));



// Conectar ao MongoDB para gerenciamento da blacklist de tokens JWT
mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ Conectado ao MongoDB🍃'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// Definição das rotas de autenticação
app.use('/api/auth', authRoutes);

// Rota protegida para testar autenticação
app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Acesso autorizado!', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚙️  Servidor rodando em http://localhost:${PORT}`);
});

