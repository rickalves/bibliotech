import express, { Request, Response, NextFunction } from 'express';
import {
  register,
  login,
  logout,
  passwordRecovery,
  verifyCode,
  resetPassword
} from '../controllers/authController';

const router = express.Router();

// Middleware para capturar erros corretamente em funções assíncronas
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Rotas de autenticação
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/logout', asyncHandler(logout));

// Rotas de recuperação de senha
router.post('/password-recovery', asyncHandler(passwordRecovery));
router.post('/verify-code', asyncHandler(verifyCode));
router.post('/reset-password', asyncHandler(resetPassword));

export default router;
