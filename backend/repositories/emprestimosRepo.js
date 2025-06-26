const db = require('../db');

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
    const [result] = await db.promise().query('INSERT INTO emprestimos SET ?', emprestimo);
    return { id: result.insertId, ...emprestimo }; // Retorna o novo empréstimo com o ID gerado
  },

  async atualizar(id, dadosAtualizados) {
    const [result] = await db.promise().query('UPDATE emprestimos SET ? WHERE id = ?', [dadosAtualizados, id]);
    return result.affectedRows > 0; // Retorna true se o empréstimo foi atualizado
  },

  async deletar(id) {
    const [result] = await db.promise().query('DELETE FROM emprestimos WHERE id = ?', [id]);
    return result.affectedRows > 0; // Retorna true se o empréstimo foi deletado
  }
};

module.exports = emprestimosRepo;