const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const BlacklistToken = require('../models/BlacklistToken');
require('dotenv').config();

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await Usuario.create({ nome, email, senha: hashedPassword, tipo });
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Função para autenticar usuário e gerar token JWT
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};

// Função para realizar logout e invalidar o token
exports.logout = async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(400).json({ error: 'Token ausente' });
  try {
    await BlacklistToken.create({ token });
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
};