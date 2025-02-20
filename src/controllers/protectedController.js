// Controlador para rotas protegidas
exports.getProtectedData = (req, res) => {
    res.json({
      message: "Acesso autorizado!",
      user: req.user // Dados do usuário autenticado
    });
  };
  