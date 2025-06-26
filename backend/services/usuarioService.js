// IMPORTA O REPOSITÓRIO DE USUÁRIOS
const usuariosRepo = require('../repositories/usuariosRepo');

const usuarioService = {
    async listarUsuarios() {
        return await usuariosRepo.listarTodos();
    },

    async buscarUsuarioPorId(id) {
        const usuario = await usuariosRepo.buscarPorId(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario;
    },

    async criarUsuario(dados) {
        // VALIDAÇÃO
        if (!dados.nome || !dados.email) {
            throw new Error('Nome e e-mail são obrigatórios');
        }
        return await usuariosRepo.criar(dados);
    },

    async atualizarUsuario(id, dados) { // Consistência no nome
        const usuarioExistente = await usuariosRepo.buscarPorId(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }
        return await usuariosRepo.atualizar(id, dados);
    },
    
    async deletarUsuario(id) {
        const usuarioExistente = await usuariosRepo.buscarPorId(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado');
        }
        return await usuariosRepo.deletar(id);
    }
};

module.exports = usuarioService;