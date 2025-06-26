const mysql = require('mysql2');

// Conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',         
    password: '',         
    database: 'livraria'  
});

// Conectar
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

module.exports = connection;
