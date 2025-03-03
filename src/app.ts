import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import livroRoutes from './routes/bookRoutes';

const app = express(); // Cria uma instância do Express

app.use(express.json()); // Permite a manipulação de JSON no corpo das requisições
app.use(cors()); // Habilita CORS para requisições de diferentes origens

// Definir rotas de autenticação
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Definir rotas de livros
app.use('/api/livros', livroRoutes);

// Middleware global de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro no servidor:', err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app; // Exporta a instância do Express
