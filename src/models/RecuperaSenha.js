const mongoose = require('mongoose');

// Definindo o esquema para armazenar códigos de recuperação de senha
const PasswordResetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true }, // Código de 6 dígitos
  expiresAt: { type: Date, required: true } // Expiração do código
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);