const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Historico = sequelize.define('Historico', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Usuario', key: 'id' } }, // Referência ao usuário
    id_livro: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Livro', key: 'id' } }, // Referência ao livro
    data_emprestimo: { type: DataTypes.DATE, allowNull: false }, // Data do empréstimo
    data_devolucao: { type: DataTypes.DATE, allowNull: false }, // Data de devolução
    status: { type: DataTypes.ENUM('Devolvido'), allowNull: false, defaultValue: 'Devolvido' }, // Status do histórico
  }, { timestamps: false });
  
  module.exports = Historico;
  