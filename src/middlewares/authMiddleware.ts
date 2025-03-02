import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import BlacklistToken from '../models/BlacklistToken';
import dotenv from 'dotenv';

dotenv.config();

// Interface para definir o formato do payload JWT
interface JwtPayload {
  id: number;
  tipo: string;
}

// Interface para a requisição autenticada
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Middleware para proteger rotas com autenticação JWT
export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Acesso negado' });
      return; // ✅ Garante que a função encerra aqui e não chama `next()`
    }

    // Verifica se o token está na blacklist
    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) {
      res.status(403).json({ error: 'Token inválido! Usuário fez Logout!' });
      return; // ✅ Garante que a função encerra aqui e não chama `next()`
    }

    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // Adiciona os dados do usuário autenticado ao request

    next(); // ✅ Continua para a próxima função da rota
  } catch (error) {
    console.error('Erro ao autenticar token:', error);
    res.status(403).json({ error: 'Token inválido ou expirado' });
    return; // ✅ Garante que a função encerra aqui e não chama `next()`
  }
};
