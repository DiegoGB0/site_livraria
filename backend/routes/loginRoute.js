const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt'); // Caso queira usar senhas seguras (opcional)

// POST /login
router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const usuario = rows[0];

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    res.status(200).json({ id: usuario.usuario_id, nome: usuario.nome });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

module.exports = router;
