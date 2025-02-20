const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Modelo da tabela Usuario
const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false }, // Nome do usuário
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true }, // Email único
  senha: { type: DataTypes.TEXT, allowNull: false }, // Senha criptografada
  tipo: { type: DataTypes.ENUM('Aluno', 'Professor', 'Outro'), allowNull: false }, // Tipo do usuário
  imagem_url: { type: DataTypes.STRING(255), allowNull: true }, // URL opcional da imagem do usuário
  data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Data de criação
  data_atualizacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Data de atualização automática
}, { timestamps: false });

module.exports = Usuario;