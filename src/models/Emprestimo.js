const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Emprestimo = sequelize.define('Emprestimo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Usuario', key: 'id' } }, // Referência ao usuário
    id_livro: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Livro', key: 'id' } }, // Referência ao livro
    data_emprestimo: { type: DataTypes.DATE, allowNull: false }, // Data do empréstimo
    data_devolucao: { type: DataTypes.DATE, allowNull: false }, // Data prevista para devolução
    status: { type: DataTypes.ENUM('Pendente', 'Devolvido', 'Atrasado'), allowNull: false, defaultValue: 'Pendente' }, // Status do empréstimo
  }, { timestamps: false });
  
  module.exports = Emprestimo;