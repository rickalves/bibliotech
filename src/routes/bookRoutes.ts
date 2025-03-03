import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import {
  addBook,
  findAll,
  findById,
  updateBook,
  deleteBook
} from '../controllers/bookController';

const router = express.Router();

// Middleware para capturar erros corretamente em funções assíncronas
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Rota protegida para adicionar livro (somente administradores)
router.post('/', authenticateJWT, asyncHandler(addBook));

// Listar todos os livros
router.get('/', asyncHandler(findAll));

// Buscar livro por ID
router.get('/:id', asyncHandler(findById));

// Atualizar livro (somente administradores)
router.put('/:id', authenticateJWT, asyncHandler(updateBook));

// Deletar livro (somente administradores)
router.delete('/:id', authenticateJWT, asyncHandler(deleteBook));

export default router;
