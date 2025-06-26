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
    const {
      id_usuario,
      id_livro,
      dataEmprestimo,
      dataDevolucao,
      devolvido
    } = dados;

    // Validação dos campos obrigatórios
    if (!id_usuario || !id_livro || !dataEmprestimo) {
      throw new Error('Usuário, livro e data de empréstimo são obrigatórios');
    }

    // Verifica se o usuário existe
    const usuario = await usuariosRepo.buscarPorId(id_usuario);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se o livro existe
    const livro = await livrosRepo.buscarPorId(id_livro);
    if (!livro) {
      throw new Error('Livro não encontrado');
    }

    // Cria objeto no formato esperado pelo banco (snake_case)
    const novoEmprestimo = {
      id_usuario,
      id_livro,
      data_emprestimo: dataEmprestimo,
      data_devolucao: dataDevolucao || null,
      devolvido: devolvido ?? 0 // por padrão 0 = não devolvido
    };

    return await emprestimosRepo.criar(novoEmprestimo);
  },

  async atualizar(id, dadosAtualizados) {
    const emprestimoExistente = await emprestimosRepo.buscarPorId(id);
    if (!emprestimoExistente) {
      throw new Error('Empréstimo não encontrado');
    }

    // Converte nomes camelCase para os nomes usados no banco (snake_case)
    const dadosConvertidos = {};

    if (dadosAtualizados.dataEmprestimo !== undefined) {
      dadosConvertidos.data_emprestimo = dadosAtualizados.dataEmprestimo;
    }

    if (dadosAtualizados.dataDevolucao !== undefined) {
      dadosConvertidos.data_devolucao = dadosAtualizados.dataDevolucao;
    }

    if (dadosAtualizados.id_usuario !== undefined) {
      dadosConvertidos.id_usuario = dadosAtualizados.id_usuario;
    }

    if (dadosAtualizados.id_livro !== undefined) {
      dadosConvertidos.id_livro = dadosAtualizados.id_livro;
    }

    if (dadosAtualizados.devolvido !== undefined) {
      dadosConvertidos.devolvido = dadosAtualizados.devolvido;
    }

    return await emprestimosRepo.atualizar(id, dadosConvertidos);
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
