// IMPORTANDO O SERVICE
const emprestimosService = require('../services/emprestimosService');

const emprestimosController = {
  async listar(req, res) {
    try {
      const emprestimos = await emprestimosService.listarTodos();
      res.status(200).json(emprestimos);
    } catch (erro) {
      console.error('Erro ao listar empréstimos:', erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  },

  async buscarPorId(req, res) {
    const id = req.params.id;
    try {
      const emprestimo = await emprestimosService.buscarPorId(id);
      res.status(200).json(emprestimo);
    } catch (erro) {
      console.error('Erro ao buscar empréstimo por ID:', erro);
      res.status(404).json({ erro: 'Empréstimo não encontrado' });
    }
  },

  async criar(req, res) {
    const dados = req.body;

    // Mostra o corpo da requisição recebido, útil para debugar
    console.log("📥 Dados recebidos no body:", dados);

    try {
      // Aceita tanto usuario_id/livro_id quanto usuarioId/livroId
      const emprestimoFormatado = {
        id_usuario: dados.usuario_id || dados.usuarioId,
        id_livro: dados.livro_id || dados.livroId,
        dataEmprestimo: dados.dataEmprestimo,
        dataDevolucao: dados.dataDevolucao || null
      };

      // Validação básica
      if (!emprestimoFormatado.id_usuario || !emprestimoFormatado.id_livro || !emprestimoFormatado.dataEmprestimo) {
        return res.status(400).json({ erro: "Usuário, livro e data de empréstimo são obrigatórios" });
      }

      const novoEmprestimo = await emprestimosService.criar(emprestimoFormatado);
      res.status(201).json(novoEmprestimo);
    } catch (erro) {
      console.error('Erro ao criar empréstimo:', erro);
      res.status(400).json({ erro: erro.message });
    }
  },

  async atualizar(req, res) {
    const id = req.params.id;
    const dados = req.body;
    try {
      const emprestimoAtualizado = await emprestimosService.atualizar(id, dados);
      res.status(200).json(emprestimoAtualizado);
    } catch (erro) {
      console.error('Erro ao atualizar empréstimo:', erro);
      res.status(404).json({ erro: 'Empréstimo não encontrado' });
    }
  },

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await emprestimosService.deletar(id);
      res.status(204).send(); // No Content
    } catch (erro) {
      console.error('Erro ao deletar empréstimo:', erro);
      res.status(404).json({ erro: 'Empréstimo não encontrado' });
    }
  }
};

module.exports = emprestimosController;
