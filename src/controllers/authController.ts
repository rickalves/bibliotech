import dotenv from 'dotenv';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';
import BlacklistToken from '../models/BlacklistToken';
import RecuperaSenha from '../models/RecuperaSenha';
import { sendRecoveryEmail } from '../services/emailService';

dotenv.config();

// Verifica se a chave JWT está definida
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("❌ ERRO: JWT_SECRET não definido no .env");
}

// Interface para o payload do JWT
interface JwtPayload {
  id: number;
  tipo: string;
}

// Interface para representar um usuário autenticado
interface UsuarioInstance {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: 'Aluno' | 'Professor' | 'Outro';
  imagem_url?: string;
  data_criacao: Date;
  data_atualizacao: Date;
}


// Função para registrar um novo usuário
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nome, email, senha, tipo } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      tipo,
      data_criacao: new Date(),
      data_atualizacao: new Date(),
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Função para autenticar usuário e gerar token JWT
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar o usuário pelo email e garantir que senha seja retornado
    const usuario = (await Usuario.findOne({
      where: { email },
      attributes: ['id', 'nome', 'email', 'senha', 'tipo']
    })) as UsuarioInstance | null;

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Comparar a senha digitada com a senha armazenada no banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Criar token JWT
    const JWT_SECRET = process.env.JWT_SECRET as string;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não definido no .env');
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ message: 'Login bem-sucedido', token, usuario });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro ao realizar login' });
  }
};


// Função para realizar logout e invalidar o token
export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(400).json({ error: 'Token ausente' });

    await BlacklistToken.create({ token });
    return res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return res.status(500).json({ error: 'Erro ao fazer logout' });
  }
};

// Função para solicitar recuperação de senha
export const solicitarRecuperacaoSenha = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await RecuperaSenha.create({ email, code: codigo, expiresAt });
    await sendRecoveryEmail({ to: email, code: codigo });

    return res.status(200).json({ message: 'Código de recuperação enviado para o e-mail.' });
  } catch (error) {
    console.error('Erro ao solicitar recuperação de senha:', error);
    return res.status(500).json({ error: 'Erro ao enviar código de recuperação.' });
  }
};

// Função para verificar o código de recuperação
export const verificarCodigo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, code } = req.body;
    const resetRequest = await RecuperaSenha.findOne({ email, code });

    if (!resetRequest) return res.status(400).json({ error: 'Código inválido.' });

    if (new Date() > resetRequest.expiresAt) {
      return res.status(400).json({ error: 'Código expirado.' });
    }

    return res.status(200).json({ message: 'Código válido.' });
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    return res.status(500).json({ error: 'Erro ao verificar o código.' });
  }
};

// Função para redefinir a senha
export const redefinirSenha = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, code, novaSenha } = req.body;
    const resetRequest = await RecuperaSenha.findOne({ email, code });

    if (!resetRequest) return res.status(400).json({ error: 'Código inválido.' });

    if (new Date() > resetRequest.expiresAt) {
      return res.status(400).json({ error: 'Código expirado.' });
    }

    const hashedPassword = await bcrypt.hash(novaSenha, 10);
    await Usuario.update({ senha: hashedPassword }, { where: { email } });

    await RecuperaSenha.deleteOne({ email, code });

    return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    return res.status(500).json({ error: 'Erro ao redefinir a senha.' });
  }
};
