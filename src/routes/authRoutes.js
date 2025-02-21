const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Rotas de recuperação de senha
router.post('/solicitar-recuperacao', authController.solicitarRecuperacaoSenha);
router.post('/verificar-codigo', authController.verificarCodigo);
router.post('/redefinir-senha', authController.redefinirSenha);

module.exports = router;