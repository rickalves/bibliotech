// src/routes/protectedRoutes.js
const express = require('express');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const protectedController = require('../controllers/protectedController');

const router = express.Router();

// Definição da rota protegida
router.get('/', authenticateJWT, protectedController.getProtectedData);

module.exports = router;
