// IMPORTANDO O SERVICE
const usuarioService = require('../services/usuarioService');

const usuariosController = {
    // GET /usuarios
    async listar(req, res) {
        try {
            const usuarios = await usuarioService.listarUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    // GET /usuarios/:id
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const usuario = await usuarioService.buscarUsuarioPorId(id);
            res.status(200).json(usuario);
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }
    },

    // POST /usuarios
    async criar(req, res) {
        const dados = req.body;
        try {
            const novoUsuario = await usuarioService.criarUsuario(dados);
            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(400).json({ erro: error.message });
        }
    },

    // PUT /usuarios/:id
    async atualizar(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            const usuarioAtualizado = await usuarioService.atualizarUsuario(id, dadosAtualizados);
            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }
    },

    // DELETE /usuarios/:id
    async deletar(req, res) {
        const { id } = req.params;
        try {
            const deletado = await usuarioService.deletarUsuario(id);
            res.status(204).send(); // No Content
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            res.status(404).json({ erro: 'Usuário não encontrado' });
        }
    }
};

module.exports = usuariosController;