const db = require('../db');

// Função para gerar um ID de 8 dígitos aleatórios
function gerarId8Digitos() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

// REPOSITÓRIO RESPONSÁVEL PELO ACESSO AOS DADOS DOS EMPRÉSTIMOS
const emprestimosRepo = {
  async listarTodos() {
    const [rows] = await db.promise().query(`
      SELECT e.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
      FROM emprestimos e
      JOIN usuarios u ON e.id_usuario = u.usuario_id
      JOIN livros l ON e.id_livro = l.livro_id
    `);
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.promise().query(`
      SELECT e.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
      FROM emprestimos e
      JOIN usuarios u ON e.id_usuario = u.usuario_id
      JOIN livros l ON e.id_livro = l.livro_id
      WHERE e.id = ?
    `, [id]);
    return rows[0]; // Retorna o primeiro empréstimo encontrado
  },

  async criar(emprestimo) {
    // Gera o id de 8 dígitos antes de inserir
    emprestimo.id = gerarId8Digitos();
    await db.promise().query('INSERT INTO emprestimos SET ?', emprestimo);
    return { id: emprestimo.id, ...emprestimo };
  },

 async atualizar(id, dadosAtualizados) {
  // Corrige nome do campo se vier errado
  if (dadosAtualizados.dataDevolucao) {
    dadosAtualizados.data_devolucao = dadosAtualizados.dataDevolucao;
    delete dadosAtualizados.dataDevolucao;
  }
  const [result] = await db.promise().query('UPDATE emprestimos SET ? WHERE id = ?', [dadosAtualizados, id]);
  return result.affectedRows > 0;
},

  async deletar(id) {
    const [result] = await db.promise().query('DELETE FROM emprestimos WHERE id = ?', [id]);
    return result.affectedRows > 0; // Retorna true se o empréstimo foi deletado
  }
};

module.exports = emprestimosRepo;