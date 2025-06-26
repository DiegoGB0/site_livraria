// IMPORTANDO OS REPOSITÓRIOS
const emprestimosRepo = require('../repositories/emprestimosRepo');
const usuariosRepo = require('../repositories/usuariosRepo');
const livrosRepo = require('../repositories/livrosRepo');

const emprestimosService = {
  async listarTodos() {
    return await emprestimosRepo.listarTodos();
  },

  async buscarPorId(id) {
    const emprestimo = await emprestimosRepo.buscarPorId(id);
    if (!emprestimo) {
      throw new Error('Empréstimo não encontrado');
    }
    return emprestimo;
  },

  async criar(dados) {
    const { usuarioId, livroId, dataEmprestimo, dataDevolucao } = dados;

    // Validações
    if (!usuarioId || !livroId || !dataEmprestimo) {
      throw new Error('Usuário, livro e data de empréstimo são obrigatórios');
    }

    // Verifica se o usuário existe
    const usuario = await usuariosRepo.buscarPorId(usuarioId);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se o livro existe
    const livro = await livrosRepo.buscarPorId(livroId);
    if (!livro) {
      throw new Error('Livro não encontrado');
    }

    const novoEmprestimo = {
      usuario_id,
      livro_id,
      dataEmprestimo,
      dataDevolucao
    };

    return await emprestimosRepo.criar(novoEmprestimo);
  },

  async atualizar(id, dadosAtualizados) {
    const emprestimoExistente = await emprestimosRepo.buscarPorId(id);
    if (!emprestimoExistente) {
      throw new Error('Empréstimo não encontrado');
    }

    return await emprestimosRepo.atualizar(id, dadosAtualizados);
  },

  async deletar(id) {
    const emprestimoExistente = await emprestimosRepo.buscarPorId(id);
    if (!emprestimoExistente) {
      throw new Error('Empréstimo não encontrado');
    }

    return await emprestimosRepo.deletar(id);
  }
};

module.exports = emprestimosService;