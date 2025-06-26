const db = require('../db');

// Função simples para gerar um ID de 8 dígitos aleatórios
function gerarId8Digitos() {
    return Math.floor(10000000 + Math.random() * 90000000);
}

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
        // Gera o id de 8 dígitos antes de inserir
        livro.livro_id = gerarId8Digitos();
        await db.promise().query('INSERT INTO livros SET ?', livro);
        return { livro_id: livro.livro_id, ...livro };
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