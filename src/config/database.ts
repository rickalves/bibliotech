import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis do .env

const POSTGRES_URI = process.env.POSTGRES_URI;

if (!POSTGRES_URI) {
  throw new Error("❌ ERRO: A variável de ambiente POSTGRES_URI não está definida!");
}

export const sequelize = new Sequelize(POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
});
