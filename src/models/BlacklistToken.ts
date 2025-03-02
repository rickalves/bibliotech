import mongoose, { Document, Schema } from 'mongoose';

// Interface para tipagem do documento no Mongoose
interface IBlacklistToken extends Document {
  token: string;
  createdAt: Date;
}

// Definição do esquema para armazenar tokens JWT revogados
const BlacklistTokenSchema = new Schema<IBlacklistToken>({
  token: { type: String, required: true, unique: true }, // Token JWT revogado
  createdAt: { type: Date, default: Date.now, expires: '1d' } // Expira automaticamente após 1 dia
});

// Exporta o modelo para ser utilizado na aplicação
const BlacklistToken = mongoose.model<IBlacklistToken>('BlacklistToken', BlacklistTokenSchema);

export default BlacklistToken;
