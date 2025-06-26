const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rotas REST para usuários
router.get('/', usuariosController.listar); // Lista todos usuários
router.get('/:id', usuariosController.buscarPorId); // Busca por id
router.post('/', usuariosController.criar); // Cadastro de novo usuário
router.put('/:id', usuariosController.atualizar); // Atualiza usuário
router.delete('/:id', usuariosController.deletar); // Remove usuário

module.exports = router;