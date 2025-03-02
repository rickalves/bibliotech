import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
import { sequelize } from './src/config/database'; // Conexão com PostgreSQL
import mongoose from 'mongoose'; // Conexão com MongoDB
import app from './src/app'; // Importa o aplicativo Express



// Conectar ao PostgreSQL
sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao PostgreSQL 🐘'))
  .catch((err) => console.error('❌ Erro ao conectar PostgreSQL:', err));

// Sincronizar modelos no PostgreSQL
sequelize.sync({ alter: true })
  .then(() => console.log('🔄 PostgreSQL sincronizado'))
  .catch((err) => console.error('❌ Erro ao sincronizar PostgreSQL:', err));

// Conectar ao MongoDB para gerenciamento da blacklist de tokens JWT
const mongoUri = process.env.MONGO_URI as string;

if (!mongoUri) {
  console.error('❌ Erro: A variável de ambiente MONGO_URI não está definida.');
  process.exit(1); // Sai do processo se a conexão MongoDB não puder ser estabelecida
}

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Conectado ao MongoDB 🍃'))
  .catch((err) => console.error('❌ Erro ao conectar MongoDB:', err));

const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`⚙️  Servidor rodando em http://localhost:${PORT}`);
});
