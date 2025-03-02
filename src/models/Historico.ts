import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Interface para definir os atributos do histórico
interface IHistorico {
  id: number;
  id_usuario: number;
  id_livro: number;
  data_emprestimo: Date;
  data_devolucao: Date;
  status: 'Devolvido';
}

// Interface para criação do histórico (id opcional)
interface HistoricoCreationAttributes extends Optional<IHistorico, 'id'> {}

// Definição do modelo `Historico` com TypeScript
class Historico extends Model<IHistorico, HistoricoCreationAttributes>{}

// Inicialização do modelo no Sequelize
Historico.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: 'Usuario', key: 'id' } 
    },
    id_livro: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { model: 'Livro', key: 'id' } 
    },
    data_emprestimo: { type: DataTypes.DATE, allowNull: false },
    data_devolucao: { type: DataTypes.DATE, allowNull: false },
    status: { 
      type: DataTypes.ENUM('Devolvido'), 
      allowNull: false, 
      defaultValue: 'Devolvido' 
    },
  },
  {
    sequelize,
    modelName: 'Historico',
    timestamps: false,
  }
);

export default Historico;
