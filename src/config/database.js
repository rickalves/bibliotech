const { Sequelize } = require('sequelize');

// Configuração do Sequelize para conexão com o banco PostgreSQL
module.exports.sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false, // Evita exibição de logs desnecessários
});
