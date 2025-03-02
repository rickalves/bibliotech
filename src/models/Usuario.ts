import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Interface dos atributos do usuário
interface UsuarioAttributes {
  id: number;
  nome: string;
  email: string;
  senha: string;  // ✅ Adicionado aqui
  tipo: 'Aluno' | 'Professor' | 'Outro';
  imagem_url?: string;
  data_criacao: Date;
  data_atualizacao: Date;
}

// Interface para criação de usuários
interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id' | 'imagem_url' | 'data_criacao' | 'data_atualizacao'> {}

// Modelo do Sequelize sem definir atributos publicamente na classe
class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> {}

Usuario.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    senha: { type: DataTypes.TEXT, allowNull: false },  // ✅ Garantindo que senha existe no init()
    tipo: { type: DataTypes.ENUM('Aluno', 'Professor', 'Outro'), allowNull: false },
    imagem_url: { type: DataTypes.STRING(255), allowNull: true },
    data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    data_atualizacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: false
  }
);

export default Usuario;
