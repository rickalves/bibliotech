require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const BlacklistToken = require('../models/BlacklistToken');
const RecuperaSenha = require('../models/RecuperaSenha');
const { sendRecoveryEmail } = require('../services/emailService');


// Função para registrar um novo usuário
exports.register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await Usuario.create({ nome, email, senha: hashedPassword, tipo });
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: `Erro ao criar usuário:(${error})` }); 
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


// Função para solicitar recuperação de senha
exports.solicitarRecuperacaoSenha = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });

    // Geração de um código de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    // Definir expiração do código (10 minutos)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Armazenar o código no MongoDB
    await RecuperaSenha.create({ email, code: codigo, expiresAt });

    // Enviar o código por e-mail
    await sendRecoveryEmail(email, codigo);

    res.status(200).json({ message: 'Código de recuperação enviado para o e-mail.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar código de recuperação.' });
  }
};

// Função para verificar o código de recuperação
exports.verificarCodigo = async (req, res) => {
  const { email, code } = req.body;
  try {
    const resetRequest = await RecuperaSenha.findOne({ email, code });
    if (!resetRequest) return res.status(400).json({ error: 'Código inválido.' });

    if (new Date() > resetRequest.expiresAt) {
      return res.status(400).json({ error: 'Código expirado.' });
    }

    res.status(200).json({ message: 'Código válido.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar o código.' });
  }
};

// Função para redefinir a senha
exports.redefinirSenha = async (req, res) => {
  const { email, code, novaSenha } = req.body;
  try {
    const resetRequest = await RecuperaSenha.findOne({ email, code });
    if (!resetRequest) return res.status(400).json({ error: 'Código inválido.' });

    if (new Date() > resetRequest.expiresAt) {
      return res.status(400).json({ error: 'Código expirado.' });
    }

    // Redefinir a senha
    const hashedPassword = await bcrypt.hash(novaSenha, 10);
    await Usuario.update({ senha: hashedPassword }, { where: { email } });

    // Excluir o registro de recuperação após o uso
    await RecuperaSenha.deleteOne({ email, code });

    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao redefinir a senha.' });
  }
};

