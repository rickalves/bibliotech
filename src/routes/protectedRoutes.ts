import express, { Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { getProtectedData } from '../controllers/protectedController';

const router = express.Router();



// Definição da rota protegida
router.get('/', authenticateJWT, getProtectedData);

export default router;
