import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Interface para definir os atributos do empréstimo
interface IEmprestimo {
  id: number;
  id_usuario: number;
  id_livro: number;
  data_emprestimo: Date;
  data_devolucao: Date;
  status: 'Pendente' | 'Devolvido' | 'Atrasado';
}

// Interface para criação de empréstimos (id opcional)
interface EmprestimoCreationAttributes extends Optional<IEmprestimo, 'id'> {}

// Definição do modelo `Emprestimo` com TypeScript
class Emprestimo extends Model<IEmprestimo, EmprestimoCreationAttributes> {}

// Inicialização do modelo no Sequelize
Emprestimo.init(
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
      type: DataTypes.ENUM('Pendente', 'Devolvido', 'Atrasado'), 
      allowNull: false, 
      defaultValue: 'Pendente' 
    },
  },
  {
    sequelize,
    modelName: 'Emprestimo',
    timestamps: false,
  }
);

export default Emprestimo;
