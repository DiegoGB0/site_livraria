const db = require('../db');

const livrosRepo = {
    async listarTodosDisponiveis() {
        const [rows] = await db.promise().query(`
            SELECT l.*
            FROM livros l
            LEFT JOIN emprestimos e ON l.livro_id = e.id_livro AND e.devolvido = 0
            WHERE e.id_livro IS NULL
        `);
        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await db.promise().query('SELECT * FROM livros WHERE livro_id = ?', [id]);
        return rows[0];
    },

    async criar(livro) {
        const [result] = await db.promise().query('INSERT INTO livros SET ?', livro);
        return { livro_id: result.insertId, ...livro };
    },

    async atualizar(id, dadosAtualizados) {
        const [result] = await db.promise().query('UPDATE livros SET ? WHERE livro_id = ?', [dadosAtualizados, id]);
        return result.affectedRows > 0;
    },

    async deletar(id) {
        const [result] = await db.promise().query('DELETE FROM livros WHERE livro_id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = livrosRepo;
