const Reserva = sequelize.define('Reserva', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Usuario', key: 'id' } }, // Referência ao usuário
    id_livro: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Livro', key: 'id' } }, // Referência ao livro
    data_reserva: { type: DataTypes.DATE, allowNull: false }, // Data da reserva
    status: { type: DataTypes.ENUM('Ativa', 'Cancelada', 'Expirada'), allowNull: false, defaultValue: 'Ativa' }, // Status da reserva
  }, { timestamps: false });
  
  module.exports = Reserva;