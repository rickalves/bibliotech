import { Request, Response } from 'express';
import Livro from '../models/Livro'; // Importando corretamente o modelo Livro

// Adicionar um novo livro
export const adicionarLivro = async (req: Request, res: Response): Promise<Response> => {
  try {
    const novoLivro = await Livro.create(req.body);
    return res.status(200).json({ message: 'Livro cadastrado com sucesso.', livro: novoLivro });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao adicionar o livro!' });
  }
};

// Listar todos os livros
export const listarLivros = async (req: Request, res: Response): Promise<Response> => {
  try {
    const livros = await Livro.findAll();
    return res.status(200).json(livros);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar os livros.' });
  }
};

// Buscar um livro por ID
export const buscarLivroPorId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });
    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o livro.' });
  }
};

// Atualizar um livro
export const atualizarLivro = async (req: Request, res: Response): Promise<Response> => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });

    await livro.update(req.body);
    return res.status(200).json({ message: 'Livro atualizado com sucesso.', livro });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar o livro.' });
  }
};

// Deletar um livro
export const deletarLivro = async (req: Request, res: Response): Promise<Response> => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });

    await livro.destroy();
    return res.status(200).json({ message: 'Livro deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar o livro.' });
  }
};
