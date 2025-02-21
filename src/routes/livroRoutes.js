const express = require('express');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const livroController = require('../controllers/livroController');

const router = express.Router();

// Rota protegida para adicionar livro (somente administradores)
router.post('/', authenticateJWT, livroController.adicionarLivro);

// Listar todos os livros
router.get('/', livroController.listarLivros);

// Buscar livro por ID
router.get('/:id', livroController.buscarLivroPorId);

// Atualizar livro (somente administradores)
router.put('/:id', authenticateJWT, livroController.atualizarLivro);

// Deletar livro (somente administradores)
router.delete('/:id', authenticateJWT, livroController.deletarLivro);

module.exports = router;