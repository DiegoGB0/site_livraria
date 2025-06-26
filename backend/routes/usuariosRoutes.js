const express = require('express');
const router = express.Router();
const db = require('../db');

// ROTA DE LOGIN
router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );

    if (rows.length > 0) {
      const usuario = rows[0];
      res.status(200).json({ id: usuario.usuario_id, nome: usuario.nome });
    } else {
      res.status(401).json({ erro: 'Credenciais inválidas' });
    }
  } catch (erro) {
    console.error('Erro no login:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

module.exports = router;
