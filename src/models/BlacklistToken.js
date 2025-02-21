const mongoose = require('mongoose');

// Definição do esquema para armazenar tokens JWT revogados
const BlacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }, // Token JWT que foi revogado
  createdAt: { type: Date, default: Date.now, expires: '1d' } // Define a expiração automática após 1 dia
});

// Exporta o modelo para ser utilizado na aplicação
module.exports = mongoose.model('BlacklistToken', BlacklistTokenSchema);