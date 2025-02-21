require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const { sequelize } = require('./src/config/database');// Importa a conexão com o banco
const mongoose = require('mongoose');// Importa mongoose para conexão com o MongoDB
const app = require('./src/app'); // Importa o aplicativo



// Conectar ao PostgreSQL 
sequelize.authenticate()
  .then(()=> console.log('✅ Conectado ao PostgreSQL🐘')) 
  .catch(err => console.error('❌ Erro ao conectar PostgreSQL:', err));

//Sincronizar modelos no PostgreSQL
sequelize.sync({alter:true})
  .then(() => console.log('🔄 PostgreSQL sincronizado'))
  .catch(err => console.error('❌ Erro ao sicronizar PostgreSQL:', err));

// Conectar ao MongoDB para gerenciamento da blacklist de tokens JWT
mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ Conectado ao MongoDB🍃'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

const PORT = process.env.PORT || 5000; // Define a porta do servidor
//inicia o servidor
app.listen(PORT, () => {
  console.log(`⚙️  Servidor rodando em http://localhost:${PORT}`);
});

