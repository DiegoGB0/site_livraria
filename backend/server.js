// IMPORTAÇÕES DOS MÓDULOS
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// IMPORTAÇÃO DAS ROTAS
const usuariosRoutes = require('./routes/usuariosRoutes');
const livrosRoutes = require('./routes/livrosRoutes');
const emprestimosRoutes = require('./routes/emprestimosRoutes');
const loginRoute = require('./routes/loginRoute');

// CONFIG INICIAL
const app = express();
const port = 3000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND
const frontendPath = path.resolve(__dirname, '..', 'frontend');

app.use(express.static(frontendPath));

// ROTAS DA API
app.use('/usuarios', usuariosRoutes);
app.use('/livros', livrosRoutes);
app.use('/emprestimos', emprestimosRoutes);
app.use('/login', loginRoute);

// ROTA PRINCIPAL (padrão ao abrir localhost:3000/)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});

//TESTES
console.log('📁 __dirname:', __dirname);
console.log('📁 frontendPath:', frontendPath);
console.log('📄 login.html path:', path.join(frontendPath, 'login.html'));


// INICIALIZAÇÃO DO SERVIDOR
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
