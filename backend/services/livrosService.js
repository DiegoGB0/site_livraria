const livrosRepo = require('../repositories/livrosRepo');

const livrosService = {
  listarLivros: async () => {
    return await livrosRepo.listarTodosDisponiveis();
  },

  listarLivrosDisponiveis: async () => {
  return await livrosRepo.listarTodosDisponiveis();
},

  buscarLivrosPorId: async (id) => {
    const livro = await livrosRepo.buscarPorId(id);
    if (!livro) throw new Error('Livro não encontrado');
    return livro;
  },

  criarLivro: async (dados) => {
    return await livrosRepo.criar(dados);
  },

  atualizarLivro: async (id, dados) => {
    const atualizado = await livrosRepo.atualizar(id, dados);
    if (!atualizado) throw new Error('Livro não encontrado');
    return await livrosRepo.buscarPorId(id);
  },

  deletarLivro: async (id) => {
    const deletado = await livrosRepo.deletar(id);
    if (!deletado) throw new Error('Livro não encontrado');
  }
};

module.exports = livrosService;
