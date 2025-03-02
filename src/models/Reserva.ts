import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Interface para definir os atributos do modelo Reserva
interface IReserva {
  id: number;
  id_usuario: number;
  id_livro: number;
  data_reserva: Date;
  status: 'Ativa' | 'Cancelada' | 'Expirada';
}

// Interface para criação de reserva (id opcional)
interface ReservaCreationAttributes extends Optional<IReserva, 'id'> {}

// Definição do modelo `Reserva` com TypeScript
class Reserva extends Model<IReserva, ReservaCreationAttributes> implements IReserva {
  public id!: number;
  public id_usuario!: number;
  public id_livro!: number;
  public data_reserva!: Date;
  public status!: 'Ativa' | 'Cancelada' | 'Expirada';
}

// Inicialização do modelo no Sequelize
Reserva.init(
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
    data_reserva: { type: DataTypes.DATE, allowNull: false },
    status: { 
      type: DataTypes.ENUM('Ativa', 'Cancelada', 'Expirada'), 
      allowNull: false, 
      defaultValue: 'Ativa' 
    },
  },
  {
    sequelize,
    modelName: 'Reserva',
    timestamps: false,
  }
);

export default Reserva;
