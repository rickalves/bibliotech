import mongoose, { Document, Schema } from 'mongoose';

// Definindo a interface para tipagem do esquema
interface IPasswordReset extends Document {
  email: string;
  code: string;
  expiresAt: Date;
}

// Criando o esquema para armazenar códigos de recuperação de senha
const PasswordResetSchema = new Schema<IPasswordReset>({
  email: { type: String, required: true },
  code: { type: String, required: true }, // Código de 6 dígitos
  expiresAt: { type: Date, required: true } // Expiração do código
});

// Criando e exportando o modelo com tipagem
const PasswordReset = mongoose.model<IPasswordReset>('PasswordReset', PasswordResetSchema);

export default PasswordReset;
