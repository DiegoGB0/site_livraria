const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/emprestimosController');

// ROTAS DE EMPRÉSTIMOS
router.get('/', emprestimosController.listar);
router.get('/:id', emprestimosController.buscarPorId);
router.post('/', emprestimosController.criar);
router.put('/:id', emprestimosController.atualizar);
router.delete('/:id', emprestimosController.deletar);

module.exports = router;
