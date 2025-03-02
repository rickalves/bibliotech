import { Request, Response, NextFunction} from 'express';

// Interface para representar a requisição autenticada
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    tipo: string;
  };
}

// Controlador para rotas protegidas
export const getProtectedData = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json({
      message: "Acesso autorizado!",
      user: req.user, // ✅ Incluímos os dados do usuário autenticado corretamente
    });
  } catch (error) {
    next(error); // ✅ Passamos o erro para o middleware global de erro do Express
  }
};
