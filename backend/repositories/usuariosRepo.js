const db = require('../db');

// REPOSITÓRIO RESPONSÁVEL APENAS POR ACESSAR OS DADOS DOS USUÁRIOS
const usuariosRepo = {
    async listarTodos() {
        const [rows] = await db.promise().query('SELECT * FROM usuarios');
        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0]; // Retorna o primeiro usuário encontrado
    },

    async criar(usuario) {
        const [result] = await db.promise().query('INSERT INTO usuarios SET ?', usuario);
        return { id: result.insertId, ...usuario }; // Retorna o novo usuário com o ID gerado
    },

    async atualizar(id, dadosAtualizados) {
        const [result] = await db.promise().query('UPDATE usuarios SET ? WHERE id = ?', [dadosAtualizados, id]);
        return result.affectedRows > 0; // Retorna true se o usuário foi atualizado
    },

    // REMOVER USUÁRIO
    async deletar(id) {
        const [result] = await db.promise().query('DELETE FROM usuarios WHERE id = ?', [id]);
        return result.affectedRows > 0; // Retorna true se o usuário foi deletado
    }
};

module.exports = usuariosRepo;