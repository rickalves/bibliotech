const Livro = require('../models/Livro');

// Adicionar um novo livro
exports.adicionarLivro = async (req, res) => {
  try {
    const novoLivro = await Livro.create(req.body);
    res.status(200).json({ message: 'Livro cadastrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: `Erro ao adicionar o livro!` });
  }
};

// Listar todos os livros
exports.listarLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os livros.' });
  }
};

// Buscar um livro por ID
exports.buscarLivroPorId = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });
    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o livro.' });
  }
};

// Atualizar um livro
exports.atualizarLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });
    await livro.update(req.body);
    res.status(200).json({ message: 'Livro atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o livro.' });
  }
};

// Deletar um livro
exports.deletarLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });
    await livro.destroy();
    res.status(200).json({ message: 'Livro deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o livro.' });
  }
};