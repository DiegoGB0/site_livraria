const db = require('../db');

// Função para gerar um ID de 8 dígitos aleatórios
function gerarId8Digitos() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

const usuariosRepo = {
    async listarTodos() {
        const [rows] = await db.promise().query('SELECT * FROM usuarios');
        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE usuario_id = ?', [id]);
        return rows[0];
    },

    async criar(usuario) {
        // Gera o id de 8 dígitos antes de inserir
        usuario.usuario_id = gerarId8Digitos();
        await db.promise().query('INSERT INTO usuarios SET ?', usuario);
        return { usuario_id: usuario.usuario_id, ...usuario };
    },

    async atualizar(id, dadosAtualizados) {
        const [result] = await db.promise().query('UPDATE usuarios SET ? WHERE usuario_id = ?', [dadosAtualizados, id]);
        return result.affectedRows > 0;
    },

    async deletar(id) {
        const [result] = await db.promise().query('DELETE FROM usuarios WHERE usuario_id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = usuariosRepo;