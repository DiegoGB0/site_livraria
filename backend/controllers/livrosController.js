const livrosService = require('../services/livrosService');

const livrosController = {
  async listar(req, res) {
    try {
      const livros = await livrosService.listarLivros();
      res.status(200).json(livros);
    } catch (error) {
      console.error('Erro ao listar livros:', error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  },

  async listarDisponiveis(req, res) {
    try {
      const livros = await livrosService.listarLivrosDisponiveis();
      res.status(200).json(livros);
    } catch (error) {
      console.error('Erro ao listar livros disponíveis:', error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const livro = await livrosService.buscarLivrosPorId(id);
      res.status(200).json(livro);
    } catch (error) {
      console.error('Erro ao buscar livro por ID:', error);
      res.status(404).json({ erro: 'Livro não encontrado' });
    }
  },

  async criar(req, res) {
    const dadosLivro = req.body;
    try {
      const novoLivro = await livrosService.criarLivro(dadosLivro);
      res.status(201).json(novoLivro);
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      res.status(400).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const livroAtualizado = await livrosService.atualizarLivro(id, dadosAtualizados);
      res.status(200).json(livroAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      res.status(404).json({ erro: 'Livro não encontrado' });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    try {
      await livrosService.deletarLivro(id);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      res.status(404).json({ erro: 'Livro não encontrado' });
    }
  }
};

module.exports = livrosController;
