const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

// Rotas principais
router.get('/', livrosController.listar);
router.get('/disponiveis', livrosController.listarDisponiveis); // NOVA ROTA
router.get('/:id', livrosController.buscarPorId);
router.post('/', livrosController.criar);
router.put('/:id', livrosController.atualizar);
router.delete('/:id', livrosController.deletar);

module.exports = router;
