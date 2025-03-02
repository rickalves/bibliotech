import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import {
  adicionarLivro,
  listarLivros,
  buscarLivroPorId,
  atualizarLivro,
  deletarLivro
} from '../controllers/livroController';

const router = express.Router();

// Middleware para capturar erros corretamente em funções assíncronas
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Rota protegida para adicionar livro (somente administradores)
router.post('/', authenticateJWT, asyncHandler(adicionarLivro));

// Listar todos os livros
router.get('/', asyncHandler(listarLivros));

// Buscar livro por ID
router.get('/:id', asyncHandler(buscarLivroPorId));

// Atualizar livro (somente administradores)
router.put('/:id', authenticateJWT, asyncHandler(atualizarLivro));

// Deletar livro (somente administradores)
router.delete('/:id', authenticateJWT, asyncHandler(deletarLivro));

export default router;
