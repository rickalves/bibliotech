import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Interface para tipagem do livro
interface ILivro {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  ano: number;
  isbn: string;
  categoria: string;
  quantidade_disponivel: number;
  imagem_url?: string;
}

// Interface opcional para `create()`
interface LivroCreationAttributes extends Optional<ILivro, 'id'> {}

// Definição do modelo `Livro` com TypeScript
class Livro extends Model<ILivro, LivroCreationAttributes>{}

// Inicialização do modelo com Sequelize
Livro.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING(255), allowNull: false },
    autor: { type: DataTypes.STRING(255), allowNull: false },
    editora: { type: DataTypes.STRING(100), allowNull: false },
    ano: { type: DataTypes.INTEGER, allowNull: false },
    isbn: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    categoria: { type: DataTypes.STRING(100), allowNull: false },
    quantidade_disponivel: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
    imagem_url: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    modelName: 'Livro',
    timestamps: false,
  }
);

export default Livro;
