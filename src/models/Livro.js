const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Livro = sequelize.define('livro', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING(255), allowNull: false }, // Título do livro
    autor: { type: DataTypes.STRING(255), allowNull: false }, // Autor do livro
    editora: { type: DataTypes.STRING(100), allowNull: false }, // Editora do livro
    ano: { type: DataTypes.INTEGER, allowNull: false }, // Ano de publicação
    isbn: { type: DataTypes.STRING(20), allowNull: false, unique: true }, // Código ISBN
    categoria: { type: DataTypes.STRING(100), allowNull: false }, // Categoria do livro
    quantidade_disponivel: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } }, // Quantidade em estoque
    imagem_url: { type: DataTypes.STRING(255), allowNull: true }, // URL da capa do livro
  }, { timestamps: false });
  
  module.exports = Livro;