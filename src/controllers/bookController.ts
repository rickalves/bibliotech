import { Request, Response } from 'express';
import Book from '../models/Livro'; // Importando corretamente o modelo book

// Adicionar um novo book
export const addBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const novobook = await Book.create(req.body);
    return res.status(200).json({ message: 'book cadastrado com sucesso.', book: novobook });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao adicionar o book!' });
  }
};

// Listar todos os books
export const findAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar os books.' });
  }
};

// Buscar um book por ID
export const findById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'book não encontrado.' });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o book.' });
  }
};

// Atualizar um book
export const updateBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'book não encontrado.' });

    await book.update(req.body);
    return res.status(200).json({ message: 'book atualizado com sucesso.', book });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar o book.' });
  }
};

// Deletar um book
export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'book não encontrado.' });

    await book.destroy();
    return res.status(200).json({ message: 'book deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar o book.' });
  }
};
