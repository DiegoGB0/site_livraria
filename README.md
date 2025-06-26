# API da Livraria

## Descrição Geral
Esta API foi desenvolvida para gerenciar uma livraria, permitindo operações relacionadas a usuários, livros e empréstimos. A API é construída com Node.js e Express, utilizando o banco de dados MySQL.

## Estrutura do Projeto

### 1. **server.js**

#### Função
- Inicializa o servidor Express e configura as rotas e middlewares.

#### Componentes
- **Importações**:
  - `express`: Framework para criar o servidor.
  - `cors`: Middleware que permite o acesso da API ao front-end.
  - `body-parser`: Middleware que lê o corpo das requisições em formato JSON.

- **Configuração**:
  - Cria a aplicação Express.
  - Define a porta do servidor (padrão: 3000).

- **Middlewares**:
  - Habilita o CORS para permitir chamadas de diferentes origens.
  - Permite que a API receba dados no formato JSON.

- **Rotas**:
  - Inclui uma rota de teste para verificar se a API está funcionando corretamente.

- **Inicialização**:
  - Inicia o servidor e escuta na porta especificada.

---

### 2. **Banco de Dados**

#### Estrutura
- **Ferramenta**: MySQL.
- **Tabelas**:
  - **Usuario**: Contém ID, nome, email e histórico de empréstimos.
  - **Livro**: Contém ID, nome, autor e histórico de empréstimos.
  - **Emprestimo**: Registra dados do usuário/livro, data do empréstimo e status de devolução.

---

### 3. **db.js**

#### Função
- Estabelece a conexão com o banco de dados MySQL.

#### Componentes
- Configuração da conexão, incluindo host, usuário, senha e nome do banco de dados.
- Testa a conexão ao iniciar o servidor e fornece um feedback no console.

---

### 4. **usuariosRepo.js**

#### Função
- Implementa a lógica de acesso ao banco de dados para a tabela de usuários.

#### Componentes
- Funções assíncronas (async) para realizar operações CRUD (Criar, Ler, Atualizar, Deletar) no banco.
- Isola a lógica de acesso ao banco de dados do restante da aplicação.

---

### 5. **usuarioService.js**

#### Função
- Serve como intermediário entre o controller e o repositório de usuários.

#### Componentes
- Valida dados obrigatórios antes de operações.
- Verifica se o usuário existe antes de realizar atualizações ou exclusões.
- Encaminha as operações para o repositório correspondente.

---

### 6. **usuariosController.js**

#### Função
- Gerencia a comunicação entre a API e os serviços de usuários.

#### Componentes
- Mapeia métodos HTTP (GET, POST, PUT, DELETE) para as funções do serviço.
- Utiliza tratamento de erros com try/catch para garantir robustez.
- Retorna respostas em formato JSON e códigos HTTP apropriados.

---

### 7. **usuariosRoutes.js**

#### Função
- Define as rotas da API para usuários.

#### Componentes
- Utiliza `express.Router()` para estruturar as rotas.
- Cada rota chama um método correspondente do `usuariosController`.
- Segue o padrão RESTful para definir os endpoints.

---

### 8. **livrosRepo.js**

#### Função
- Implementa a lógica de acesso ao banco de dados para a tabela de livros.

#### Componentes
- Segue o mesmo modelo de estrutura de `usuariosRepo.js`.
- Inclui funções assíncronas para gerenciar operações relacionadas a livros.

---

### 9. **livrosService.js**

#### Função
- Atua como intermediário entre o controller de livros e o repositório.

#### Componentes
- Segue a lógica do `usuarioService.js`.
- Gerencia validações e regras de negócio para operações relacionadas a livros.

---

## Como Testar a API

1. **Inicie o servidor**:
   ```bash
   node server.js